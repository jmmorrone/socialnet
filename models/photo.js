const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const photo = new Schema({
  added: { type: Date, required: true, default: Date.now },
  likes: { type: Number, required: true, default: 0 },
  comments: { type: Number, required: true, default: 0 },
  url: { type: String, required: true },
  description: { type: String },
  author: { type: String, index: true, required: true },
});

module.exports = mongoose.model('Photo', photo);
