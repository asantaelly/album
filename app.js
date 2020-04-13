var express = require('express');
var logger = require('morgan');
const fileupload = require('express-fileupload');
const cors = require('cors');
const createError = require('http-errors');
const hbs = require('express-handlebars');
const path = require('path');

var indexRouter = require('./routes/index');
let apiRouter = require('./routes/api');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(fileupload({
  safeFileNames: true,
  preserveExtension: true
}));
app.use(express.static(__dirname + '/'));

// View Engine Setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;

