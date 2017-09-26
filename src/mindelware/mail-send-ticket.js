const{fromName, fromMailer} = require('../config')
const mailTicket = require('../utils/mail-ticket')
const sg = require('../../lib/mailer')

const mailSendPassword = async (req, res, next) => {
	try {
		const data = JSON.stringify({
			_id: req.json._id,
			email: req.json.email,
			dni: req.json.dni,
			name: req.json.name,
			dateOfPursache: req.json.dateOfPursache,
			key: req.json.key,
			immortal: req.json.immortal,
			reserved: req.json.reserved,
		})
		const mailTicketStarted = mailTicket(req.json)
		const result = (await sg.send({
			from: `${fromName}<${fromMailer}>`,
			to: req.json.email,
			subject: mailTicketStarted.getSubject(),
			html: mailTicketStarted.getBody(data, req.user),
		}))[0]
		if(result.statusCode === 202) {
			next()
		} else {
			next(result)
		}
	} catch(err) {
		next(err)
	}
}
module.exports = mailSendPassword
