const express = require('express');
const Router = express.Router();

const product = require('./product');
const cart = require('./cart');

const register = require('../Routes/Register/register');
const login = require('../Routes/Login/login');

Router.use('/product', product);
Router.use('/register', register);
Router.use('/login', login);
Router.use('/cart', cart);

module.exports = Router;
