// Battle Map Screen to be Projected or Displayed on Players' Phones
// by August Luhrs Feb. 2019
// assets from Arnab Chakravarty


// Open and connect socket
let socket = io('/screen');

var regions = [];
var teams = [];
var teamLimit;
// let italy;

function setup(){
  //- - - - - overall
	// var screenSize = windowHeight - 100;
	// createCanvas(int(screenSize * .666), screenSize);
	createCanvas(windowWidth, windowHeight);
	background(150, 50, 50);
	textAlign(CENTER);
	textSize(width/32);


  // Listen for confirmation of connection
  socket.on('connect', function() {
    console.log("Connected");
  });

	// - - - - - heartbeat
	socket.on('update',
		function(data){
			regions = data.r;
			teams = data.t;
			teamLimit = int(data.l);
			console.log(data);
			console.log(teams);
			for (var i = 0; i < teamLimit; i++){
				text(teams[i].n, (i + 1) * windowWidth/(teamLimit + 1) , windowHeight - 50)
				console.log(i);
				console.log(i+1);
				console.log(teamLimit);
				console.log(windowWidth);
				console.log(windowWidth/(teamLimit - 1));
				console.log((i + 1) * (windowWidth/(teamLimit + 1)));
			}
		});
}

function draw(){

}
