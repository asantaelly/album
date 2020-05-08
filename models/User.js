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
	},
	updated_at: {
		type: Date,
	},
})

module.exports = mongoose.model('User', UserSchema)
