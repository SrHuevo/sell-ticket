const config = {
	environment: process.env.NODE_ENV || 'dev',
	server: {
		port: process.env.PORT || 8080,
	},
	mongo: {
		url: process.env.MONGO_DB_URI || 'mongodb://localhost/sell-ticket',
	},
	jwtSecret: process.env.JWT_SECRET || 'superSecrect',
	sendgridApiKey: process.env.SENDGRID_API_KEY,
	fromMailer: process.env.FROM_MAILER,
}

module.exports = config
