#!/usr/bin/env node

var net = require('net');

var stream = net.connect('listener.sock');

// How to Write to Stream
//stream.write(whatever);

var eventname = process.argv[2];
var extraInfo;

process.stdin.on('readable', function() {
	var chunk = process.stdin.read();
	if (chunk !== null) {
		extraInfo += chunk;
	}
	extraInfo.replace('\\n','\n');
	var eventObj = {
		'event':eventname,
		'info':extraInfo
	};

	stream.write(JSON.stringify(eventObj));

	stream.end();
});