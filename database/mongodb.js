/* eslint-disable no-undef */

/**
 * MongoDB connection configurations
 *
 * create a copy of .env.example file and name it .env file,
 * construct mongodb connection url, and set it to MONGO_DB variable.
 *
 * you can setup mongodb on your local machine for testing but i would
 * recommend visiting the following link to create a test mongo database
 * and get url connection from there
 *
 * Link
 * https://mlab.com/
 */

require('dotenv/config')
const mongoose = require('mongoose')

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)

exports.mongodb_connection = () => {
	return mongoose
		.connect(
			process.env.MONGO_DB,
			console.log('\x1b[32m%s\x1b[30m', '[OK]', 'database connected!!')
		)
		.catch((error) => {
			console.log(
				'\x1b[32m%s\x1b[30m',
				'[FAILED]',
				'connection to the database failed'
			)
			console.log(error)
		})
}
