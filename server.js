var http = require('http');
var app = require('./config/express');
//require('./config/database')('mongodb://localhost/playBank');
require('./config/database')(process.env.MONGODB_URI);

console.log('starting server')
http.createServer(app)
.listen(process.env.PORT || 8080, function() {
	console.log('Server Started');
});
