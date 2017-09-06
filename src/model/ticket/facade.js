const Facade = require('../../../lib/facade')
const ticketSchema = require('./schema')

class TicketFacade extends Facade {
}

module.exports = new TicketFacade(ticketSchema)
