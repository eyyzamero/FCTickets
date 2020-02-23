const mongoose = require("mongoose");
require("../DBModels/comment");
const Ticket = mongoose.model("Ticket");

exports.searchByTTID = (req, res, next) => {
  let ttQuery = Ticket.findById(req.params.query);
  ttQuery
    .then(tickets => {
      res.status(200).json(tickets);
    })
    .catch(error => {
      res.status(500).json({
        message: "Tickets fetching failed!",
        description: error
      });
    });
};
