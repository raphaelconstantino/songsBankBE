var http = require('http');
var app = require('./config/express');
require('./config/database')('mongodb://localhost/playBank');

http.createServer(app)
.listen(process.env.PORT || 8080, function() {
	console.log('Server Started');
});
