const connection = require('../database/mysql')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const time = new Date()

/**
 *  User registration form
 */
exports.registration_form = (req, res) => {
	res.json({
		message: 'Registration form',
	})
}

/**
 *  Store new user to the database
 */
exports.user_registration = async (req, res) => {
	const userData = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		created_at: time,
		update_at: time,
	})

	try {
		const user = await userData.save()
		res.json({ success: true, user: user })
	} catch (error) {
		res.json({ success: false, message: error })
	}
}

/**
 *
 *   Return one user
 */
exports.get_user = async (req, res) => {
	let user_id = req.params.userID

	try {
		const user = await User.findById(user_id)
		res.json({ success: true, user: user })
	} catch (error) {
		res.json({ success: false, message: error })
	}
}

/**
 *
 *  Edit user instance
 *
 */
exports.edit_user = (req, res) => {
	let user_id = req.params.userID
	let userCredentials = {
		name: req.body.name,
		email: req.body.email,
		updated_at: time,
	}

	let edit_query = 'UPDATE users SET ? WHERE id = ?'
	connection.query(edit_query, [userCredentials, user_id], (err, rows) => {
		if (err) return console.log(err)

		return res.json({
			Message: 'User updated successfully',
			User: rows,
		})
	})
}

/**
 *   Authenticate a user
 */
exports.user_login = (req, res) => {
	let token = null
	let userData = {
		id: null,
		email: req.body.email,
		password: req.body.password,
	}

	let query_string = 'SELECT * FROM graphers WHERE email = ? AND password = ?'
	connection.query(
		query_string,
		[userData.email, userData.password],
		(err, rows) => {
			if (err) {
				throw err
			} else {
				if (rows.length > 0) {
					let auth_data = {
						id: rows[0].id,
						first_name: rows[0].first_name,
						last_name: rows[0].last_name,
						email: rows[0].email,
					}

					token = jwt.sign(auth_data, 'secretKey', {
						expiresIn: 60 * 60,
					})
					res.json({
						token,
					})
				} else {
					res.json({
						message: 'Email or Password is not recognized!',
					})
				}
			} //  end else
		}
	)
}
