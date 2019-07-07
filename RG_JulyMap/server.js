// Server for Rogues' Gallery Projected Map and Cody Interface

// Create server
let port = process.env.PORT || 8000;
let express = require('express');
let app = express();
let server = require('http').createServer(app).listen(port, function() {
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
var events = {};
var npcs = {};

function logs() {
  console.log(regions);
  console.log(teams);
}


// - - - - map Socket
var map = io.of('/map');

map.on('connection', function(socket) {
  console.log("map connected: " + socket.id);
  data = {
    r: regions,
    t: teams,
    l: teamLimit,
    e: events,
    n: npcs
  }
  map.emit('update', data);

  socket.on('refresh', function() {
    data = {
      r: regions,
      t: teams,
      l: teamLimit,
      e: events,
      n: npcs
    }
    map.emit('update', data);
  });
  // Listen for this client to disconnect
  socket.on('disconnect', function() {
    console.log("map has disconnected " + socket.id);
  });
});

//- - - - -  Cody's Interface (Teams and Map Events)
var cody = io.of('/cody');

cody.on('connection', function(socket) {
  console.log('Welcome, Cody. Your id is: ' + socket.id);

  //when Cody sends update, store the new state of the map and send the update to the map
  socket.on('update', function(data) {
    regions = data.r;
    teams = data.t;
    teamLimit = data.l;
    events = data.e;
    npcs = data.n;

    map.emit('update', data);

    //should store in separate log also, in case need for reset...
  });

  //log output so not constant, every 30 secs
  setInterval(function() {
    logs();
  }, 30000);

  // Listen for this client to disconnect
  socket.on('disconnect', function() {
    console.log("Client has disconnected " + socket.id);
  });
});
