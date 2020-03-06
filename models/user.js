let mongoose = require("mongoose"),
  userSchema = new mongoose.Schema({
    userName: String,
    firstName: String,
    lastName: String,
    address: String
  });

module.exports = mongoose.model("User", userSchema);
