'use strict';

process.env.TZ = 'America/New_York';

var morgan = require('morgan');
var bodyParser = require('body-parser');

var express = require('express');
var app = express();

var fs = require('fs');
var certificate = fs.readFileSync('/root/lifekit.cci.drexel.edu.crt','utf8');
var privateKey = fs.readFileSync('/root/lifekit.cci.drexel.edu.key','utf8');

var credentials = {key: privateKey, cert: certificate};
var https = require('https');
var httpsServer = https.createServer(credentials,app);

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Method', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-requested-with,content-type');
    next();
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

httpsServer.listen(443);

require('./modules/routes.js')(app);
