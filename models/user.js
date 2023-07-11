const mongoose = require("mongoose");
const { v1: uuidv1 } = require("uuid");
const crypto = require("crypto");
const { ObjectId } = mongoose.Schema;
const userSchema = new mongoose.Schema({
  accountID: {
    type: String,
    trim: true,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  phone: {
    type: String,
    trim: true,
    required: true,
  },
  userName: {
    type: String,
    trim: true,
    required: true,
  },
  address: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  status: {
    type: String,
    trim: true,
    required: true,
  },
  salt: String,
  create: {
    type: Date,
    default: Date.now,
  },
  UpdateDate: Date,
  roleId: {
    type: String,
    default: "user",
  },
});
userSchema.pre("remove", function (next) {
  Post.remove({ postedBy: this._id }).exec();
  next();
});
module.exports = mongoose.model("User", userSchema);
