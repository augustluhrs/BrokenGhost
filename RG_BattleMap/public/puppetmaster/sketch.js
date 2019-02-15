// Master Interface for Davis the Intern
// Controls the Screen Display Elements
// by August Luhrs Feb. 2019
// assets from Arnab Chakravarty

// FOR THE LOVE OF GOD DON'T LOOK AT THIS CODE
// ITS HORRENDOUS, I DID WHAT I HAD TO


// Open and connect socket
let socket = io('/puppetmaster');

// let map;

// let italy;

//interface buttons and inputs
let team1 = {};
let team2 = {};
let team3 = {};
let team4 = {};
let team5 = {};
let team6 = {};
let team7 = {};
let team8 = {}; //all possible factions
let teams = [];
let teamIn1, teamIn2, teamIn3, teamIn4, teamIn5, teamIn6, teamIn7, teamIn8; //team inputs
let teamButt1, teamButt2, teamButt3, teamButt4, teamButt5, teamButt6, teamButt7,teamButt8; //team display and color changer
let colorNum = 0;
let teamColors = [
	0, 255, 0, 150, //green
	255, 0, 0, 150, //red
	255, 255, 255, 150, //white - was blue, but too dark
	255, 165, 0, 150, //orange
	255, 255, 0, 150, //yellow
	0, 255, 255, 150, //cyan
	255, 0, 255, 150, //purple
	150, 150, 150, 150 //grey
]
let teamLimitIn;
var teamLimit; //starts with 8 teams

let reg1 = {b: false};
let reg2 = {b: false};
let reg3 = {b: false};
let reg4 = {b: false};
let reg5 = {b: false};
let reg6 = {b: false};
let reg7 = {b: false};
let reg8 = {b: false};
let reg9 = {b: false};
let reg10 = {b: false};
let reg11 = {b: false};
let reg12 = {b: false};
let reg13 = {b: false};
let reg14 = {b: false};
let reg15 = {b: false};
let reg16 = {b: false};
let regionIn1, regionIn2, regionIn3, regionIn4, regionIn5, regionIn6, regionIn7, regionIn8,
	regionIn9, regionIn10, regionIn11, regionIn12, regionIn13, regionIn14, regionIn15, regionIn16;
let regionButt1, regionButt2, regionButt3, regionButt4, regionButt5, regionButt6, regionButt7, regionButt8,
	regionButt9, regionButt10, regionButt11, regionButt12, regionButt13, regionButt14, regionButt15, regionButt16;
var regions = [reg1, reg2, reg3, reg4, reg5, reg6, reg7, reg8, reg9, reg10, reg11, reg12, reg13, reg14, reg15, reg16];
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
	teamIn1 = createInput('Team 1');
	teamIn1.position(25, 25);
	teamButt1 = createButton('Team COLOR');
	teamButt1.position(200, 25);
	teamButt1.mousePressed(teamColor1);
	teamIn2 = createInput('Team 2');
	teamIn2.position(25, 50);
	teamButt2 = createButton('Team COLOR');
	teamButt2.position(200, 50);
	teamButt2.mousePressed(teamColor2);
	teamIn3 = createInput('Team 3');
	teamIn3.position(25, 75);
	teamButt3 = createButton('Team COLOR');
	teamButt3.position(200, 75);
	teamButt3.mousePressed(teamColor3);
	teamIn4 = createInput('Team 4');
	teamIn4.position(25, 100);
	teamButt4 = createButton('Team COLOR');
	teamButt4.position(200, 100);
	teamButt4.mousePressed(teamColor4);
	teamIn5 = createInput('Team 5');
	teamIn5.position(25, 125);
	teamButt5 = createButton('Team COLOR');
	teamButt5.position(200, 125);
	teamButt5.mousePressed(teamColor5);
	teamIn6 = createInput('Team 6');
	teamIn6.position(25, 150);
	teamButt6 = createButton('Team COLOR');
	teamButt6.position(200, 150);
	teamButt6.mousePressed(teamColor6);
	teamIn7 = createInput('Team 7');
	teamIn7.position(25, 175);
	teamButt7 = createButton('Team COLOR');
	teamButt7.position(200, 175);
	teamButt7.mousePressed(teamColor7);
	teamIn8 = createInput('Team 8');
	teamIn8.position(25, 200);
	teamButt8 = createButton('Team COLOR');
	teamButt8.position(200, 200);
	teamButt8.mousePressed(teamColor8);

	//starting colors
	team1.c = color(255, 255, 255, 155);
	team2.c = color(255, 255, 255, 155);
	team3.c = color(255, 255, 255, 155);
	team4.c = color(255, 255, 255, 155);
	team5.c = color(255, 255, 255, 155);
	team6.c = color(255, 255, 255, 155);
	team7.c = color(255, 255, 255, 155);
	team8.c = color(255, 255, 255, 155);

	//number of teams left
	teamLimitIn = createInput('8');
	teamLimitIn.position(50, 225);

	//regions
	regionIn1 = createInput('0');
	regionIn1.position(350, 25);
	regionButt1 = createButton('North America BATTLE');
	regionButt1.position(525, 25);
	regionButt1.mousePressed(battle1);
		// regionButt1.mousePressed(battle, reg1);
	regionIn2 = createInput('0');
	regionIn2.position(350, 50);
	regionButt2 = createButton('Central America BATTLE');
	regionButt2.position(525, 50);
	regionButt2.mousePressed(battle2);
	regionIn3 = createInput('0');
	regionIn3.position(350, 75);
	regionButt3 = createButton('South America BATTLE');
	regionButt3.position(525, 75);
	regionButt3.mousePressed(battle3);
	regionIn4 = createInput('0');
	regionIn4.position(350, 100);
	regionButt4 = createButton('Greenland BATTLE');
	regionButt4.position(525, 100);
	regionButt4.mousePressed(battle4);
	regionIn5 = createInput('0');
	regionIn5.position(350, 125);
	regionButt5 = createButton('Europe BATTLE');
	regionButt5.position(525, 125);
	regionButt5.mousePressed(battle5);
	regionIn6 = createInput('0');
	regionIn6.position(350, 150);
	regionButt6 = createButton('West Africa BATTLE');
	regionButt6.position(525, 150);
	regionButt6.mousePressed(battle6);
	regionIn7 = createInput('0');
	regionIn7.position(350, 175);
	regionButt7 = createButton('South Africa BATTLE');
	regionButt7.position(525, 175);
	regionButt7.mousePressed(battle7);
	regionIn8 = createInput('0');
	regionIn8.position(350, 200);
	regionButt8 = createButton('East Africa BATTLE');
	regionButt8.position(525, 200);
	regionButt8.mousePressed(battle8);
	regionIn9 = createInput('0');
	regionIn9.position(350, 225);
	regionButt9 = createButton('Russia BATTLE');
	regionButt9.position(525, 225);
	regionButt9.mousePressed(battle1);
	regionIn10 = createInput('0');
	regionIn10.position(350, 250);
	regionButt10 = createButton('Middle East BATTLE');
	regionButt10.position(525, 250);
	regionButt10.mousePressed(battle10);
	regionIn11 = createInput('0');
	regionIn11.position(350, 275);
	regionButt11 = createButton('India BATTLE');
	regionButt11.position(525, 275);
	regionButt11.mousePressed(battle11);
	regionIn12 = createInput('0');
	regionIn12.position(350, 300);
	regionButt12 = createButton('Siberia BATTLE');
	regionButt12.position(525, 300);
	regionButt12.mousePressed(battle12);
	regionIn13 = createInput('0');
	regionIn13.position(350, 325);
	regionButt13 = createButton('Southeast Asia BATTLE');
	regionButt13.position(525, 325);
	regionButt13.mousePressed(battle13);
	regionIn14 = createInput('0');
	regionIn14.position(350, 350);
	regionButt14 = createButton('Oceania BATTLE');
	regionButt14.position(525, 350);
	regionButt14.mousePressed(battle14);
	regionIn15 = createInput('0');
	regionIn15.position(350, 375);
	regionButt15 = createButton('UN Air Fort BATTLE');
	regionButt15.position(525, 375);
	regionButt15.mousePressed(battle15);
	regionIn16 = createInput('0');
	regionIn16.position(350, 400);
	regionButt16 = createButton('Pacific Underwater Fort BATTLE');
	regionButt16.position(525, 400);
	regionButt16.mousePressed(battle16);




	updateMap = createButton('UPDATE MAP');
	updateMap.position(1 * windowWidth/5, windowHeight - 50);
	updateMap.mousePressed(function(){
		data = {
      r: regions,
      t: teams,
			l: teamLimit
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
	team1.n = teamIn1.value();
	// teamButt1.attribute('innerText', teamIn1.value());
	team2.n = teamIn2.value();
	team3.n = teamIn3.value();
	team4.n = teamIn4.value();
	team5.n = teamIn5.value();
	team6.n = teamIn6.value();
	team7.n = teamIn7.value();
	team8.n = teamIn8.value();
	teams = [team1, team2, team3, team4, team5, team6, team7, team8];
	teamLimit = teamLimitIn.value();
	regions = [reg1, reg2, reg3, reg4, reg5, reg6, reg7, reg8, reg9, reg10, reg11, reg12, reg13, reg14, reg15, reg16];

	// italy.show();
}

//I hate that these are individual, but it's late and I can fix it later
function teamColor1(){
	laboriousColorFunction();
	teamButt1.style('background-color', teamCol);
	team1.c = teamCol;
}

function teamColor2(){
	laboriousColorFunction();
	teamButt2.style('background-color', teamCol);
	team2.c = teamCol;
}

function teamColor3(){
	laboriousColorFunction();
	teamButt3.style('background-color', teamCol);
	team3.c = teamCol;
}

function teamColor4(){
	laboriousColorFunction();
	teamButt4.style('background-color', teamCol);
	team4.c = teamCol;
}

function teamColor5(){
	laboriousColorFunction();
	teamButt5.style('background-color', teamCol);
	team5.c = teamCol;
}

function teamColor6(){
	laboriousColorFunction();
	teamButt6.style('background-color', teamCol);
	team6.c = teamCol;
}

function teamColor7(){
	laboriousColorFunction();
	teamButt7.style('background-color', teamCol);
	team7.c = teamCol;
}

function teamColor8(){
	laboriousColorFunction();
	teamButt8.style('background-color', teamCol);
	team8.c = teamCol;
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

function battle1(){
	reg1.b = !reg1.b;
}

function battle2(){
	reg2.b = !reg2.b;
}

function battle3(){
	reg3.b = !reg3.b;
}

function battle4(){
	reg4.b = !reg4.b;
}

function battle5(){
	reg5.b = !reg5.b;
}

function battle6(){
	reg6.b = !reg6.b;
}

function battle7(){
	reg7.b = !reg7.b;
}

function battle8(){
	reg8.b = !reg8.b;
}

function battle9(){
	reg9.b = !reg9.b;
}

function battle10(){
	reg10.b = !reg10.b;
}

function battle11(){
	reg11.b = !reg11.b;
}

function battle12(){
	reg12.b = !reg12.b;
}

function battle13(){
	reg13.b = !reg13.b;
}

function battle14(){
	reg14.b = !reg14.b;
}

function battle15(){
	reg15.b = !reg15.b;
}

function battle16(){
	reg16.b = !reg16.b;
}
// function battle(reg){
// 	reg.b = !reg.b;
	//no color change
// }
