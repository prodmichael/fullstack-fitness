const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async (req, res) => {
	const candidate = await User.findOne({ email: req.body.email })

	if (candidate) {
		// check password
		const passwordResult = bcrypt.compareSync(
			req.body.password,
			candidate.password
		)
		if (passwordResult) {
			// generate token
			const token = jwt.sign(
				{
					email: candidate.email,
					userId: candidate._id,
				},
				keys.jwt,
				{ expiresIn: 60 * 60 }
			)

			res.status(200).json({
				token: `Bearer ${token}`,
			})
		} else {
			res.status(401).json({
				message: 'Пароль не совпадает',
			})
		}
	} else {
		// user not found
		res.status(404).json({
			message: 'User не существует',
		})
	}
}

module.exports.register = async (req, res) => {
	const candidate = await User.findOne({ email: req.body.email })

	if (candidate) {
		// User существует
		res.status(409).json({
			message: 'Email занят',
		})
	} else {
		// add user
		const salt = bcrypt.genSaltSync(10)
		const password = req.body.password
		const user = new User({
			email: req.body.email,
			password: bcrypt.hashSync(password, salt),
			firstName: req.body.firstName,
			lastName: req.body.firstName,
			dateOfBirth: req.body.dateOfBirth,
			weight: req.body.weight,
			height: req.body.height,
		})

		try {
			await user.save()
			res.status(201).json(user)
		} catch (e) {
			errorHandler(res, e)
		}
	}
}
