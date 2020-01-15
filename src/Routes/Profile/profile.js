const express = require('express');
const Router = express();

const controller = require('../../Controllers/profile');

// Update Data User

Router.patch('/update', controller.updateProfile);

module.exports = Router;