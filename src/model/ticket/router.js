const controller = require('./controller')
const Router = require('express').Router
const router = new Router()
const security = require('../../mindelware/security')
const jwt = require('jsonwebtoken')
const {jwtSecret} = require('../../config')

router.route('/')
	.get(
		(req, res, next) => {
			const token = jwt.sign({name: 'daniel', profile: 1}, jwtSecret)
			console.log(token)
			next()
		},
		(...args) => controller.find(...args),
		(req, res, next) => {
			res.status(200).json(res.collection)
		},
	)
	.post(
		security,
		(...args) => controller.create(...args),
		(req, res, next) => {
			res.status(200).json(res.doc._doc)
		},
	)

router.route('/:id')
	.put((...args) => controller.update(...args))
	.get(
		(...args) => controller.findById(...args),
		(req, res, next) => {
			if(!res.doc) return res.sendStatus(204)
			res.status(200).json(res.doc._doc)
		}
	)

module.exports = router
