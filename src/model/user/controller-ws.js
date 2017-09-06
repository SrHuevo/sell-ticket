const ControllerWS = require('../../../lib/controller-ws')
const jwt = require('jsonwebtoken')
const{jwtSecret} = require('../../config')

class UserControllerWS extends ControllerWS {

	sendJWT(req, res) {
		const json = jwt.sign(JSON.parse(JSON.stringify(req.json)), jwtSecret)
		res.send(200, {jwt: json})
	}
}

module.exports = new UserControllerWS()
