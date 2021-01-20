const User = require('../models/user')
const bcrypt = require('bcryptjs')
const passport = require('passport')

module.exports = {
	getRegister(req, res, next) {
                res.render('register')
        },
	postRegister(req, res, next) {
		const { email, username, password } = req.body;
		let errors = [];
		//Check required Field
		if(!email || !username || !password) {
			errors.push({ msg: "Please fill all fields" });
		}
		if(password.length < 6) {
			errors.push({ msg: "Password should be at least 6 characters" });
		}
		if(errors.length > 0)  {
			res.render('register', {
				errors,
				email,
				username
			});
		} else {
			//validation passed
			User.findOne({ email: email })
				.then((user) => {
					if(user) {
						errors.push({ msg: "Email exists" })
						res.render('register', {
							errors,
							email,                                                     username
						});
					} else { 
						const newUser = new User({
							email,
							username,
							password
						});
						bcrypt.genSalt(10, (err, salt) => 
							bcrypt.hash(newUser.password, salt, (err, hash) => {
							if(err)  throw err;

							//Set password to hashed
							newUser.password = hash;
							//save user
							newUser.save()
								.then(user => {
									console.log(user)
									console.log(req)
									req.flash('success', 'You are now registered');
									res.redirect("login")
								})
								.catch(err => {
									if(err.code == 11000) {
										errors.push({ msg: "Username exists" })
										res.render('register', { errors, username});
									} else {
										next(err)
									}
								});

						}));
					}
				});
		}


	},
	getLogin(req, res, next) {
                res.render("login")
        },
	postLogin(req, res, next) {
		passport.authenticate('local', {
			successFlash: true,
			successRedirect: '/',
        		failureRedirect: '/login',
			failureFlash: true
		})(req, res, next)
	},
	getLogout(req, res, next) {
		req.logout();
		req.flash('success', 'You logged out')
		res.redirect('login')
	},
	getProfile(req, res, next) {
		res.send('the profile page')
	},
	userProfile(req, res, next) {
		res.send('The Profile/:user_id')
	},
	forgetPasswordForm(req, res, next) {
		res.send('The Forgot route')
        },
	forgetPassword(req, res, next) {
		res.send('The Forgot password logic')
	},
	resetPasswordForm(req, res, next) {
		res.send('The Reset token route')
        },
	resetPassword(req, res, next) {
                res.send('The reset logic')
	}
}


