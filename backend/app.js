const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const TicketRoutes = require("./routes/tickets");
const CommentRoutes = require("./routes/comments");
const LogsRoutes = require("./routes/logs");
const SearchRoutes = require("./routes/search");
const UserRoutes = require("./routes/user");
const SubRoutes = require("./routes/sub");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

mongoose
  .connect("mongodb://127.0.0.1/FCTicketsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to the FCTickets DB"))
  .catch(err => console.log(err));

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/tickets", TicketRoutes);
app.use("/api/comments", CommentRoutes);
app.use("/api/logs", LogsRoutes);
app.use("/api/search", SearchRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/sub", SubRoutes);

module.exports = app;
