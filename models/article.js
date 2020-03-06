let mongoose = require("mongoose"),
  articleSchema = new mongoose.Schema({
    title: String,
    descripation: String
  });

module.exports = mongoose.model("Article", articleSchema);
