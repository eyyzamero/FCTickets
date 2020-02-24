const mongoose = require("mongoose");
require("../DBmodels/sub");
const Sub = mongoose.model("Sub");

exports.getUserSub = (req, res, next) => {
  let userID = req.params._id;
  Sub.findOne({ userID: userID })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching user's subscription failed!",
        description: error
      });
    });
};

exports.subCreateOrUpdate = (req, res, next) => {
  const subData = {
    userID: req.body.userID,
    subbed_group: req.body.subbed_group
  };
  Sub.findOne({ userID: subData.userID }).then(sub => {
    if (!sub) {
      new Sub(subData)
        .save()
        .then(data => {
          res.status(201).json({
            message: "Initial Subscription created!"
          });
        })
        .catch(error => {
          res.status(500).json({
            message: "Initial Subscription creation failed!",
            description: error
          });
        });
    } else {
      Sub.updateOne({ userID: subData.userID }, subData)
        .then(sub => {
          res.status(200).json({
            message: "Subscription changed!"
          });
        })
        .catch(error => {
          res.status(500).json({
            message: "Subscription update failed!",
            description: error
          });
        });
    }
  });
};
