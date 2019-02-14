// Server for Rogues' Gallery Projected Map and Master Interface


// Create server
let port = process.env.PORT || 8000;
let express = require('express');
let app = express();
let server = require('http').createServer(app).listen(port, function () {
  console.log('Server listening at port: ', port);
});

// Tell server where to look for files
app.use(express.static('public'));

// Create socket connection
let io = require('socket.io').listen(server);

//- - - - arrays
var team1 = [];
var team2 = [];
/*
function Bubble(_dad, _name, _r, _g, _b){
	this.dad = socket.id;
	this.name = name;
	this.r = _r;
	this.g = _g;
	this.b = _b;
}
*/

// - - - - Screen Socket
var screen = io.of('/screen');

screen.on('connection', function (socket) {
		console.log("Screen connected: " + socket.id);

    // Listen for this client to disconnect
		socket.on('disconnect', function() {
			console.log("Screen has disconnected " + socket.id);
		});
	});

//- - - - -  Player Sockets (Team Formation)
var team1 = io.of('/players/team1');

team1.on('connection',	function (socket){
		console.log('We have a new player: ' + socket.id);

    socket.on('team1', function(bubbles){
      team1 = bubbles;
      console.log(team1);
      screen.emit('team1', team1);
      fight1.emit('team1', team1);
      fight2.emit('team1', team1);
      // socket.broadcast.emit('team1', team1);
      // console.log('sending to screen');
    });

    // Listen for this client to disconnect
		socket.on('disconnect', function() {
			console.log("Client has disconnected " + socket.id);
		});
	});

  var team2 = io.of('/players/team2');

  team2.on('connection',	function (socket){
  		console.log('We have a new player: ' + socket.id);

      socket.on('team2', function(bubbles){
        team2 = bubbles;
        screen.emit('team2', team2);
        fight1.emit('team1', team1);
        fight2.emit('team1', team1);
        console.log(team2);
      });

      // Listen for this client to disconnect
  		socket.on('disconnect', function() {
  			console.log("Client has disconnected " + socket.id);
  		});
  	});

//- - - - - -  Player Sockets (Fight Screen)

var fight1 = io.of('/players/fight1');

screen.on('connection', function (socket) {
		console.log("Screen connected: " + socket.id);

    // Listen for this client to disconnect
		socket.on('disconnect', function() {
			console.log("Screen has disconnected " + socket.id);
		});
	});

  var fight2 = io.of('/players/fight2');

  screen.on('connection', function (socket) {
  		console.log("Screen connected: " + socket.id);

      // Listen for this client to disconnect
  		socket.on('disconnect', function() {
  			console.log("Screen has disconnected " + socket.id);
  		});
  	});
