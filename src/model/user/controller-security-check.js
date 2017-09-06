const superPowers = require('../../super-powers')


const response = (superPowerNeedy, profiles, next) => {
	if(profiles.find(superpower => superpower === superPowerNeedy)) {
		next()
	} else {
		next({status: 403})
	}
}

const userCreator = (req, res, next) => {
	response(superPowers.USER_CREATOR, req.user.profiles, next)
}

const canChangeMyPassword = (req, res, next) => {
	response(superPowers.CHANGE_MY_PASSWORD, req.user.profiles, next)
}

const userEditor = (req, res, next) => {
	response(superPowers.USER_EDITOR, req.user.profiles, next)
}

module.exports = {
	userCreator,
	canChangeMyPassword,
	userEditor,
}
