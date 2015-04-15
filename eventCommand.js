#!/usr/bin/env node

var net = require('net');
var fs = require('fs');

// How to Write to Stream
//stream.write(whatever);

var eventname = process.argv[2];
var extraInfo;
var eventObj;

process.stdin.on('readable', function() {
	var chunk = process.stdin.read();
	if (chunk !== null) {
		extraInfo += chunk;
	}
	eventObj = {
		'event':eventname,
		'info':extraInfo
	};
	writeToSocket(eventObj);
});

function writeToSocket(data){
	fs.exists('listener.sock', function(exists) {
		if (exists) {
			var stream = net.connect('listener.sock',function(err){
				if(err){
					console.log('No Socket');
				}	
				stream.write(JSON.stringify(data),'',function(){
					stream.end();
				});
			});
		}
	});	
}