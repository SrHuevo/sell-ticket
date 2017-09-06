const Controller = require('../../../lib/controller-db')
const ticketFacade = require('./facade')

class TicketController extends Controller {
}

module.exports = new TicketController(ticketFacade)
