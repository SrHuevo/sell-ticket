const Controller = require('../../../lib/controller-db')
const ticketFacade = require('./facade')

class TicketController extends Controller {

	create(req, res, next) {
		req.body.seller = req.user.email
		req.body.updater = req.user.email
		super.create(req, res, next)
	}

  async checkUsed(req, res, next) {
    try {
      req.json = await this.facade.findById(req.params.id)
      if(req.json.used)
        next({status: 409, message: 'the ticket has been used'})
      else {
        next()
      }
    } catch(err) {
      next(err)
    }
  }

	used(req, res, next) {
    req.body.updater = req.user.email
    req.body.used = true
    super.update(req, res, next)
  }
}

module.exports = new TicketController(ticketFacade)
