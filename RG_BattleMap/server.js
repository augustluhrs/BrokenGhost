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
var regions = [];
var teams = [];
var teamLimit;

// - - - - Screen Socket
var screen = io.of('/screen');

screen.on('connection', function (socket) {
		console.log("Screen connected: " + socket.id);
    data = {
      r: regions,
      t: teams,
      l: teamLimit
    }
    screen.emit('update', data);

    // Listen for this client to disconnect
		socket.on('disconnect', function() {
			console.log("Screen has disconnected " + socket.id);
		});
	});

//- - - - -  Player Sockets (Team Formation)
var master = io.of('/puppetmaster');

master.on('connection',	function (socket){
		console.log('Welcome, Davis. Your id is: ' + socket.id);
    data = {
      r: regions,
      t: teams,
      l: teamLimit
    }
    master.emit('update', data);

    //when Davis sends update, store the new state of the map and send the update to the screen
    socket.on('update', function(data){
      regions = data.r;
      teams = data.t;
      teamLimit = data.l;
      console.log(data);
      screen.emit('update', data);
      //should store in separate log also, in case need for reset?
    });

    // Listen for this client to disconnect
		socket.on('disconnect', function() {
			console.log("Client has disconnected " + socket.id);
		});
	});
