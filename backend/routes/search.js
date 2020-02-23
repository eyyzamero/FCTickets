const express = require("express");
const searchingController = require("../controllers/search");

const Router = express.Router();

Router.get("/TID/:query", searchingController.searchByTTID);
// Router.get("/UID/:query");
// Router.get("/GID/:query");

module.exports = Router;
