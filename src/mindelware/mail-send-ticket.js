/* eslint-disable linebreak-style */
const{fromName, fromMailer} = require('../config')
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
			from: `${fromName}<${fromMailer}>`,
			to: req.json.email,
			subject: `${req.json.name}. Aquí tiene su entrada para el Apocalipsis Zombie`,
			html: `
			<h1>Muchas gracias por participar en el evento.</h1>
			<p>Le rogamos que lea detenidamente la información del evento justo antes del día del mismo por si acaso ha cambiado algun aspecto relacionado con el mismo.</p>
			<p>Puede hacerlo pinchando <a href="http://hermandadurjc.wixsite.com/paginaoficial/apocalipsiszombie">AQUI</a> </p>
			<br>
			<p>Sus datos son los siguientes:</p>
			<p>Dorsal: <strong>${req.json._id}</strong></p>
			<p>Nombre: ${req.json.name}</p>
			<p>Email: ${req.json.email}</p>
			<p>DNI: ${req.json.dni}</p>
			<p>Ha sido apuntado para ser <strong>${req.json.immortal ? 'zombie inmortal' : 'humano'}</strong></p>
			<br>
			<p>Al final del evento os daremos un recuerdo, del mismo, personalizado. Por lo que es importante que su nombre sea correcto.</p>
			<p>En caso de no serlo contacta con la persona que le vendió la entrada a través del siguiente correo: ${req.user.email}</p>
			<br>
			<p>A continuación debería ver un código QR que identifica su entrada, asegurese de que puede ver imágenes.</p>
			<img src='https://api.qrserver.com/v1/create-qr-code/?data=${data}&amp;qzone=20'>
			<p>Muchas gracias</p>
			<p>PD: Le recomendamos que vaya con una camiseta a la que no aprecie mucho ya que el dorsal podría romperla.</p>
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
