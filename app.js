const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const logger = require('morgan');
const passport = require('passport');
const passportLocal = require('passport-local');
const sessions = require('express-session');
const mongoose = require('mongoose')

//requires the model with Passport-Local Mongoose plugged in
const User = require('./models/user');
const Post = require('./models/post')
const Reviews = require('./models/review');


//requiring routes
const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');
const reviewsRouter = require('./routes/reviews');

const app = express();
mongoose.set('useCreateIndex', true);                                                   mongoose.set('useFindAndModify', false);                                                const connectionString = "mongodb+srv://Makanaki:ibrahim_12345@beejaycodes-iwhuw.mongodb.net/surfShop?retryWrites=true&w=majority"
mongoose.connect(connectionString, {                                                            useNewUrlParser: true,                                                                  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('we\'re connected!');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(sessions({
	name: "sessions",
        secret: "Allah is God",
        resave: false,                                                                         	saveUninitialized: false,
        cookie: {
                path: "/",
                //key: '_csrf',
		//maxAge: null,
                httpOnly: true,                                                                         signed: false,
                secure: false,                                                                          sameSite: true
        }
}));
// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./config/passport')(passport)

//Mount routes
app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/posts/:id/reviews', reviewsRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
