const express = require('express');
const controller = require('../Controllers/transaction');
const Router = express.Router();

Router.get('/detail/:id', controller.getTransaction);
Router.get('/buyer/', controller.getTransactionBuyer);
Router.patch('/sid/:id', controller.patchSID);
Router.post('/', controller.postStatus);
Router.patch('/status/:id', controller.patchStatus);

module.exports = Router;