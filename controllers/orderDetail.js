const express = require("express");
const router = express.Router();
const OrderDetail = require("../models/orderDetail");
const Order = require("../models/order");
const option = require("../models/option");
const mongoose = require("mongoose");

// get all order detail
exports.allOrderDetail = async (req, res) => {
    try {
        const orderDetails = await OrderDetail.find().sort({ date: -1 });

        res.status(200).json({
            list: orderDetails,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch order details', errorMessage: error.message });
    }
};


// Trả về order detail bằng search id
exports.getOrderDetailById = async (req, res) => {
    try {
        const orderDetailID = req.params.orderDetailID;
        const orderDetail = await OrderDetail.findById(orderDetailID);

        if (!orderDetail) {
            return res.status(404).json({ error: "Order detail not found" });
        }

        res.status(200).json({ orderDetail });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch order detail", errorMessage: error.message });
    }
};

// Thêm order detail
exports.createOrderDetail = async (req, res) => {
    try {
        const { orderDetail } = req.body;
        const existingOption = await option.findById(orderDetail.optionID);
        if (!existingOption) {
            return res.status(400).json({ error: "Invalid option ID" });
        }
        const existingOrder = await Order.findById(orderDetail.orderID);
        if (!existingOrder) {
            return res.status(400).json({ error: "Invalid order ID" });
        }

        const newOrderDetail = new OrderDetail({
            orderID: existingOrder._id,
            optionID: existingOption._id,
            price: existingOption.price,
            dateBook: orderDetail.dateBook,
            dateEnd: orderDetail.dateEnd,
            status: orderDetail.status,
        });

        const savedOrderDetail = await newOrderDetail.save();

        res.status(200).json({ message: "Order detail added successfully", orderDetail: savedOrderDetail });
    } catch (error) {
        res.status(500).json({ error: "Failed to add order detail", errorMessage: error.message });
    }
};

// Sửa order detail
exports.updateOrderDetail = async (req, res) => {
    try {
        const { orderDetail } = req.body;
        const existingOrderDetail = await OrderDetail.findById(req.params.orderDetailID);
        if (!existingOrderDetail) {
            return res.status(400).json({ error: "Invalid order detail ID" });
        }

        const order = await Order.findById(existingOrderDetail.orderID);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        if (order.accountID != req.auth._id) {
            return res.status(403).json({ error: "Unauthorized access" });
        }

        const existingOption = await option.findById(orderDetail.optionID);
        if (!existingOption) {
            return res.status(400).json({ error: "Invalid option ID" });
        }

        existingOrderDetail.optionID = existingOption._id;
        existingOrderDetail.price = existingOption.price;
        existingOrderDetail.dateBook = orderDetail.dateBook,
        existingOrderDetail.dateEnd = orderDetail.dateEnd,
        existingOrderDetail.status = orderDetail.status;

        const updatedOrderDetail = await existingOrderDetail.save();

        res.status(200).json({ message: "Order detail updated successfully", orderDetail: updatedOrderDetail });
    } catch (error) {
        res.status(500).json({ error: "Failed to update order detail", errorMessage: error.message });
    }
};

// Xóa order detail
exports.deleteOrderDetail = async (req, res) => {
    try {
        const orderDetailId = req.params.orderDetailID;
        const existingOrderDetail = await OrderDetail.findById(orderDetailId);

        if (!existingOrderDetail) {
            return res.status(404).json({ error: "Order detail not found" });
        }

        const order = await Order.findById(existingOrderDetail.orderID);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        if (order.accountID != req.auth._id) {
            return res.status(403).json({ error: "Unauthorized access" });
        }

        await existingOrderDetail.remove();

        res.status(200).json({ message: "Order detail deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete order detail", errorMessage: error.message });
    }
};