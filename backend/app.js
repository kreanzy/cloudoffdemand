var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var cors = require('cors')

//
//var indexRouter = require('./routes/index');

//
var homeRouter = require('./routes/home');
var reset_passwordRouter = require('./routes/reset_password');
var forget_passwordRouter = require('./routes/forget_password');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var verificationRouter = require('./routes/verification');
var create_questionRouter = require('./routes/create_question');
var questionRouter = require('./routes/question');
var question_moreRouter = require('./routes/question_more');
var following_questionRouter = require('./routes/following_question');
var courseRouter = require('./routes/course');
var create_courseRouter = require('./routes/create_course');
var add_videoRouter = require('./routes/add_video');
var edit_courseRouter = require('./routes/edit_course');
var student_courseRouter = require('./routes/student_course');
var tutor_courseRouter = require('./routes/tutor_course');
var search_courseRouter = require('./routes/search_course');
var paymentRouter = require('./routes/payment');
var notificationRouter = require('./routes/notification');
var profileRouter = require('./routes/profile');
var app = express();
app.use(cors());
var fs = require('fs');
var path = require('path');
require('dotenv/config');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//
//app.use('/', indexRouter);
//
app.use('/home', homeRouter);
app.use('/register', registerRouter);
app.use('/forget_password', forget_passwordRouter);
app.use('/reset_password', reset_passwordRouter);
app.use('/login', loginRouter);
app.use('/verification', verificationRouter);
app.use('/create_question',create_questionRouter);
app.use('/question',questionRouter);
app.use('/question_more',question_moreRouter);
app.use('/following_question',following_questionRouter);
app.use('/course',courseRouter);
app.use('/create_course',create_courseRouter);
app.use('/add_video',add_videoRouter);
app.use('/edit_course',edit_courseRouter);
app.use('/student_course',student_courseRouter);
app.use('/tutor_course',tutor_courseRouter);
app.use('/search_course',search_courseRouter);
app.use('/payment', paymentRouter);
app.use('/notification', notificationRouter);
app.use('/profile', profileRouter);
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Methods','POST, GET, PUT, PATCH, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers','Content-Type, Option, Authorization')
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
