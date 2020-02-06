const mongoose = require('mongoose');

const TicketSchema = mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  assignedGroup: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  creation_date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Ticket', TicketSchema);
