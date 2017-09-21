const controllerDB = require('./controller-db')
const controllerWS = require('./controller-ws')
const Router = require('express').Router
const router = new Router()
const security = require('../../mindelware/security')
const{CHECKING, TICKET_VIEWER, TICKET_EDITOR} = require('../../super-powers')
const checkPowers = require('../../mindelware/check-powers')
const jwt = require('jsonwebtoken')
const{jwtSecret} = require('../../config')
const sendMailTicket = require('../../mindelware/mail-send-ticket')

router.route('/')
	.all(security)
	.all((...args) => checkPowers(...args)(CHECKING))
	.get(
		(req, res, next) => {
			const token = jwt.sign({name: 'daniel', profile: 1}, jwtSecret)
			console.log(token)
			next()
		},
		(...args) => controllerDB.find(...args),
		(...args) => controllerWS.ok(...args),
	)
	.post(
		(...args) => controllerDB.create(...args),
		(...args) => sendMailTicket(...args),
		(...args) => controllerWS.created(...args),
	)

router.route('/:id')
	.post(
		(...args) => security(...args),
		(...args) => checkPowers(...args)(TICKET_EDITOR),
		(...args) => controllerDB.update(...args),
		(...args) => controllerDB.findById(...args),
		(...args) => sendMailTicket(...args),
		(...args) => controllerWS.ok(...args),
	)
	.get(
		(...args) => security(...args),
		(...args) => checkPowers(...args)(TICKET_VIEWER),
		(...args) => controllerDB.findById(...args),
		(...args) => controllerWS.ok(...args),
	)

module.exports = router
