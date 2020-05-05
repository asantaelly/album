/* eslint-disable no-undef */
/**
 *	MySQL Database Configuration Settings
 *
 *	in case you haven't read the README file, create a copy of
 *	.env.example file and name it .env file, fill the appropriate
 *	information to connect to the database
 */

const mysql = require('mysql')
require('dotenv/config')

const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
})

connection.connect((err) => {
	if (err) throw err
	console.log('\x1b[32m%s\x1b[30m', '[OK]', 'database connected!!')
})

module.exports = connection
