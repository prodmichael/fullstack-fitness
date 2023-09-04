const bcrypt = require('bcryptjs')
const User = require('../models/User')

module.exports.login = (req, res) => {
	res.status(200).json({
		login: {
			email: req.body.email,
			password: req.body.password,
		},
	})
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
		} catch {
			;(e) => console.log(e)
		}
	}
}
