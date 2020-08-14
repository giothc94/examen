var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

// API's
const { UsersApi } = require("./routes/index");

// Init app
var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// init apis
UsersApi(app);

// error handlers

app.use((err, req, res, next) => {
  res.status(err.code).json({
    statusCode: err.code || 500,
    message: err,
  });
});
process.on("unhandledRejection", (err) => {
  console.log("ERROR:::", err);
});

module.exports = app;
