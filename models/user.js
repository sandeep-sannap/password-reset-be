const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: String,
    name: String,
    status: {
      type: String,
      enum: ["Pending", "Active"],
      default: "Pending",
    },
    passwordResetToken: {
      type: String,
      default: "",
    },
    passwordResetExpires: {
      type: Date,
      default: Date.now(),
    },
    confirmationCode: {
      type: String,
    },
  })
);

module.exports = User;
