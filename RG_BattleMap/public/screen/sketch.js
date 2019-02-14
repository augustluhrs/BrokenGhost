// Battle Map Screen to be Projected or Displayed on Players' Phones
// by August Luhrs Feb. 2019


// Open and connect socket
let socket = io('/screen');

var regions = [];
let italy;

function setup(){
  //- - - - - overall
	// var screenSize = windowHeight - 100;
	// createCanvas(int(screenSize * .666), screenSize);
	createCanvas(windowWidth, windowHeight);
	background(150, 50, 50);



  // Listen for confirmation of connection
  socket.on('connect', function() {
    console.log("Connected");
  });

	// - - - - - heartbeat
	socket.on('heartbeat',
		function(data){
		}
	);
}

function draw(){

}
