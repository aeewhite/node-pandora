#Node-Pandora
This node module is a wrapper for interacting with the system installed pianobar client. 

##Installation
```bash
npm install --save aeewhite/node-pandora
```

##Usage
```js
var pandora = require('node-pandora');
```
###Start
```js
pandora.start([commandlocation]);
```
Starts the installed pianobar client. Will default to `/usr/local/bin/pianobar`. 

###Play/Pause
```js
pandora.playpause();
```
Toggles between playing and paused

###Next
```js
pandora.next();
```
Skips to the next song

###Quit
```js
pandora.quit();
```
Stops the pianobar process

###Bookmark
```js
pandora.bookmark();
```
Bookmark the current song

###Love
```js
pandora.love();
```
Love the currently playing song

###Ban
```js
pandora.ban();
```
Ban the currently playing song, can only be removed using the Pandora web interface

###Song Tired
```js
pandora.songTired();
```
Ban the current song for one month

###Lower Volume
```js
pandora.volumeDown();
```
Lower pianobar volume

###Raise Volume
```js
pandora.volumeDown();
```
Raise pianobar volume

###Station Delete
```js
pandora.deleteStation();
```
Delete the currently playing station

###Get Pianobar Status
```js
pandora.getStatus();
```
Returns an object of the most recent pianobar event with the following structure

```JSON
{
	event: '',
	artist: '',
	title: '',
	album: '',
	coverArt: '',
	stationName: '',
	songDuration: 0,
	detailURL: '',
	stationCount: 0,
	stations: {
		'index':'stationName'
	}
}
```
`event` is the name of the most recent pianobar event
`artist	` is the artist of the current song
`title` is the title of the current song
`album` is the album the current song is on
`coverArt` is a url to the cover art on Pandora's servers
`stationName` is the name of the currently playing station
`songDuration` is the length of the current song in seconds
`detailURL` is a url to details page for the song on the Pandora web site
`stationCount` is the total number of user stations
`stations` is an object with keys for each of the users stations. The key is the station number (index) and the value is the name of the station.

The values for artist, title, album, and station names are escaped


##Note

Remember to quit the pianobar process before exitting with `pandora.quit();`



 