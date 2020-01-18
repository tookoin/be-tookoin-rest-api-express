const express = require('express');
const Router = express();

const controller = require('../../Controllers/password')
Router.post('/forget', controller.forgotPassword );
Router.post('/reset', controller.resetPassword);
Router.post('/otp', controller.phonePassword);

module.exports = Router;
