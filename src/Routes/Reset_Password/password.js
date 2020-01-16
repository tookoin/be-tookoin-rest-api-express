const express = require('express');
const Router = express();

const controller = require('../../Controllers/password')
Router.post('/forgot', controller.forgotPassword );
Router.post('/reset/:token', controller.resetPassword);

module.exports = Router;
