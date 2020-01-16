const express = require('express');
const Router = express.Router();

const register = require('../Routes/Register/register');
const login = require('../Routes/Login/login');
const updateProfile = require('../Routes/Profile/profile');
const resetPassword = require('./Reset_Password/password')

Router.use('/register', register);
Router.use('/login', login);
Router.use('/profile', updateProfile);
Router.use('/password', resetPassword);

module.exports = Router;
