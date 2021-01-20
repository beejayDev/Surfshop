const express = require('express');
const router = express.Router();
const passport = require('passport')
const {
	getRegister,
	getLogin,
	postRegister, 
	postLogin, 
	getLogout, 
	getProfile,
	userProfile,
	forgetPasswordForm,
	forgetPassword,
	resetPasswordForm,
	resetPassword,
} = require('../controllers/index');
const { errorHandler } = require('../middleware');

/* GET home page. */
router.get('/', (req, res, next) => {
	res.render('index', { title: 'Express', user: req.user });
});

/* Get the register form route */
router.get('/register', errorHandler(getRegister));

/* Handle the register logic */
router.post('/register', errorHandler(postRegister));

/* Get the register form route */
router.get('/login', errorHandler(getLogin));

/* Handle login logic form*/
router.post('/login', errorHandler(postLogin));

/* Logout route */ 
router.get('/logout',errorHandler(getLogout));

/* Get profile */
router.get('/profile', errorHandler(getProfile));

/* Get user profile page */
router.put('/profile/:user_id', errorHandler(userProfile));

/* The forget password form */
router.get('/forgot', errorHandler(forgetPasswordForm));

/* Handle the forget password*/
router.put('/forgot', errorHandler(forgetPassword));

/* The reset form */
router.get('/reset/:token', errorHandler(resetPasswordForm));

/* Handle the reset form */
router.put('/reset/:token', errorHandler(resetPassword));

module.exports = router;
