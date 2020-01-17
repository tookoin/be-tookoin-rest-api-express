const express = require('express');
const controller = require('../Controllers/product');
const Router = express.Router();

Router.get('/', controller.getAllProduct);
Router.post('/', controller.postProduct);
Router.patch('/:id', controller.patchProduct);
Router.delete('/:id', controller.deleteProduct);


module.exports = Router;