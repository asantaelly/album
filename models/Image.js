const mongoose = require('mongoose')

const ImageSchema = mongoose.Schema({
	description: {
		type: String,
		required: true,
	},
	photo: {
		type: String,
		required: true,
	},
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	created_at: {
		type: Date,
	},
	updated_at: {
		type: Date,
	},
})

module.exports = mongoose.model('Image', ImageSchema)
