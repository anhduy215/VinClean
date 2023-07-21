const express = require("express");
const router = express.Router();
const Service = require("../models/service");
const Option = require("../models/option");
const mongoose = require("mongoose");

//get service theo id
exports.getServiceById = async (req, res) => {
  try {
    const serviceId = req.params.serviceID;
    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    const options = await Option.find({ serviceID: serviceId });

    res.status(200).json({ options });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch service", errorMessage: error.message });
  }
};

// trả về all service
exports.getAllService = async (req, res) => {
  try {
    const services = await Service.find().sort({ created: -1 });

    res.status(200).json({
      totalItems: services.length,
      list: services
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch services', errorMessage: error.message });
  }
};

//add service
exports.addService = async (req, res) => {
  try {
    const { service } = req.body;

    const newService = new Service({
      serviceName: service.serviceName,
    });

    const savedService = await newService.save();

    res.status(200).json({ message: "Service added successfully", service: savedService });
  } catch (error) {
    res.status(500).json({ error: "Failed to add service", errorMessage: error.message });
  }
};

//update service
exports.updateService = async (req, res) => {
  try {
    const { service } = req.body;

    const existingService = await Service.findById(req.params.serviceID);
    if (!existingService) {
      return res.status(400).json({ error: "Invalid service ID" });
    }

    existingService.serviceName = service.serviceName;

    const updatedService = await existingService.save();

    res.status(200).json({ message: "Service updated successfully", service: updatedService });
  } catch (error) {
    res.status(500).json({ error: "Failed to update service", errorMessage: error.message });
  }
};

//delete service
exports.deleteService = async (req, res) => {
  try {
    const serviceID = req.params.serviceID;

    const existingService = await Service.findById(serviceID);
    if (!existingService) {
      return res.status(400).json({ error: "Invalid service ID" });
    }

    await existingService.remove();

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete service", errorMessage: error.message });
  }
};
