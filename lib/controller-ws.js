class ControllerWS {
	created(req, res) {
		res.send(200, req.json)
	}

	noConent(req, res) {
		res.sendStatus(204)
	}
}

module.exports = ControllerWS
