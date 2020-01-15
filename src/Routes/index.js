const express = require('express');
const Router = express.Router();

<<<<<<< HEAD
const product = require('./product');

Router.use('/product', product);
=======
const register = require('../Routes/Register/register');
const login = require('../Routes/Login/login');

Router.use('/register', register);
Router.use('/login', login);
>>>>>>> 94a913bd7d4731a2da05453d16f8925d7a65e97c

module.exports = Router;
