const Course = require('../models/Course')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async (req, res) => {
	try {
		const courses = await Course.find({ user: req.user.id })
		res.status(200).json(courses)
	} catch (e) {
		errorHandler(res, e)
	}
}

module.exports.getById = async (req, res) => {
	try {
		const course = await Course.findById(req.params.id)
		res.status(200).json(course)
	} catch (e) {
		errorHandler(res, e)
	}
}

module.exports.remove = async (req, res) => {
	try {
		await Course.remove({ _id: req.params.id })
		res.status(200).json({
			message: 'Course delete',
		})
	} catch (e) {
		errorHandler(res, e)
	}
}

module.exports.create = async (req, res) => {
	const course = new Course({
		name: req.body.name,
		video: req.body.video,
		user: req.user.id,
	})
	try {
		await course.save()
		res.status(200).json(course)
	} catch (e) {
		errorHandler(res, e)
	}
}

module.exports.update = async (req, res) => {
	const update = {
		name: req.body.name,
	}
	try {
	} catch (e) {
		errorHandler(res, e)
	}
}
