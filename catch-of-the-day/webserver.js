
var express = require('express');
var app = express();

app.use(express.static('build'));

app.use('/store/*', express.static('build'));


var server = app.listen(3002, function () {
	'use strict';
	var host = server.address().address,
		port = server.address().port;

	console.log(' Server is listening at http://%s:%s', host, port);
});

