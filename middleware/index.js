const User = require('../models/user')

module.exports = {
	errorHandler: (fn) =>
		(req, res, next) => {
			Promise.resolve(fn(req, res, next))
				.catch(next)
		}
}




