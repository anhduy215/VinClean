const mongoose = require("mongoose");
const { v1: uuidv1 } = require("uuid");
const { ObjectId } = mongoose.Schema;
const Post = require("./post");

const productDetailSchema = new mongoose.Schema({
  productDetailID: { type: String, required: true },
  productName: { type: String, required: true },
  status: { type: String, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }
});

module.exports = mongoose.model('ProductDetail', productDetailSchema);