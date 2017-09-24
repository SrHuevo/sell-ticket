const controllerDB = require('./controller-db')
const controllerWS = require('./controller-ws')
const checkPowers = require('../../mindelware/check-powers')
const{USER_CREATOR, CHANGE_MY_PASSWORD, USER_EDITOR, USER_VIWER} = require('../../super-powers')
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
		(...args) => checkPowers(...args)(USER_CREATOR),
		(...args) => controllerDB.register(...args),
		(...args) => mailSendPassword(...args),
		(...args) => controllerWS.created(...args),
	)

router.route('/pass')
	.patch(
		(...args) => security(...args),
		(...args) => checkPowers(...args)(CHANGE_MY_PASSWORD),
		(...args) => controllerDB.changePass(...args),
		(...args) => controllerWS.noConent(...args),
	)

router.route('/me')
	.get(
		(...args) => security(...args),
		(...args) => controllerDB.me(...args),
		(...args) => controllerWS.ok(...args),
	)

router.route('/:id/pass')
	.post(
		(...args) => security(...args),
		(...args) => checkPowers(...args)(USER_EDITOR),
		(...args) => controllerDB.findById(...args),
		(...args) => mailSendPassword(...args),
		(...args) => controllerWS.noConent(...args),
	)

router.route('/')
	.get(
		(...args) => security(...args),
		(...args) => checkPowers(...args)(USER_VIWER),
		(...args) => controllerDB.getList(...args),
		(...args) => controllerWS.ok(...args),
	)

router.route('/:id')
	.get(
		(...args) => security(...args),
		(...args) => checkPowers(...args)(USER_VIWER),
		(...args) => controllerDB.get(...args),
		(...args) => controllerWS.ok(...args),
	)
	.post(
		(...args) => security(...args),
		(...args) => checkPowers(...args)(USER_EDITOR),
		(...args) => controllerDB.removeAndUpdated(...args),
		(...args) => controllerWS.ok(...args),
	)

module.exports = router
