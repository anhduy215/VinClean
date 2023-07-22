const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderDetailSchema = new mongoose.Schema({
  orderID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  optionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Option",
  },
  price: {
    type: Number,
    trim: true,
    required: true,
  },
  dateBook: {
    type: Date,
    default: Date.now
  },
  dateEnd: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    trim: true,
    default: "not done",
  },
});
module.exports = mongoose.model("OrderDetail", orderDetailSchema);
