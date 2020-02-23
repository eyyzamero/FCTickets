const mongoose = require("mongoose");

const LogSchema = mongoose.Schema({
  ticket_id: {
    type: String,
    required: true
  },
  userID: {
    type: String,
    required: true
  },
  log_type: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  creationDate: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("Log", LogSchema);
