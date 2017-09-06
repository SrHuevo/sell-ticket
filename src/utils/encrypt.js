const bcrypt = require('bcrypt')

const cryptPassword = password => new Promise((resolve, reject) => {
	bcrypt.genSalt(10, (err, salt) => {
		if(err) return reject(err)

		bcrypt.hash(password, salt, (err, hash) => {
			if(err) return reject(err)
			return resolve(hash)
		})
	})
})

const comparePassword = (plainPass, hashPass) => new Promise((resolve, reject) => {
	bcrypt.compare(plainPass, hashPass, (err, isPasswordMatch) => {
		if(err || !isPasswordMatch) return reject()

		resolve()
	})
})

module.exports = {
	cryptPassword,
	comparePassword,
}
