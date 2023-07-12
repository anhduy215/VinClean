const express = require("express");
const router = express.Router();
const Option = require("../models/option");
const Service = require("../models/service");
const mongoose = require("mongoose");

//trả về option theo id
exports.getOptionById = async (req, res) => {
    try {
        const optionId = req.params.optionID;
        console.log(optionId);
        const option = await Option.findById(optionId);

        if (!option) {
            return res.status(404).json({ error: "Option not found" });
        }

        res.status(200).json({ option });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch option", errorMessage: error.message });
    }
};

//trả về all option
exports.allOptions = async (req, res) => {
    try {
        const options = await Option.find().sort({ created: -1 });

        res.status(200).json({
            totalItems: options.length,
            list: options
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch options', errorMessage: error.message });
    }
};

//add option
exports.addOption = async (req, res) => {
    try {
      const { option } = req.body;
  
      const existingService = await Service.findById(option.serviceID);
      if (!existingService) {
        return res.status(400).json({ error: "Invalid service ID" });
      }
  
      const newOption = new Option({
        serviceID: existingService._id,
        optionName: option.optionName,
        price: option.price,
      });
  
      const savedOption = await newOption.save();
  
      res.status(200).json({ message: "Option added successfully", option: savedOption });
    } catch (error) {
      res.status(500).json({ error: "Failed to add option", errorMessage: error.message });
    }
  };
  
  //update option
  exports.updateOption = async (req, res) => {
    try {
      const { option } = req.body;
  
      const existingOption = await Option.findById(req.params.optionID);
      if (!existingOption) {
        return res.status(400).json({ error: "Invalid option ID" });
      }
  
      existingOption.optionName = option.optionName;
      existingOption.price = option.price;
  
      const updatedOption = await existingOption.save();
  
      res.status(200).json({ message: "Option updated successfully", option: updatedOption });
    } catch (error) {
      res.status(500).json({ error: "Failed to update option", errorMessage: error.message });
    }
  };
  


//delete option
exports.deleteOption = async (req, res) => {
    try {
        const optionID = req.params.optionID;

        const existingOption = await Option.findById(optionID);
        if (!existingOption) {
            return res.status(400).json({ error: "Invalid option ID" });
        }

        await existingOption.remove();

        res.status(200).json({ message: "Option deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete option", errorMessage: error.message });
    }
};
