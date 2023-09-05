const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const passport = require('passport')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const courseRoutes = require('./routes/course')
const keys = require('./config/keys')
const app = express()

mongoose
	.connect(keys.mongoURI)
	.then(() => console.log('MongoDB connected'))
	.catch((error) => console.log(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(require('cors')())
app.use('/api/auth', authRoutes)
app.use('/api/course', courseRoutes)

if (process.env.NODE_ENV === 'production') {
	// Дописать после build
	app.use(express.static())

	app.get('*', (req, res) => {
		res.sendFile(
			path.resolve(
				__dirname,
				'fitness-mobile',
				'dist',
				'fitness-mobile',
				'index.html'
			)
		)
	})
}

module.exports = app
