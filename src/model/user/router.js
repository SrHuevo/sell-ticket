const controllerDB = require('./controller-db')
const controllerWS = require('./controller-ws')
const controllerSecurityCheck = require('./controller-security-check')
const Router = require('express').Router
const security = require('../../mindelware/security')
const mailSendPassword = require('../../mindelware/mail-send-password')
const router = new Router()

router.route('/login')
	.post(
		(...args) => controllerDB.login(...args),
		(...args) => controllerWS.sendJWT(...args),
	)

router.route('/register')
	.post(
		(...args) => security(...args),
		(...args) => controllerSecurityCheck.userCreator(...args),
		(...args) => controllerDB.register(...args),
		(...args) => mailSendPassword(...args),
		(...args) => controllerWS.created(...args),
	)

router.route('/pass')
	.patch(
		(...args) => security(...args),
		(...args) => controllerSecurityCheck.canChangeMyPassword(...args),
		(...args) => controllerDB.changePass(...args),
		(...args) => controllerWS.noConent(...args),
	)

router.route('/:id/pass')
	.post(
		(...args) => security(...args),
		(...args) => controllerSecurityCheck.userEditor(...args),
		(...args) => controllerDB.findById(...args),
		(...args) => mailSendPassword(...args),
		(...args) => controllerWS.noConent(...args),
	)

module.exports = router
