const express = require('express');
const TicketController = require('../controllers/tickets');

const Router = express.Router();

Router.post('/new', TicketController.newTicket);
Router.get('', TicketController.getTickets);
Router.get('/:_id', TicketController.getTicket);
Router.put('/:_id', TicketController.updateTicket);
Router.patch('/:_id', TicketController.closeTicket);

module.exports = Router;
