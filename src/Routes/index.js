const express = require('express');
const Router = express.Router();

const product = require('./product');

Router.use('/product', product);
const register = require('../Routes/Register/register');
const login = require('../Routes/Login/login');

Router.use('/register', register);
Router.use('/login', login);

module.exports = Router;
