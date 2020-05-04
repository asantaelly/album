var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var hbs = require('express-handlebars')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var imagesRouter = require('./routes/images')
var favicon = require('serve-favicon')

// eslint-disable-next-line no-undef
const PROJECT_ROOT = __dirname

var app = express()

// view engine setup
app.engine(
	'hbs',
	hbs({
		extname: 'hbs',
		defaultLayout: 'layout',
		layoutsDir: PROJECT_ROOT + '/views/layouts/',
	})
)

app.set('views', path.join(PROJECT_ROOT, 'views'))
app.set('view engine', 'hbs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(PROJECT_ROOT, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/images', imagesRouter)
app.use(favicon(PROJECT_ROOT + '/public/favicon.ico'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404))
})

// error handler
app.use(function (err, req, res) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render('error')
})

module.exports = app
