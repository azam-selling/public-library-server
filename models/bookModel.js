const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookModel = new Schema({
  title: { type: String },
  genre: { type: String },
  author: { type: String },
  availableQty: { type: Number },
  read: { type: Boolean, default: false },
});

module.exports = mongoose.model("Book", bookModel);
