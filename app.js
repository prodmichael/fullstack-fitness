const express = require('express')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const courseRoutes = require('./routes/course')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/auth', authRoutes)
app.use('/api/course', courseRoutes)

module.exports = app
