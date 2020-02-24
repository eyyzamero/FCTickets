const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("User", userSchema);
