require('dotenv').config();

const express = require('express'),
  session = require('express-session'),
  FileStore = require(`session-file-store`)(session),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan'),
  expressValidator = require('express-validator'),
  flash = require('express-flash-notification'),
  es6Renderer = require('express-es6-template-engine'),
  axios = require('axios');

const indexRouter = require('./routes/index'),
  vehiclesRouter = require('./routes/vehicles'),
  carrRouter = require('./routes/carrs'),
  usersRouter = require('./routes/users');

const app = express();

app.engine('html', es6Renderer);
app.set('views', './views');
app.set('view engine', 'html');

app.use(
  session({
    store: new FileStore(),
    secret: process.env['SESH_SECRET'],
    resave: false,
    saveUninitialized: false,
    is_logged_in: false
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static('public'));
app.use(flash(app));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/vehicles', vehiclesRouter);
app.use('/carrs', carrRouter);

module.exports = app;
