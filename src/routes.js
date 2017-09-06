const Router = require('express').Router
const router = new Router()

const user = require('./model/user/router')
const ticket = require('./model/ticket/router')

router.route('/').get((req, res) => {
	res.json({message: 'Welcome to send-ticket API!'})
})

router.use('/user', user)
router.use('/ticket', ticket)

module.exports = router
