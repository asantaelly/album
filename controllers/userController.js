const connection = require('../database/mysql')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

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
		created_at: Date.now(),
		updated_at: Date.now(),
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
exports.edit_user = async (req, res) => {
	let user_id = req.params.userID
	let userData = {
		name: req.body.name,
		email: req.body.email,
		updated_at: Date.now(),
	}

	try {
		const user = await User.findByIdAndUpdate(user_id, userData, {new:true})
		res.json({ success: true, user: user})
	} catch (error) {
		res.json({success: false, message: error})
	}
}



/**
 *   Authenticate user
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
