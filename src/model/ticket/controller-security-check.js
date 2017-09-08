const response = (superPowerNeedy, profiles, next) => {
	if(profiles.find(superpower => superpower === superPowerNeedy)) {
		next()
	} else {
		next({status: 403})
	}
}

const check = (req, res, next) =>
	superPower =>
		response(superPower, req.user.profiles, next)

module.exports = check
