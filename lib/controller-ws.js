class ControllerWS {
	ok(req, res) {
		res.send(200, req.json)
	}

	created(req, res) {
		res.send(201, req.json)
	}

	noConent(req, res) {
		res.sendStatus(204)
	}
}

module.exports = ControllerWS
