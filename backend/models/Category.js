const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  icon: {
    type: String,
    default: '📌'
  },
  color: {
    type: String,
    default: '#A8DADC'
  }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
