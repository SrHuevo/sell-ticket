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

	async getBetters(req, res, next) {
		try {
			const options = {
				skip: Number(req.query.skip),
				limit: Number(req.query.limit),
				sort: {},
			}

			options.sort = {'asAlice.kills': -1}
			const asAlivePromise = this.facade.find({asAlive: {$exists:true}}, {_id: true, asAlive: true}, options)
			options.sort = {'asZombie.murders': -1}
			const asZombiePromise = this.facade.find({asZombie: {$exists:true}, $where: 'this.asZombie.length > 1'}, {_id: true, 'asZombie.$': 1}, options)
			options.sort = {pointsSurvival: -1}
			const pointsSurvivalPromise = this.facade.find({}, {_id: true, pointsSurvival: true}, options)
			options.sort = {pointsZombie: -1}
			const pointsZombiePromise = this.facade.find({}, {_id: true, pointsZombie: true}, options)
			options.sort = {pointsScary: -1}
			const pointsScaryPromise = this.facade.find({}, {_id: true, pointsScary: true}, options)
			options.sort = {pointsClumsy: -1}
			const pointsClumsyPromise = this.facade.find({}, {_id: true, pointsClumsy: true}, options)
			options.sort = {pointsSoapOperaDeath: -1}
			const pointsSoapOperaDeathPromise = this.facade.find({}, {_id: true, pointsSoapOperaDeath: true}, options)
			options.sort = {pointMachiavellian: -1}
			const pointMachiavellianPromise = this.facade.find({}, {_id: true, pointMachiavellian: true}, options)
			const getPrematurePromise = this.facade.findOne({asAlive: {$exists: true}}, {_id: true}, {sort: {'asAlive.deadDate': 1}})

			req.json = {
				goalAlive: (await asAlivePromise).map(rank => ({dorsal: rank._id, points: rank.asAlive.kills})),
				goalZombie: (await asZombiePromise).map(rank => ({dorsal: rank._id, points: rank.asZombie[0].murders})),
				survival: (await pointsSurvivalPromise).map(rank => ({dorsal: rank._id, points: rank.pointsSurvival})),
				zombie: (await pointsZombiePromise).map(rank => ({dorsal: rank._id, points: rank.pointsZombie})),
				scary: (await pointsScaryPromise).map(rank => ({dorsal: rank._id, points: rank.pointsScary})),
				clumsy: (await pointsClumsyPromise).map(rank => ({dorsal: rank._id, points: rank.pointsClumsy})),
				soapOperaDeath: (await pointsSoapOperaDeathPromise).map(rank => ({dorsal: rank._id, points: rank.pointsSoapOperaDeath})),
				machiavellian: (await pointMachiavellianPromise).map(rank => ({dorsal: rank._id, points: rank.pointMachiavellian})),
				premature: {dorsal: (await getPrematurePromise)._id},
			}
			next()
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
			const $inc = req.body
			await this.facade.update({_id: req.params.id}, {$inc})
			next()
		} catch(err) {
			next(err)
		}
	}

	async addKills(req, res, next) {
		try {
			if(req.json.immortal || req.json.asAlive) {
				const goal = {
					deadDate: new Date(),
					murders: req.body.kills,
				}
				const $push = {asZombie: {$each: [goal], $sort: {murders: -1}}}
				await this.facade.update({_id: req.params.id}, {$push})
			} else {
				const asAlive = {
					deadDate: new Date(),
					kills: req.body.kills,
				}
				const $set = {asAlive}
				await this.facade.update({_id: req.params.id}, {$set})
			}
			next()
		} catch(err) {
			next(err)
		}
	}
}

module.exports = new TicketController(ticketFacade)
