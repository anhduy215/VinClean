const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const OrderDetail = require("../models/orderDetail");
const _ = require("lodash");
const mongoose = require("mongoose");

//get all order
exports.allOrder = async (req, res) => {
    try {
        const orders = await Order.find().sort({ date: -1 });

        res.status(200).json({
            list: orders
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders', errorMessage: error.message });
    }
};


//trả về order bằng search id
exports.getOrderById = async (req, res) => {
    try {
        const orderId = req.params.orderID;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        const orderDetail = await OrderDetail.find(orderID = orderId);

        res.status(200).json({ order, orderDetail });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch order", errorMessage: error.message });
    }
};

//add order
exports.addOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        newOrder.accountID = req.auth._id;

        const savedOrder = await newOrder.save();

        res.status(200).json({ message: "Order added successfully", order: savedOrder });
    } catch (error) {
        res.status(500).json({ error: "Failed to add order", errorMessage: error.message });
    }
};

//update order
exports.updateOrder = async (req, res) => {
    try {
        let existingOrder = await Order.findById(req.params.orderID);
        if (!existingOrder) {
            return res.status(400).json({ error: "Invalid order ID" });
        }

        if (existingOrder.accountID != req.auth._id) {
            return res.status(400).json({ error: "Invalid user ID" });
        }
        const allOrderDetail = await OrderDetail.find({ orderID: req.params.orderID });
        existingOrder = _.extend(existingOrder, req.body);
        
        let totalPrice = 0;
        allOrderDetail.forEach((orderDetail) => {
            totalPrice += orderDetail.price;
        });

        existingOrder.total = totalPrice;

        const updatedOrder = await existingOrder.save();

        res.status(200).json({ message: "Order updated successfully", order: updatedOrder });
    } catch (error) {
        res.status(500).json({ error: "Failed to update order", errorMessage: error.message });
    }
};

//delete order
exports.deleteOrder = async (req, res) => {
    try {

        const existingOrder = await Order.findById(req.params.orderID);
        if (!existingOrder) {
            return res.status(400).json({ error: "Invalid order ID" });
        }
        if (existingOrder.accountID != req.auth._id) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

        await existingOrder.remove();

        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete order", errorMessage: error.message });
    }
};  