const express = require('express');
const Router = express.Router();

const product = require('./product');
const cart = require('./cart');

Router.use('/product', product);
Router.use('/cart', cart);

module.exports = Router;
