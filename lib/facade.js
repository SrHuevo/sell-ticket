class Facade {
	constructor(Schema) {
		this.Schema = Schema
	}

	create(body) {
		const schema = new this.Schema(body)
		return schema.save()
	}

	find(...args) {
		return this.Schema
			.find(...args)
			.exec()
	}

	findOne(...args) {
		return this.Schema
			.findOne(...args)
			.exec()
	}

	findById(...args) {
		return this.Schema
			.findById(...args)
			.exec()
	}

	count(...args) {
		return this.Schema
			.count(...args)
			.exec()
	}

	update(...args) {
		return this.Schema
			.update(...args)
			.exec()
	}

	findOneAndUpdate(...args) {
		return this.Schema
			.findOneAndUpdate(...args)
			.exec()
	}

	remove(...args) {
		return this.Schema
			.remove(...args)
			.exec()
	}
}

module.exports = Facade
