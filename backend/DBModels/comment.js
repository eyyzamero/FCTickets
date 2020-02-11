const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  ticket_id: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: true
  },
  dislikes: {
    type: Number,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  },
  creation_date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Comment', CommentSchema);
