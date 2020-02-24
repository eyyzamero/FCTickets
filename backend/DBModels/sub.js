const mongoose = require("mongoose");

const SubSchema = mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  subbed_group: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Sub", SubSchema);
