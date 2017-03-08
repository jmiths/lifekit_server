module.exports = function(app){
	var emergency = require('./emergency/emergency.js');
	app.get('/emergency/:type', emergency.emergency);

	var update = require('./update/update.js');
	app.get('/update/:type', update.update);

	var user = require('./user/user.js');
	app.get('/user/:type', user.user);
}
