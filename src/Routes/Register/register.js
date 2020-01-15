const express = require('express');
const Router = express.Router();

const controller = require("../../Controllers/register");

// Register a user

Router.post('/:role', controller.registUser);

module.exports = Router;
