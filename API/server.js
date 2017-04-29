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
if(env == "production") {
    var fs = require('fs');
    var certificate = fs.readFileSync('/root/lifekit.cci.drexel.edu.crt','utf8');
    var privateKey = fs.readFileSync('/root/lifekit.cci.drexel.edu.key','utf8');
    var credentials = {key: privateKey, cert: certificate};
    var https = require('https');
    var httpsServer = https.createServer(credentials,app);
    server = httpsServer;
    port = 443;
}
else {
    var http = require('http');
    var httpServer = http.createServer(app);
    server = httpServer;
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

