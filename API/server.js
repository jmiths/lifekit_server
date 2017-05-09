'use strict';

process.env.TZ = 'America/New_York';
var env = process.env.NODE_ENV || 'development'
// var env = process.argv[2] || process.env.NODE_ENV || 'development'

var morgan = require('morgan');
var bodyParser = require('body-parser');

var express = require('express');
var app = express();

var server = null;
var port = null;
var http = require('http');
var httpServer = http.createServer(app);
server = httpServer;
if(env == "production") {
    port = 8080;
}
else if(env == "test") {
    port = 8888;
}
else { // development
    port = 8080;
}

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Method', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-requested-with,content-type');
    next();
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

server.listen(port);

require('./modules/routes.js')(app);
console.log("running API server on port " + port);

module.exports = server;

