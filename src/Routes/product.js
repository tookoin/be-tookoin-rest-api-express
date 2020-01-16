const express = require('express');
const controller = require('../Controllers/product');
const Router = express.Router();

const checkCache = require('../Redis/index');

Router.get('/', controller.getAllProduct);
Router.post('/', controller.postProduct);
Router.patch('/:id', controller.patchProduct);
Router.delete('/:id', controller.deleteProduct);

module.exports = Router;