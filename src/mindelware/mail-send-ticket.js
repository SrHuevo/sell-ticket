const qr = require('qr-image')
const{fromMailer} = require('../config')
const sg = require('../../lib/mailer')

const mailSendPassword = async (req, res, next) => {
	try {
		const svgString = qr.imageSync('I love QR!', { type: 'svg' })
		const result = (await sg.send({
			from: fromMailer,
			to: req.json.email,
			subject: 'Aquí tiene su entrada para el Apocalipsis Zombie',
			html: `${svgString}`,
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
