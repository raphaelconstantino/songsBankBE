var http = require('http');
var app = require('./config/express');
require('./config/database')('mongodb://localhost/playBank');

http.createServer(app)
.listen(8080, function() {
	console.log('Server Started');
});
