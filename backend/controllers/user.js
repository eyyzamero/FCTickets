const mongoose = require("mongoose");
require("../DBmodels/user");
const User = mongoose.model("User");

exports.getUser = (req, res, next) => {
  User.findOne({ userID: req.params._id })
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({
        message: "User with provided ID not found!",
        description: error
      });
    });
};

exports.localDBUser = (req, res, next) => {
  let userData = {
    userID: req.body.userID,
    name: req.body.name,
    picture: req.body.picture
  };
  User.findOne({ userID: userData.userID }).then(user => {
    if (!user) {
      new User(userData)
        .save()
        .then(() => {
          res.status(201).json({
            message: "User information is now stored locally!"
          });
        })
        .catch(error => {
          res.status(500).json({
            message: "Unable to save user locally!",
            description: error
          });
        });
    } else {
      res.status(200).json({
        message: "This userID is already in the database!"
      });
    }
  });
};
