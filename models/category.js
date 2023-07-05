const mongoose = require("mongoose");
const { v1: uuidv1 } = require("uuid");
const { ObjectId } = mongoose.Schema;
const Post = require("./post");

const categorySchema = new mongoose.Schema({
    categoryID: { type: String, required: true },
    categoryName: { type: String, required: true }
  });
  
  module.exports = mongoose.model('Category', categorySchema);