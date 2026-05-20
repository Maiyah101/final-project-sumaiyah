const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Entry', entrySchema);