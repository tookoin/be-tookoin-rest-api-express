require('dotenv/config');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const bodyParser = require('body-parser');

// init router & port
const router = require('./src/Routes/index')
const index = express();
const PORT = process.env.PORT || 8000;

// const redis = require("redis");
// const port_redis = process.env.PORT_REDIS || 6379;
// const port_redis = 6379;
// const redis_client = redis.createClient(port_redis);

// var redis = require("redis"),
//     client = redis.createClient(port_redis);

// client.on("error", function (err) {
//     console.log("Error " + err);
// });

// Setting Middleware
index.use(logger('dev'));
index.use(helmet.xssFilter()); //cross server scripting
index.use(cors()); //manage cors, menentukan situs mana yang boleh akses, situs yang mana yang di blacklist
index.use(bodyParser.json());
index.use(bodyParser.urlencoded({ extended: false }));

// Setting root endpoint
index.use('/', router); // localhost:8000/

// Server running on:
index.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})

module.exports = index;
