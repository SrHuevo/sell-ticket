const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autoIncrement = require('mongoose-auto-increment')

const Goal = new Schema({
	deadDate: {type: Date, required: true},
	murdereds: {type: Number, required: true},
})

Goal.pre('save', function(next) {
	this.deadDate = new Date()
	next()
})

const ticketSchema = new Schema({
	name: {type: String, required: true},
	email: {type: String, required: true},
	dni: {type: String, required: true},
	dateOfPursache: {type: Date, required: false},
	key: {type: Number, required: false},
	immortal: {type: Boolean, required: true},
	asAlive: {type: Goal, required: false},
	asZombie1: {type: Goal, required: false},
	asZombie2: {type: Goal, required: false},
	asZombie3: {type: Goal, required: false},
	pointsAliveRol: {type: Number, default: 0},
	pointsZombieRol: {type: Number, default: 0},
	pointsScary: {type: Number, default: 0},
	pointsBestCostume: {type: Number, default: 0},
	pointsBestSelfie: {type: Number, default: 0},
	pointsMostClever: {type: Number, default: 0},
	pointsBestStorytelling: {type: Number, default: 0},
	pointsFastest: {type: Number, default: 0},
})

ticketSchema.pre('save', function(next) {
	this.dateOfPursache = new Date()
	this.key = Math.random()
	this.asZombie1 = {
		deadDate: new Date(),
		murdereds: 0,
	}
	this.asZombie2 = {
		deadDate: new Date(),
		murdereds: 0,
	}
	this.asZombie3 = {
		deadDate: new Date(),
		murdereds: 0,
	}
	next()
})

ticketSchema.plugin(autoIncrement.plugin, 'Ticket')

module.exports = mongoose.model('Ticket', ticketSchema)
