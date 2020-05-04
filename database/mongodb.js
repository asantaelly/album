/* eslint-disable no-undef */

/**
 * MongoDB connection configurations
 */
require('dotenv/config')
const mongoose = require('mongoose')

mongoose.connect(
	process.env.MONGO_DB,
	{ useNewUrlParser: true },
	console.log('\x1b[32m%s\x1b[30m', '[OK]', 'database connected!!')
)
