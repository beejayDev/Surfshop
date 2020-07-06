const express = require('express');
const router = express.Router();
const { postRegister } = require('../controllers/index');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});
                                                                                        /* Get the register form route */                                                       router.get('/register', (req, res, next) => {                                                   res.render('register')
											});                                                                                                                                                                             /* Handle the register logic */                                                         router.post('/register', postRegister);                                                                                                                                         /* Login route */
router.get('/login', (req, res, next) => {
        res.send('The login route')
});
                                                                                        /* Handle login logic */                                                                router.post('/login', (req, res, next) => {                                                     res.send('The post login route')                                                });                                                                                                                                                                             /* Get profile */                                                                       router.get('/profile', (req, res, next) => {                                                    res.send('The Profile page')                                                    });
/* Get user profile page */
router.get('/profile/:user_id', (req, res, next) => {
        res.send('The Profile/:user_id')                                                });                                                                                                                                                                             /* The forget password */                                                               router.get('/forgot', (req, res, next) => {                                                     res.send('The Forgot route')                                                    });

/* Handle the forget password */
router.put('/forgot', (req, res, next) => {
        res.send('The forgot put route')
});

/* The reset form */
router.get('/reset/:token', (req, res, next) => {
        res.send('The Reset token route')
});

/* Handle the reset form */
router.put('/reset/:token', (req, res, next) => {
        res.send('The Put reset token')
});

module.exports = router;
