const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const db = require('./lib/db');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ftml');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));


/// Decrypt/Initialize AES Block key
app.use('/init', function(req, res, next) {
  let failed = false;
  if (req.body && req.body.cryptPhrase)
    failed = !db.initializeCrypto(req.body.cryptPhrase);

  res.render('init', {
    failed,
    initialized: db.initialized()
  });
});

/// Redirect any request to /init if crypto provider is not initialized
app.use(function(req, res, next) {
  if (!db.initialized())
    res.redirect('/init');
  else
    next();
});

/// Test for crypto interface
app.use('/test', function(req, res, next) {
  // update data if passed
  if (req.body && req.body.data) db.set(req.body.data);

  const decryptedData = db.get();

  res.render('test', { decryptedData });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
