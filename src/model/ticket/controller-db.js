const{CAN_RESERVE} = require('../../super-powers')
const Controller = require('../../../lib/controller-db')
const ticketFacade = require('./facade')

class TicketController extends Controller {

	create(req, res, next) {
		req.body.seller = req.user.email
		req.body.updater = req.user.email
		super.create(req, res, next)
	}

	async checkUsed(req, res, next) {
		try {
			req.json = await this.facade.findById(req.params.id)
			if(req.json.used) {
				next({status: 409, message: 'the ticket has been used'})
			} else {
				next()
			}
		} catch(err) {
			next(err)
		}
	}

	async used(req, res, next) {
		try {
			if(req.body.reserved && req.user.profiles.indexOf(CAN_RESERVE) === -1) {
				return next({error: 403, message: 'you havent permissions'})
			}

			const $set = {
				updater: req.user.email,
				used: true,
			}
			req.body._id = req.params.id
			const result = await this.facade.update(req.body, {$set})
			if(result.nModified !== 1) {
				return next({error: 409, message: 'the ticked has wrong params'})
			}
			next()
		} catch(err) {
			next(err)
		}
	}

	async addPoints(req, res, next) {
		try {
			const $inc = {}
			$inc[req.body.add.name] = req.body.add.points
			await this.facade.update({_id: req.params.id}, {$inc})
			next()
		} catch(err) {
			next(err)
		}
	}
}

module.exports = new TicketController(ticketFacade)
