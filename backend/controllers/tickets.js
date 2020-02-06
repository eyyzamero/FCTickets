const mongoose = require('mongoose');
require('../DBmodels/ticket');
const Ticket = mongoose.model('Ticket');

exports.getTickets = (req, res, next) => {
  const ticketQuery = Ticket.find();
  ticketQuery.then(tickets => {
    res.status(200).json(
      tickets
    )
    }).catch(error => {
      res.status(500).json({
        message: 'Tickets fetching failed!',
        description: error
    })
  })
}

exports.newTicket = (req, res, next) => {
  const ticketData = {
    category: req.body.category,
    title: req.body.title,
    location: req.body.location,
    code: req.body.code,
    quantity: req.body.quantity,
    assignedGroup: req.body.assignedGroup,
    content: req.body.content
  };
  console.log(ticketData);
  new Ticket(ticketData).save().then(data => {
    res.status(201).json({
      message: 'Ticket Creation Successful',
      ticket_id: data._id
    });
  }).catch(error => {
    res.status(500).json({
      message: 'Ticket not created!',
      description: error
    });
  });
};
