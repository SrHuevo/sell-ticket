const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const bluebird = require('bluebird')
const config = require('./config')
mongoose.Promise = bluebird
const connection = mongoose.connection.openUri(config.mongo.url)
autoIncrement.initialize(connection)

const express = require('express')

const helmet = require('helmet')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const routes = require('./routes')

const app = express()


app.use(helmet())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors({origin: 'http://localhost:4200'}))

app.use('/', routes)

app.use((req, res, next) => {
	const err = new Error('Not Found')
	err.status = 404
	next(err)
})

app.use((err, req, res, next) => {
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	res.send(err.status || 500, err.message || err)
})

app.listen(config.server.port, () => {
	console.log(`Magic happens on port ${config.server.port}`)
})

module.exports = app
