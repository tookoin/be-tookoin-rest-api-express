const express = require('express');
const Router = express();

const controller = require('../../Controllers/password')
Router.post('/forgot', controller.forgotPassword );
Router.post('/reset/:token', controller.resetPassword);

module.exports = Router;

// const passport = require('passport'); //in app.js

// const bcrypt = require('bcryptjs') //in passport.js
// const db = require('../../Config/db');

// // app.use(function(req, res, next){
// //     res.locals.currentUser = req.user;
// //     res.locals.success = req.flash('success');
// //     res.locals.error = req.flash('error');
// //     next();
// // })
