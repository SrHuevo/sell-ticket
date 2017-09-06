const jwt = require('jsonwebtoken')
const{jwtSecret, fromMailer} = require('../config')
const sg = require('../../lib/mailer')
const superPowers = require('../super-powers')

const mailSendPassword = async (req, res, next) => {
	const token = jwt.sign({
		email: req.json.email,
		profiles: [superPowers.CHANGE_MY_PASSWORD],
	}, jwtSecret, {expiresIn: '30m'})

	try {
		const result = (await sg.send({
			from: fromMailer,
			to: req.json.email,
			subject: 'Contraseña venta de tickets AZ',
			html: `
			<p> Cambie su contraseña siguiendo el siguiente link:</p>
			<a href="${req.body.url}?token=${token}">Modifique su contraseña</a>
			${token}
			`,
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
