const express = require("express");
const userController = require("../controllers/user");

const Router = express.Router();

Router.get("/:_id", userController.getUser);
Router.post("", userController.localDBUser);

module.exports = Router;
