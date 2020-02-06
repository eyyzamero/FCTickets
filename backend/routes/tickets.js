const express = require('express');
const TicketController = require('../controllers/tickets');

const Router = express.Router();

Router.post('/new', TicketController.newTicket);
Router.get('', TicketController.getTickets)

module.exports = Router;
