var child_process = require('child_process');
var fs = require('fs');
var net = require('net');
var server;

var pianobarLocation = '/usr/local/bin/pianobar';
var fifoLocation = process.env.HOME +'/.config/pianobar/ctl';
var currentStatus;

exports.start = function(customLoc){
	if(customLoc){
		pianobarLocation = customLoc;
	}
	child_process.execFile(pianobarLocation,function(err, out, code){
			if (err instanceof Error){
				throw err;
			}
		}
	);
	// Event Handling
	server = net.createServer(function(stream){
		stream.on('data',function(input){
			// Handle the new stuff
			currentStatus = parseStatus(input);
		});
		// stream.on('end',function(){
		// 	server.close();
		// });
	});
	server.listen('listener.sock');
};

exports.playpause = function(){
	writetoFiFo('p');
};
exports.next = function(){
	writetoFiFo('n');
};
exports.quit = function(){
	writetoFiFo('q');
	server.close();
};
exports.love = function(){
	writetoFiFo('+');	
};
exports.ban = function(){
	writetoFiFo('-');	
};
exports.bookmark = function(){
	writetoFiFo('b');
};
exports.songTired = function(){
	writetoFiFo('t');
};
exports.deleteStation = function(){
	writetoFiFo('d');
};
exports.volumeUp = function(){
	writetoFiFo(')');
};
exports.volumeDown = function(){
	writetoFiFo('(');
};


exports.getStatus = function(){
	if(currentStatus !== ''){
		return currentStatus;
	}
	else{
		console.log('Status has not been defined yet');
	}
};

function writetoFiFo(command){
	// This will echo the command into the fifo
	// Pianobar is controled via a fifo, so this command is used for all controls
	var commandBuffer = new Buffer(command);

	fs.open(fifoLocation, 'w', 0644, function(error, fd) {
		if (error) {
			if (fd) {
				fs.close(fd);
			}
		console.log('Error opening fifo: ' + error);
		return;
		}

		fs.write(fd, commandBuffer, 0, command.length, null, function(error, written, buffer) {
			if (fd) {
				fs.close(fd);
			}
			if (error) {
				console.log('Error writing to fifo: ' + error);
			}
		});
	});
}

function parseStatus(input){
	input = JSON.parse(input);
	var status = {};
	status.event = input.event;
	// status.raw = input.info;

	rawStrings = input.info.split('\n');

	status.artist = rawStrings[0].slice(16);
	status.title = rawStrings[1].slice(6);
	status.album = rawStrings[2].slice(6);
	status.coverArt = rawStrings[3].slice(9);
	status.stationName = rawStrings[4].slice(12);
	//...
	status.songDuration = Number(rawStrings[10].slice(13));
	//...
	status.detailURL = rawStrings[13].slice(10);
	status.stationCount = Number(rawStrings[14].slice(13));

	status.stations = {};
	for(i=0;i<status.stationCount;i++){
		pre = "station"+i+"=";
		len = pre.length;
		status.stations[""+i+""] = rawStrings[15+i].slice(len);
	}

	return status;
}