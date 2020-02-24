const mongoose = require("mongoose");

const TicketSchema = mongoose.Schema({
  severity: {
    type: Number,
    required: true
  },
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
  userID: {
    type: String,
    required: true
  },
  asigneeID: {
    type: String,
    required: true
  },
  HPOE: {
    type: Boolean,
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
});

module.exports = mongoose.model("Ticket", TicketSchema);
