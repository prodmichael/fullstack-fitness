const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
	email: {
		type: String,
		require: true,
		unique: true,
	},
	password: {
		type: String,
		require: true,
	},
	firstName: {
		type: String,
		require: true,
	},
	lastName: {
		type: String,
		require: true,
	},
	dateOfBirth: {
		type: String,
		require: true,
	},
	weight: {
		type: String,
		require: true,
	},
	height: {
		type: String,
		require: true,
	},
})

module.exports = mongoose.model('users', userSchema)
