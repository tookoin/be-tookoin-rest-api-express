const express = require('express');
const Router = express.Router();

const controller = require('../../Controllers/login');

// Register a user

Router.post('/', controller.loginUser);

module.exports = Router 