const ControllerWS = require('../../../lib/controller-ws')
const jwt = require('jsonwebtoken')
const{jwtSecret} = require('../../config')

class UserControllerWS extends ControllerWS {

}

module.exports = new UserControllerWS()
