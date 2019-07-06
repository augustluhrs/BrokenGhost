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
// var dataFirst = false;
// let startMillis;
// let timerOn = false;

function logs() {
  console.log(regions);
  console.log(teams);
  // console.log(teamLimit);
}


// - - - - map Socket
var map = io.of('/map');

map.on('connection', function(socket) {
  console.log("map connected: " + socket.id);
  data = {
    r: regions,
    t: teams,
    l: teamLimit
  }
  map.emit('update', data);

  socket.on('refresh', function() {
    data = {
      r: regions,
      t: teams,
      l: teamLimit
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
  // if(dataFirst){ //only triggers if Cody has reconnected
  //   data = {
  //     r: regions,
  //     t: teams,
  //     l: teamLimit
  //   }
  //   cody.emit('update', data);
  // }

  // socket.on('timerStart', function(){
  //   console.log('timer started');
  //   startMillis = Date.now();
  //   timerOn = true;
  //
  //   // map.emit('timerStart');
  // });

  // socket.on('stop timer', function(){
  //   console.log('timer off');
  //   // startMillis = Date.now();
  //   timerOn = false;
  //
  //   // map.emit('stop timer');
  // });

  //when Cody sends update, store the new state of the map and send the update to the map
  socket.on('update', function(data) {
    regions = data.r;
    teams = data.t;
    teamLimit = data.l;
    // console.log(data);
    // if (timerOn){
    //   let timeElapsed = Date.now() - startMillis;
    //   let dataPlus = {
    //     r: regions,
    //     t: teams,
    //     l: teamLimit
    //     // m: timeElapsed
    //   }
    //   map.emit('update', dataPlus);
    // }
    // else{
    map.emit('update', data);
    // }

    //should store in separate log also, in case need for reset...
  });

  //log output so not constant, every 30 secs
  setInterval(function() {
    logs();
  }, 30000);

  /* //old map events
    socket.on('battle', function() {
      console.log('Battle between:');
      map.emit('battle');
    });

    socket.on('battle over', function() {
      console.log('Battle Over');
      map.emit('battle over');
    });

    socket.on('kaiju', function() {
      console.log('Kaiju Active');
      map.emit('kaiju');
    });

    socket.on('kaiju off', function() {
      console.log('Kaiju OFF');
      map.emit('kaiju off');
    });

    socket.on('moles', function() {
      console.log('Moles Active');
      map.emit('moles');
    });

    socket.on('moles off', function() {
      console.log('Moles OFF');
      map.emit('moles off');
    });

    socket.on('doomsday', function() {
      console.log('Doomsday Device Active');
      map.emit('doomsday');
    });
    socket.on('fire laser', function() {
      console.log('firing laser');
      map.emit('fire laser');
    });
    */
    
    socket.on('superbious', function() {
      console.log('Superbious Active');
      map.emit('superbious');
    });

  // Listen for this client to disconnect
  socket.on('disconnect', function() {
    console.log("Client has disconnected " + socket.id);
    // dataFirst = false;
    // if (!dataFirst){
    //   dataFirst = true;
    // }
  });
});
