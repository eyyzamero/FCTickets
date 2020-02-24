const express = require("express");
const subController = require("../controllers/sub");

const Router = express.Router();

Router.get("/:_id", subController.getUserSub);
Router.post("", subController.subCreateOrUpdate);

module.exports = Router;
