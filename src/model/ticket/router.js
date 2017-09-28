const controllerDB = require('./controller-db')
const controllerWS = require('./controller-ws')
const Router = require('express').Router
const router = new Router()
const security = require('../../mindelware/security')
const {TICKET_CHECKING, TICKET_VIEWER, TICKET_EDITOR, TICKET_SELLER, TICKET_RATING} = require('../../super-powers')
const checkPowers = require('../../mindelware/check-powers')
const sendMailTicket = require('../../mindelware/mail-send-ticket')

router.route('/')
	.all(security)
	.all((...args) => checkPowers(...args)(TICKET_SELLER))
	.get(
		(...args) => controllerDB.find(...args),
		(...args) => controllerWS.ok(...args),
	)
	.post(
		(...args) => controllerDB.create(...args),
		(...args) => sendMailTicket(...args),
		(...args) => controllerWS.created(...args),
	)

router.route('/:id')
	.all(security)
	.post(
		(...args) => checkPowers(...args)(TICKET_EDITOR),
		(...args) => controllerDB.update(...args),
		(...args) => controllerDB.findById(...args),
		(...args) => sendMailTicket(...args),
		(...args) => controllerWS.ok(...args),
	)
	.get(
		(...args) => checkPowers(...args)(TICKET_VIEWER),
		(...args) => controllerDB.findById(...args),
		(...args) => controllerWS.ok(...args),
	)

router.route('/:id/used')
	.all(security)
	.patch(
		(...args) => checkPowers(...args)(TICKET_CHECKING),
		(...args) => controllerDB.checkUsed(...args),
		(...args) => controllerDB.used(...args),
		(...args) => controllerWS.noConent(...args),
	)

router.route('/:id/points')
	.all(security)
	.patch(
		(...args) => checkPowers(...args)(TICKET_RATING),
		(...args) => controllerDB.addPoints(...args),
		(...args) => controllerWS.noConent(...args),
	)

module.exports = router
