const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema({
  accountID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  // paymentID: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Payment",
  //   required: true,
  // },
  total: {
    type: Number,
    trim: true,
  },
  status: {
    type: String,
    trim: true,
    default: "not paid",
  },
});
module.exports = mongoose.model("Order", orderSchema);
