const mongoose = require("mongoose");
require("../DBModels/comment");
const Comment = mongoose.model("Comment");

exports.newComment = (req, res, next) => {
  const commentData = {
    ticket_id: req.body.ticket_id,
    createdBy: req.body.createdBy,
    content: req.body.content,
    likes: req.body.likes,
    dislikes: req.body.dislikes,
    status: req.body.status
  };
  new Comment(commentData)
    .save()
    .then(data => {
      res.status(201).json({
        message: "Comment Posted!",
        comment_id: data._id
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Comment not posted!",
        description: error
      });
    });
};

exports.getComments = (req, res, next) => {
  let commentQuery = Comment.find({ ticket_id: req.params._id });
  let numOfComments;
  req.query.numOfComments !== undefined
    ? (numOfComments = +req.query.numOfComments)
    : (numOfComments = 0);
  commentQuery.then(comments => {
    if (!comments) {
      res.status(404).json({
        message: `No Comments found for { ${req.params._id} }`,
        error: error
      });
    } else {
      commentQuery
        .limit(numOfComments)
        .then(comms => {
          res.status(200).json(comms);
        })
        .catch(error => {
          res.status(500).json({
            message: "Unable to fetch comments!",
            description: error
          });
        });
    }
  });
};
