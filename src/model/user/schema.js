const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
	{
		_id: {type: String, required: true},
		name: {type: String, required: true},
		pass: {type: String, required: false},
		profiles: {type: [String], required: true},
		userCreated: {type: String, required: true},
		dateCreated: {type: Date, required: false},
		userUpdated: {type: String, required: true},
		dateModified: {type: Date, required: false},
	}, {
		toObject: {
			virtuals: true,
		},
		toJSON: {
			virtuals: true,
		},
	},
)
userSchema
	.virtual('email')
	.get(function() {
		return this._id
	})
	.set(function(email) {
		this._id = email
	})

userSchema.pre('save', function(next) {
	this.dateCreated = this.dateCreated || new Date()
	this.dateModified = new Date()
	next()
})

userSchema.pre('update', function(next) {
	this.dateModified = new Date()
	next()
})

module.exports = mongoose.model('User', userSchema)
