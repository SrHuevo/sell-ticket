const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autoIncrement = require('mongoose-auto-increment')

const Goal = new Schema({
	deadDate: String,
	murdereds: Number,
})

const ticketSchema = new Schema({
	name: {type: String, required: true},
	mail: {type: String, required: true},
	dni: {type: String, required: true},
	dateOfPursache: {type: Date, required: true},
	asAlive: Goal,
	asZombie1: Goal,
	asZombie2: Goal,
	asZombie3: Goal,
	pointsAliveRol: Number,
	pointsZombieRol: Number,
	pointsScary: Number,
	pointsBestCostume: Number,
	pointsBestSelfie: Number,
	pointsMostClever: Number,
	pointsBestStorytelling: Number,
	pointsFastest: Number,
})

ticketSchema.plugin(autoIncrement.plugin, 'Ticket')

module.exports = mongoose.model('Ticket', ticketSchema)
