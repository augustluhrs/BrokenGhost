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
var dataFirst = false;
let startMillis;
let timerOn = false;

function logs(){
  console.log(regions);
  console.log(teams);
  console.log(teamLimit);
}


// - - - - Screen Socket
var screen = io.of('/screen');

screen.on('connection', function (socket) {
		console.log("Screen connected: " + socket.id);
    // setInterval(function(){
      data = {
        r: regions,
        t: teams,
        l: teamLimit
      }
    //   screen.emit('update', data);
    // }, 33);
    screen.emit('update', data);


    socket.on('refresh', function(){
      data = {
        r: regions,
        t: teams,
        l: teamLimit
      }
      screen.emit('update', data);
    });
    // Listen for this client to disconnect
		socket.on('disconnect', function() {
			console.log("Screen has disconnected " + socket.id);
		});
	});

//- - - - -  Player Sockets (Team Formation)
var master = io.of('/puppetmaster');

master.on('connection',	function (socket){
		console.log('Welcome, Cody. Your id is: ' + socket.id);
    // if(dataFirst){ //only triggers if Cody has reconnected
    //   data = {
    //     r: regions,
    //     t: teams,
    //     l: teamLimit
    //   }
    //   master.emit('update', data);
    // }

    socket.on('timerStart', function(){
      console.log('timer started');
      startMillis = Date.now();
      timerOn = true;

      screen.emit('timerStart');
    });

    //when Cody sends update, store the new state of the map and send the update to the screen
    socket.on('update', function(data){
      regions = data.r;
      teams = data.t;
      teamLimit = data.l;
      // console.log(data);
      if (timerOn){
        let timeElapsed = Date.now() - startMillis;
        let dataPlus = {
          r: regions,
          t: teams,
          l: teamLimit,
          m: timeElapsed
        }
        screen.emit('update', dataPlus);
      }
      else{
        screen.emit('update', data);
      }
      //should store in separate log also, in case need for reset?
    });
    //log output so not constant
    setInterval(function(){
      logs();
    }, 30000);

    socket.on('battle', function(){
      console.log('Battle between:');
      screen.emit('battle');
    });

    socket.on('battle over', function(){
      console.log('Battle Over');
      screen.emit('battle over');
    });

    socket.on('kaiju', function(){
      console.log('Kaiju Active');
      screen.emit('kaiju');
    });
    socket.on('moles', function(){
      console.log('Moles Active');
      screen.emit('moles');
    });
    socket.on('doomsday', function(){
      console.log('Doomsday Device Active');
      screen.emit('doomsday');
    });
    socket.on('fire laser', function(){
      console.log('firing laser');
      screen.emit('fire laser');
    });
    socket.on('superbious', function(){
      console.log('Superbious Active');
      screen.emit('superbious');
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
