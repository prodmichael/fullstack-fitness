const express = require('express')
const controller = require('../controllers/course')
const upload = require('../middleware/upload')
const passport = require('passport')
const router = express.Router()

router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	controller.getAll
)
router.get(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	controller.getById
)
router.delete(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	controller.remove
)
router.post(
	'/',
	upload.single('video'),
	passport.authenticate('jwt', { session: false }),
	controller.create
)
router.patch(
	'/:id',
	upload.single('video'),
	passport.authenticate('jwt', { session: false }),
	controller.update
)

module.exports = router
