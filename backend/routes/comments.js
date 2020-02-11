const express = require('express');
const CommentsController = require('../controllers/comments');

const Router = express.Router();

Router.post('/new', CommentsController.newComment);
Router.get('/:_id', CommentsController.getComments);
// Router.get('/single/:_id', CommentsController.getComment);
// Router.put('/:_id', CommentsController.updateComment);
// Router.patch('/_id', CommentsController.hideComment);

module.exports = Router;
