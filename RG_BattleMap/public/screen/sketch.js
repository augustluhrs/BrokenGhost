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
	// background(150, 50, 50);
	background(0);
	textAlign(CENTER);
	// textSize(width/32);


  // Listen for confirmation of connection
  socket.on('connect', function() {
    console.log("Connected");
  });

	// - - - - - heartbeat
	socket.on('update',
		function(data){
			background(0);
			regions = data.r;
			teams = data.t;
			teamLimit = int(data.l);
			console.log(data);
			// console.log(teams);
			for (var i = 0; i < teamLimit; i++){
				// stroke(255);
				// strokeWeight(.5);
				let tR = teams[i].c.levels[0];
				let tG = teams[i].c.levels[1];
				let tB = teams[i].c.levels[2];
				let tA = teams[i].c.levels[3];
				let fillCol = color(tR, tG, tB, tA);
				fill(fillCol);
				// console.log(teams[i].n.length);
				// textSize(width/(teams[i].n.length * 4));
				if (teams[i].n.length >= 12){
					textSize(windowWidth/60);
				}
				else{
					textSize(windowWidth/50);
				}
				if (i % 2 == 0){
					text(teams[i].n, (i + 1) * windowWidth/(teamLimit + 1) , windowHeight - 50)
				}
				else{
					text(teams[i].n, (i + 1) * windowWidth/(teamLimit + 1) , windowHeight - 25)
				}
			}
		});
}

function draw(){

}
