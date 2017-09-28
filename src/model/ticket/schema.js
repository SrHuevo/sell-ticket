const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autoIncrement = require('mongoose-auto-increment')

const Goal = new Schema({
	deadDate: {type: Date, required: false},
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
	key: {type: Number, required: false},
	seller: {type: String, required: false},
	dateOfPursache: {type: Date, required: false},
	updater: {type: String, required: true},
	dateUpdated: {type: Date, required: false},
	immortal: {type: Boolean, required: true},
	reserved: {type: Boolean, required: true},
	used: {type: Boolean, required: true},
	asAlive: {type: Goal, required: false},
	asZombie: [{type: Goal, required: false}],
	pointsSurvival: {type: Number, default: 0},
	pointsZombie: {type: Number, default: 0},
	pointsScary: {type: Number, default: 0},
	pointsClumsy: {type: Number, default: 0},
	pointsSoapOperaDeath: {type: Number, default: 0},
	pointsPremature: {type: Number, default: 0},
	pointMachiavellian: {type: Number, default: 0},
})

ticketSchema.pre('save', function(next) {
	this.dateOfPursache = new Date()
	this.key = Math.random()
	next()
})

ticketSchema.pre('save', function(next) {
	this.dateOfPursache = new Date()
	this.dateUpdated = new Date()
	next()
})

ticketSchema.pre('update', function(next) {
	this.dateUpdated = new Date()
	next()
})

ticketSchema.plugin(autoIncrement.plugin, 'Ticket')

module.exports = mongoose.model('Ticket', ticketSchema)
