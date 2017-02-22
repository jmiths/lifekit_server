'use strict';

var morgan = require('morgan');
var express = require('express');
var app = express();

app.listen(80);

app.use(morgan('dev'));

require('./modules/routes.js')(app);

/*app.get('/test',function(req,res) {
	modules.mail();	
	res.send("Hello");
});*/
