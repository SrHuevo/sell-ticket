const{fromMailer} = require('../config')
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
		})
		const result = (await sg.send({
			from: fromMailer,
			to: req.json.email,
			subject: `${req.json.name}. Aquí tiene su entrada para el Apocalipsis Zombie`,
			html: `
			<h1>Muchas gracias por participar en el evento.</h1>
			<p>Le rogamos que lea detenidamente la información del evento justo antes del día del mismo por si acaso ha cambiado algun aspecto relacionado con el mismo.</p>
			<p>Puede hacerlo pinchando <a href="http://hermandadurjc.wixsite.com/paginaoficial/apocalipsiszombie">AQUI</a> </p>
			<br>
			<p>Al final del evento os daremos un recuerdo del mismo personalizado por lo que es importante que su nombre sea correcto.</p>
			<p>En caso de no serlo contacta con la persona que le vendió la entrada a través del siguiente correo:</p>
			<p>${req.user.email}</p>
			<p>A continuación debería ver un código QR que identifica su entrada, asegurese de que puede ver imágenes.</p>
			<img src='https://api.qrserver.com/v1/create-qr-code/?data=${data}&amp;qzone=20'>
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
