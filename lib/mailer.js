const{sendgridApiKey} = require('../src/config')
const sg = require('@sendgrid/mail')
sg.setApiKey(sendgridApiKey)

module.exports = sg
