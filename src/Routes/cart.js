const express = require('express');
const controller = require('../Controllers/cart');
const Router = express.Router();

Router.get('/', controller.getCart);
Router.post('/', controller.postCart);
Router.patch('/:cartId', controller.patchCart);
Router.delete('/:cartId', controller.deleteCart);
Router.post('/checkout/:cartId', controller.checkoutCart);
Router.post('/checkout/store/:sellerId', controller.checkoutCartStore);

module.exports = Router;