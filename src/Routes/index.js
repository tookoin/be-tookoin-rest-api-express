const express = require('express');
const Router = express.Router();

const product = require('./product');
const cart = require('./cart');
const transaction = require('./transaction');

Router.use('/product', product);
Router.use('/cart', cart);
Router.use('/transaction', transaction)

module.exports = Router;
