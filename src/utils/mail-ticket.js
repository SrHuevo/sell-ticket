const mailTicket = ticket => {

	const getSubject = () => (ticket.reserved ?
			`${ticket.name}. Le confirmamos que su entrada para el Apocalipsis Zombie 2017 ha sido reservada`
			:
			`${ticket.name}. Aquí tiene su entrada para el Apocalipsis Zombie`)

	const getBody = (data, user) => (ticket.reserved ?
		`
			<h1>Acabamos de reservar su entrada.</h1>
			<p>Le rogamos que lea detenidamente la información del evento justo antes de que comience, por si acaso ha cambiado algún aspecto relacionado con el mismo.</p>
			<p>Puede hacerlo pinchando <a href="http://hermandadurjc.wixsite.com/paginaoficial/apocalipsiszombie">AQUI</a> </p>
			<br>
			<p>Sus datos son los siguientes:</p>
			<p>Dorsal: <strong>${ticket._id}</strong></p>
			<p>Nombre: ${ticket.name}</p>
			<p>Email: ${ticket.email}</p>
			<p>DNI: ${ticket.dni}</p>
			<p>Ha sido apuntado para ser <strong>${ticket.immortal ? 'zombie inmortal' : 'humano'}</strong></p>
			<br>
			<p>Al final del evento os daremos un recuerdo, del mismo, personalizado. Por lo que es importante que su nombre sea correcto.</p>
			<p>En caso de no serlo contacta con nosotros a través del correo por el que reservó la entrada.</p>
			<p><strong>Sí finalmente no viene recuerde avisarnos para anular la reserva.</strong></p>
			<br>
			<p>A continuación debería ver un código QR que identifica su entrada, asegurese de que puede ver imágenes.</p>
			<img src='https://api.qrserver.com/v1/create-qr-code/?data=${data}&amp;qzone=20'>
			<p>Muchas gracias</p>
			<p>PD: Le recomendamos que vaya con una camiseta que no aprecie mucho ya que el dorsal podría romperla.</p>
			`
	:

		`
			<h1>Muchas gracias por participar en el evento.</h1>
			<p>Le rogamos que lea detenidamente la información del evento justo antes de que comience, por si acaso ha cambiado algun aspecto relacionado con el mismo.</p>
			<p>Puede hacerlo pinchando <a href="http://hermandadurjc.wixsite.com/paginaoficial/apocalipsiszombie">AQUI</a> </p>
			<br>
			<p>Sus datos son los siguientes:</p>
			<p>Dorsal: <strong>${ticket._id}</strong></p>
			<p>Nombre: ${ticket.name}</p>
			<p>Email: ${ticket.email}</p>
			<p>DNI: ${ticket.dni}</p>
			<p>Ha sido apuntado para ser <strong>${ticket.immortal ? 'zombie inmortal' : 'humano'}</strong></p>
			<br>
			<p>Al final del evento os daremos un recuerdo, del mismo, personalizado. Por lo que es importante que su nombre sea correcto.</p>
			<p>En caso de no serlo contacta con la persona que le vendió la entrada a través del siguiente correo: ${user.email}</p>
			<br>
			<p>A continuación debería ver un código QR que identifica su entrada, asegurese de que puede ver imágenes.</p>
			<img src='https://api.qrserver.com/v1/create-qr-code/?data=${data}&amp;qzone=20'>
			<p>Muchas gracias</p>
			<p>PD: Le recomendamos que vaya con una camiseta que no aprecie mucho ya que el dorsal podría romperla.</p>
			`
	)

	return {getSubject, getBody}
}

module.exports = mailTicket
