// Master Interface for Davis the Intern
// Controls the Screen Display Elements
// by August Luhrs Feb. 2019
// assets from Arnab Chakravarty


// Open and connect socket
let socket = io('/puppetmaster');

let map;
var regions = [];
let italy;

//interface buttons and inputs
let team1, team2, team3, team4, team5, team6, team7, team8; //all possible factions
let teamIn1, teamIn2, teamIn3, teamIn4, teamIn5, teamIn6, teamIn7, teamIn8; //team inputs
let teamButt1, teamButt2, teamButt3, teamButt4, teamButt5, teamButt6, teamButt7,teamButt8; //team display and color changer
let colorNum = 0;
let teamColors = [
	0, 255, 0, 150, //green
	255, 0, 0, 150, //red
	0, 0, 255, 150, //blue
	255, 165, 0, 150, //orange
	255, 255, 0, 150, //yellow
	0, 255, 255, 150, //cyan
	255, 0, 255, 150, //purple
	150, 150, 150, 150 //grey
]
let updateMap; //to send updated info to server && screen

function setup(){
  //- - - - - overall
	// var screenSize = windowHeight - 100;
	// createCanvas(int(screenSize * .666), screenSize);
	// map = createDiv('map');
	// canvas = createCanvas(windowWidth, windowHeight);
	// canvas.parent('map');
	// map = createCanvas(windowWidth, windowHeight);
	// map.id('map');
	// background(150, 50, 50, 50);
	noCanvas();

	//interface buttons and inputs
	/*
	for (var i = 0; i <9; i++){
		// let teamInput;
		// teamInput = createInput('');
		teams[i] = createInput('team');
		teams[i].position(25, i * 25);
		// teams[i] = teamInput.value();
	}*/

	//laborious, but works for now
	teamIn1 = createInput('team');
	teamIn1.position(25, 25);
	teamButt1 = createButton(teamIn1.value());
	teamButt1.position(200, 25);
	teamButt1.mousePressed(teamColor1);
	teamIn2 = createInput('team');
	teamIn2.position(25, 50);
	teamButt2 = createButton(teamIn2.value());
	teamButt2.position(200, 50);
	teamButt2.mousePressed(teamColor2);
	teamIn3 = createInput('team');
	teamIn3.position(25, 75);
	teamButt3 = createButton(teamIn3.value());
	teamButt3.position(200, 75);
	teamButt3.mousePressed(teamColor3);
	teamIn4 = createInput('team');
	teamIn4.position(25, 100);
	teamButt4 = createButton(teamIn4.value());
	teamButt4.position(200, 100);
	teamButt4.mousePressed(teamColor4);
	teamIn5 = createInput('team');
	teamIn5.position(25, 125);
	teamButt5 = createButton(teamIn5.value());
	teamButt5.position(200, 125);
	teamButt5.mousePressed(teamColor5);
	teamIn6 = createInput('team');
	teamIn6.position(25, 150);
	teamButt6 = createButton(teamIn6.value());
	teamButt6.position(200, 150);
	teamButt6.mousePressed(teamColor6);
	teamIn7 = createInput('team');
	teamIn7.position(25, 175);
	teamButt7 = createButton(teamIn7.value());
	teamButt7.position(200, 175);
	teamButt7.mousePressed(teamColor7);
	teamIn8 = createInput('team');
	teamIn8.position(25, 200);
	teamButt8 = createButton(teamIn8.value());
	teamButt8.position(200, 200);
	teamButt8.mousePressed(teamColor8);

	updateMap = createButton('UPDATE MAP');
	updateMap.position(4 * windowWidth/5, windowHeight - 50);
	updateMap.mousePressed(function(){
		data = {
      r: regions,
      t: teams
		}
		socket.emit('update', data)
	});

	/* stupid italy
	italy = createImg('../assets/italy.jpg');
	// italy = loadImage('../assets/italy.jpg');
	italy.class('region');
	// italy.parent('map');
	// italy.style('display', 'inline-block');
	italy.position(100, 100);
	italy.show();
	italy.mousePressed(function(){
		console.log('italy');
		// italy.tint(random(255), random(255), random(255));
		// italy.style('color', '#ffff00');
	});
	*/

  // Listen for confirmation of connection
  socket.on('connect', function() {
    console.log("Connected");
  });

	// - - - - - heartbeat
	socket.on('update', function(data){
		regions = data.r;
		teams = data.t;
		});
}

function draw(){
	// team updates
	team1 = teamIn1.value();
	team2 = teamIn2.value();
	team3 = teamIn3.value();
	team4 = teamIn4.value();
	team5 = teamIn5.value();
	team6 = teamIn6.value();
	team7 = teamIn7.value();
	team8 = teamIn8.value();
	teams = [team1, team2, team3, team4, team5, team6, team7, team8];
	// italy.show();
}

//I hate that these are individual, but it's late and I can fix it later
function teamColor1(){
	laboriousColorFunction();
	teamButt1.style('background-color', teamCol);
}

function teamColor2(){
	laboriousColorFunction();
	teamButt2.style('background-color', teamCol);
}

function teamColor3(){
	laboriousColorFunction();
	teamButt3.style('background-color', teamCol);
}

function teamColor4(){
	laboriousColorFunction();
	teamButt4.style('background-color', teamCol);
}

function teamColor5(){
	laboriousColorFunction();
	teamButt5.style('background-color', teamCol);
}

function teamColor6(){
	laboriousColorFunction();
	teamButt6.style('background-color', teamCol);
}

function teamColor7(){
	laboriousColorFunction();
	teamButt7.style('background-color', teamCol);
}

function teamColor8(){
	laboriousColorFunction();
	teamButt8.style('background-color', teamCol);
}

function laboriousColorFunction(){
	colorNum += 4;
	if(colorNum >= 32){
		colorNum = 0;
	}
	let tR = teamColors[colorNum];
	let tG = teamColors[colorNum + 1];
	let tB = teamColors[colorNum + 2];
	let tA = teamColors[colorNum + 3];
	teamCol = color(tR, tG, tB, tA);
}