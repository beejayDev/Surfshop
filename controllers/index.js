const User = require('../models/user')
const bcrypt = require('bcryptjs')
const passport = require('passport')

module.exports = {
	postRegister(req, res, next) {
		let user = req.body;
		let errors = [];

		//Check errors
		if(user.password === '') {
			errors.push({ msg: "Please enter a password"})
		}
		if(!user.username || !user.email) {
			errors.push({ msg: "Please fill out all field"})
		}
		if(errors.length > 0) {
			res.render("register", {
				errors,
				email: req.body.email,
				username: req.body.username,
				password: req.body.password
			})
		} else {
			const newUser = new User(req.body)
			let salt = bcrypt.genSaltSync(10);
                	let hash = bcrypt.hashSync(newUser.password, salt);
			newUser.password = hash;
			newUser.save( (user) => {
				if(user) {
					errors.push({ msg: "Username/email is already registered!! Try again" })
					res.render("register", {
						errors,
						email: req.body.email,
						username: req.body.username,
						password: req.body.password
					})
				} else {
					res.redirect('/')
				}
			})
		}
	},
	postLogin(req, res, next) {
		passport.authenticate('local', {
			successRedirect: '/',
        		failureRedirect: '/login'
		})(req, res, next)
	},
	getLogout(req, res, next) {
		req.logout();
		res.redirect('/')
	},
	getProfile(req, res, next) {
		res.send('the profile page')
	}
}
