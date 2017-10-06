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
				test: true,
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
			req.body.userUpdated = req.user.email
			req.body.changePassword = true
			super.create(req, res, next)
		} catch(err) {
			next(err)
		}
	}

	me(req, res, next) {
		req.json = {
			email: req.user.email,
			profiles: req.user.profiles,
		}
		next()
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

	async getList(req, res, next) {
		try {
			req.json = await this.facade.find(req.query, {
				email: true,
				name: true,
				userCreated: true,
				dateCreated: true,
				userModified: true,
				dateModified: true,
			})
			next()
		} catch(err) {
			next(err)
		}
	}

	async get(req, res, next) {
		try {
			req.json = await this.facade.findById(req.params.id, {
				email: true,
				name: true,
			})
			next()
		} catch(err) {
			next(err)
		}
	}

	async removeAndUpdated(req, res, next) {
		try {
			const user = await this.facade.findById(req.params.id)
			user.name = req.body.name
			user.userUpdated = req.user.email
			if(user.email !== req.body.email) {
				user.email = req.body.email
				await this.facade.remove({_id: req.params.id})
				req.json = await this.facade.create(user.toJSON())
			} else {
				this.facade.update({_id: req.params.id}, {$set: {name: user.name}})
			}
			next()
		} catch(err) {
			next(err)
		}
	}
}

module.exports = new UserControllerDB(userFacade)
