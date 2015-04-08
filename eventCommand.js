#!/usr/bin/env node

var net = require('net');

// How to Write to Stream
//stream.write(whatever);
fs.exists('listener.sock', function(exists) {
	if (exists) {
		var stream = net.connect('listener.sock',function(err){
			if(err){
				console.log('No Socket');
			}
			var eventname = process.argv[2];
			var extraInfo;

			process.stdin.on('readable', function() {
				var chunk = process.stdin.read();
				if (chunk !== null) {
					extraInfo += chunk;
				}
				var eventObj = {
					'event':eventname,
					'info':extraInfo
				};

				stream.write(JSON.stringify(eventObj));

				stream.end();
			});
		});
	}
});

