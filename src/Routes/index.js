const express = require('express');
const Router = express.Router();

const product = require('./product');
const cart = require('./cart');
const transaction = require('./transaction');

const register = require('../Routes/Register/register');
const login = require('../Routes/Login/login');
const updateProfile = require('../Routes/Profile/profile');
const resetPassword = require('./Reset_Password/password')


const welcomePage = require ('./welcomePage');

Router.use('/product', product);
Router.use('/register', register);
Router.use('/login', login);
Router.use('/cart', cart);
Router.use('/transaction', transaction)
Router.use('/profile', updateProfile);
Router.use('/password', resetPassword);
Router.use('/', welcomePage);

module.exports = Router;
