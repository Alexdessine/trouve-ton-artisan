require('dotenv').config({ path: './src/config/database' });

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
var apiRouter = require('./src/routes/api.routes');

var app = express();
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
console.log("MAIL_FROM =", process.env.MAIL_FROM);
console.log("MAIL_TO =", process.env.MAIL_TO);
console.log("SMTP_HOST =", process.env.SMTP_HOST);
console.log("SMTP_PORT =", process.env.SMTP_PORT);
console.log("SMTP_SECURE =", process.env.SMTP_SECURE);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;

  return res.status(status).json({
    error: status === 500 ? "Internal Server Error" : "Error",
    message: err.message || "Erreur serveur."
  });
});

module.exports = app;
