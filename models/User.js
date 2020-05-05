const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		index: { unique: true },
	},
	password: {
		type: String,
		required: true,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
	update_at: {
		type: Date,
		default: Date.now,
	},
})

module.exports = mongoose.model('User', UserSchema)
