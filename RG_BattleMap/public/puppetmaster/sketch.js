// Master Interface for Davis the Intern
// Controls the Screen Display Elements
// by August Luhrs Feb. 2019


// Open and connect socket
let socket = io('/puppetmaster');

var team1 = [];
var team2 = [];

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

	socket.on('team1',
		function(bubbles){
			console.log('got 1')
			team1 = bubbles;
		});

	socket.on('team2',
		function(bubbles){
			console.log('got 2')
			team2 = bubbles;
		});
}

function draw(){
	bubbleTeam1();
	bubbleTeam2();
}

function bubbleTeam1(){
	// for (var i = bubbles.length; i >= 0; i--){
	for (var i = 0; i < team1.length; i++){
		fill(team1[i].r, team1[i].g, team1[i].b);
		ellipse((i + 1) * width/4, 9 * height/12, 60, 60);
		text(team1[i].name,(i + 1) * width/4, 10 * height/12);
	}
}

function bubbleTeam2(){
	// for (var i = bubbles.length; i >= 0; i--){
	for (var i = 0; i < team2.length; i++){
		fill(team2[i].r, team2[i].g, team2[i].b);
		ellipse((i + 1) * width/4, 2 * height/12, 60, 60);
		text(team2[i].name,(i + 1) * width/4, 3 * height/12);
	}
}
