const mongoose = require("mongoose");
require("../DBModels/log");
const Log = mongoose.model("Log");

exports.newLog = (req, res, next) => {
  const logData = {
    ticket_id: req.body.ticket_id,
    userID: req.body.userID,
    log_type: req.body.log_type,
    content: req.body.content,
    creationDate: req.body.creationDate
  };
  new Log(logData)
    .save()
    .then(data => {
      res.status(201).json({
        log_id: data._id,
        message: "Activity Logged"
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Unable to log activity!",
        description: error
      });
    });
};

exports.getLogs = (req, res, next) => {
  Log.find({ ticket_id: req.params._id })
    .then(logs => {
      res.status(200).json(logs);
    })
    .catch(error => {
      res.status(500).json({
        message: "Unable to get logs for this ticket!",
        description: error
      });
    });
};
