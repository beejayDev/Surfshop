const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");

// Load User model
const User = require('../models/user');

module.exports = (passport) => {
	passport.use( new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
		// Match user
		User.findOne({
			email: email
		}).then(user => {
			if (!user) {
				return done(null, false, { message: 'That email is not registered' });
			}
			// Match password
			bcrypt.compare(password, user.password, (err, isMatch) => {
				if (err) throw err;
				if (isMatch) {
					return done(null, user, { message: `Welcome back ${user.username}` })
				} else {
					console.log('Incorrect password')
					return done(null, false, { message: 'Password incorrect' });
				}
			});
		});
	}));
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});
};
