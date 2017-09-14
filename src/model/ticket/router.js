const controllerDB = require('./controller-db')
const controllerWS = require('./controller-ws')
const Router = require('express').Router
const router = new Router()
const security = require('../../mindelware/security')
const{CHECKING} = require('../../super-powers')
const check = require('../../mindelware/check-powers')
const jwt = require('jsonwebtoken')
const{jwtSecret} = require('../../config')
const sendMailTicket = require('../../mindelware/mail-send-ticket')

router.route('/')
	.all(security)
	.all((...args) => check(...args)(CHECKING))
	.get(
		(req, res, next) => {
			const token = jwt.sign({name: 'daniel', profile: 1}, jwtSecret)
			console.log(token)
			next()
		},
		(...args) => controllerDB.find(...args),
		(req, res, next) => {
			res.status(200).json(res.collection)
		},
	)
	.post(
		(...args) => controllerDB.create(...args),
		(...args) => sendMailTicket(...args),
		(...args) => controllerWS.created(...args),
	)

router.route('/:id')
	.put((...args) => controllerDB.update(...args))
	.get(
		(...args) => controllerDB.findById(...args),
		(req, res, next) => {
			if(!res.doc) return res.sendStatus(204)
			res.status(200).json(res.doc._doc)
		}
	)

module.exports = router
