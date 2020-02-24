const mongoose = require("mongoose");
require("../DBmodels/ticket");
const Ticket = mongoose.model("Ticket");

exports.getTickets = (req, res, next) => {
  let ticketQuery = Ticket.find();
  let numOfTickets;
  req.query.pageSize !== undefined
    ? (numOfTickets = +req.query.pageSize)
    : (numOfTickets = 0);
  ticketQuery
    .limit(numOfTickets)
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

exports.getTicket = (req, res, next) => {
  Ticket.findById(req.params._id)
    .then(ticket => {
      res.status(200).json(ticket);
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching tickets failed!",
        description: error
      });
    });
};

exports.newTicket = (req, res, next) => {
  const ticketData = {
    severity: req.body.severity,
    category: req.body.category,
    title: req.body.title,
    location: req.body.location,
    code: req.body.code,
    quantity: req.body.quantity,
    assignedGroup: req.body.assignedGroup,
    content: req.body.content,
    userID: req.body.userID,
    asigneeID: req.body.asigneeID,
    HPOE: req.body.HPOE,
    status: req.body.status
  };
  new Ticket(ticketData)
    .save()
    .then(data => {
      res.status(201).json({
        message: "Ticket Creation Successful",
        ticket_id: data._id
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Ticket not created!",
        description: error
      });
    });
};

exports.updateTicket = (req, res, next) => {
  const ticketData = {
    _id: req.params._id,
    severity: req.body.severity,
    category: req.body.category,
    title: req.body.title,
    location: req.body.location,
    code: req.body.code,
    quantity: req.body.quantity,
    assignedGroup: req.body.assignedGroup,
    content: req.body.content,
    userID: req.body.userID,
    asigneeID: req.body.asigneeID,
    HPOE: req.body.HPOE,
    status: req.body.status
  };
  Ticket.updateOne({ _id: req.params._id }, ticketData)
    .then(() => {
      res.status(200).json({ message: "Update Successful!" });
    })
    .catch(error => {
      res.status(500).json({
        message: "Updating post failed!",
        description: error
      });
    });
};

exports.closeTicket = (req, res, next) => {
  const closingData = {
    status: false
  };
  Ticket.updateOne({ _id: req.params._id }, closingData)
    .then(() => {
      res.status(200).json({ message: "Update Successful!", date: Date.now() });
    })
    .catch(error => {
      res.status(500).json({
        message: "Unable to close this ticket!",
        description: error
      });
    });
};
