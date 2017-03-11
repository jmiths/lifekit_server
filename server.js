'use strict';

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

httpsServer.listen(443);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./modules/routes.js')(app);
