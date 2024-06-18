var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");

var indexRouter = require('./routes/index');
let productsRouter = require("./routes/products")
let usersRouter = require("./routes/users")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  name: "session_id",
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use('/', indexRouter);
app.use('/product', productsRouter);
app.use('/profile', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  app.use(function(req, res, next){
    if (req.session && req.session.user) {
      res.locals.usuarioLogueado = {
        id: req.session.user.id,
        username: req.session.user.username,
        email: req.session.user.email
      };
    } else {
      res.locals.usuarioLogueado = null;
    }
    return next();
  });
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
