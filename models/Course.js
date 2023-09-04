const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseSchema = new Schema({
	name: {
		type: String,
		require: true,
	},
	video: {
		type: String,
		require: true,
	},
	user: {
		ref: 'users',
		type: Schema.Types.ObjectId,
	},
})

module.exports = mongoose.model('courses', courseSchema)
