class ControllerDB {
	constructor(facade) {
		this.facade = facade
	}

	async create(req, res, next) {
		try {
			req.json = await this.facade.create(req.body)
			next()
		} catch(err) {
			next(err)
		}
	}

	async find(req, res, next) {
		try {
			req.json = await this.facade.find(req.query)
			next()
		} catch(err) {
			next(err)
		}
	}

	async findOne(req, res, next) {
		try {
			req.json = await this.facade.findOne(req.query)
			next()
		} catch(err) {
			next(err)
		}
	}

	async findById(req, res, next) {
		try {
			req.json = await this.facade.findById(req.params.id)
			next()
		} catch(err) {
			next(err)
		}
	}

	async update(req, res, next) {
		try {
			req.json = await this.facade.update({_id: req.params.id}, req.body)
			next()
		} catch(err) {
			next(err)
		}
	}

	async remove(req, res, next) {
		try {
			req.json = await this.facade.remove({_id: req.params.id})
			next()
		} catch(err) {
			next(err)
		}
	}
}

module.exports = ControllerDB
