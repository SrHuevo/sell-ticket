const ControllerDB = require('../../../lib/controller-db')
const userFacade = require('./facade')
const{comparePassword, cryptPassword} = require('../../utils/encrypt')

class UserControllerDB extends ControllerDB {

	async login(req, res, next) {
		try {
			req.json = await this.facade.findById(req.body.email, {
				email: true,
				profiles: true,
				pass: true,
			})
			await comparePassword(req.body.pass, req.json.pass)
			next()
		} catch(err) {
			next({status: 401})
		}
	}

	async register(req, res, next) {
		try {
			req.body.userCreated = req.user.email
			req.body.changePassword = true
			super.create(req, res, next)
		} catch(err) {
			next(err)
		}
	}

	async changePass(req, res, next) {
		try {
			const passCrypted = await cryptPassword(req.body.pass)
			console.log(req.user.email)
			await this.facade.update({_id: req.user.email}, {$set: {pass: passCrypted}})
			next()
		} catch(err) {
			next(err)
		}
	}
}

module.exports = new UserControllerDB(userFacade)
