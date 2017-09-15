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
			<p>${req.get('origin')}/user/${req.json.email}/pass?token=${token}</p>
			<a href="${req.get('origin')}/user/${req.json.email}/pass?token=${token}">Modifique su contraseña</a>
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
