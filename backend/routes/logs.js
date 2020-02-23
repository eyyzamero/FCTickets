const express = require("express");
const logsController = require("../controllers/logs");

const Router = express.Router();

Router.post("/new", logsController.newLog);
Router.get("/:_id", logsController.getLogs);

module.exports = Router;
