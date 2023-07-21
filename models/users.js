const mongoose = require("mongoose");
const { v1: uuidv1 } = require("uuid");
const crypto = require("crypto");
const { ObjectId } = mongoose.Schema;
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    default: null,
  },
  phone: {
    type: String,
    trim: true,
    default: null,
  },
  room: {
    type: String,
    trim: true,
    default: null,
  },
  block: {
    type: String,
    trim: true,
    default: null,
  },
  username:{
    type: String,
    trim: true,
    required: true,
  },
  hashed_password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    trim: true,
    default: "active",
  },
  image: {
    type: String,
    trim: true,
    default: null,
  },
  salt: String,
  createDate: {
    type: Date,
    default: Date.now,
  },
  updateDate: Date,
  role: {
    type: [String],
    default: ["user"],
  },
});
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });
userSchema.methods = {
  updatePassword: async function (oldPassword, newPassword) {
    if (!oldPassword || !newPassword) {
      throw new Error('Please provide password infomation');
    }

    if (!this.authenticate(oldPassword)) {
      throw new Error('The old password does not match');
    }

    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(newPassword);
    this.updateDate = Date.now();

    try {
      await this.save();
      this.hashed_password = undefined;
      this.salt = undefined;
      return this;
    } catch (error) {
      console.error('Đã xảy ra lỗi khi cập nhật mật khẩu:', error);
      throw new Error('Have a problem when user update.');
    }
  },
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },

};
module.exports = mongoose.model("Users", userSchema);
