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

}
