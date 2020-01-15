const express = require('express');
const Router = express.Router();

const product = require('./product');

Router.use('/product', product);

module.exports = Router;
