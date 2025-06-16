const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  longUrl: String,
  shortUrl: String,
  shortCode: { type: String, unique: true },
}, { timestamps: true });

module.exports = mongoose.model('Url', urlSchema);
