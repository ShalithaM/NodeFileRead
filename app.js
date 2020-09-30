var express = require('express')
var app = express()
var mongoose = require('mongoose');

/*
 * Import config file
 */
var config = require('./constant/config');

/*
 * Import all routes files
 */
var fileRead = require('./routes/fileRead');

/*
 * Register all routes  
 */
app.use('/', fileRead);

/*
 * connect with mongoDB
 */
mongoose.connect(config.dbe);

app.listen(config.port, function () {

    console.log("Server is run on " + config.port);
})