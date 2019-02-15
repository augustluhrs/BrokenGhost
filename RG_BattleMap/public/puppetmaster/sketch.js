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

let reg1 = {n: 'North America', b: false}; //x, y, t, h
let reg2 = {n: 'Central America', b: false};
let reg3 = {n: 'South America', b: false};
let reg4 = {n: 'Greenland', b: false};
let reg5 = {n: 'Europe', b: false};
let reg6 = {n: 'West Africa', b: false};
let reg7 = {n: 'South Africa', b: false};
let reg8 = {n: 'East Africa', b: false};
let reg9 = {n: 'Russia', b: false};
let reg10 = {n: 'Middle East', b: false};
let reg11 = {n: 'India', b: false};
let reg12 = {n: 'Siberia', b: false};
let reg13 = {n: 'Southeast Asia', b: false};
let reg14 = {n: 'Oceania', b: false};
let reg15 = {n: 'UN Air Fortress', b: false};
let reg16 = {n: 'Pacific Underwater Fortress', b: false};
let regionIn1, regionIn2, regionIn3, regionIn4, regionIn5, regionIn6, regionIn7, regionIn8,
	regionIn9, regionIn10, regionIn11, regionIn12, regionIn13, regionIn14, regionIn15, regionIn16;
let regionButt1, regionButt2, regionButt3, regionButt4, regionButt5, regionButt6, regionButt7, regionButt8,
	regionButt9, regionButt10, regionButt11, regionButt12, regionButt13, regionButt14, regionButt15, regionButt16;
let regTeamButt1, regTeamButt2, regTeamButt3, regTeamButt4, regTeamButt5, regTeamButt6, regTeamButt7, regTeamButt8,
	regTeamButt9, regTeamButt10, regTeamButt11, regTeamButt12, regTeamButt13, regTeamButt14, regTeamButt15, regTeamButt16;
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
	// textAlign(RIGHT);
	regTeamButt1 = createButton('region COLOR');
	regTeamButt1.position(350, 25);
	regTeamButt1.mousePressed(regColor1);
	regionIn1 = createInput('0');
	regionIn1.position(450, 25);
	regionButt1 = createButton('North America BATTLE');
	regionButt1.position(625, 25);
	regionButt1.mousePressed(battle1);
		// regionButt1.mousePressed(battle, reg1);
	regTeamButt2 = createButton('region COLOR');
	regTeamButt2.position(350, 50);
	regTeamButt2.mousePressed(regColor2);
	regionIn2 = createInput('0');
	regionIn2.position(450, 50);
	regionButt2 = createButton('Central America BATTLE');
	regionButt2.position(625, 50);
	regionButt2.mousePressed(battle2);
	regTeamButt3 = createButton('region COLOR');
	regTeamButt3.position(350, 75);
	regTeamButt3.mousePressed(regColor3);
	regionIn3 = createInput('0');
	regionIn3.position(450, 75);
	regionButt3 = createButton('South America BATTLE');
	regionButt3.position(625, 75);
	regionButt3.mousePressed(battle3);
	regTeamButt4 = createButton('region COLOR');
	regTeamButt4.position(350, 100);
	regTeamButt4.mousePressed(regColor4);
	regionIn4 = createInput('0');
	regionIn4.position(450, 100);
	regionButt4 = createButton('Greenland BATTLE');
	regionButt4.position(625, 100);
	regionButt4.mousePressed(battle4);
	regTeamButt5 = createButton('region COLOR');
	regTeamButt5.position(350, 125);
	regTeamButt5.mousePressed(regColor5);
	regionIn5 = createInput('0');
	regionIn5.position(450, 125);
	regionButt5 = createButton('Europe BATTLE');
	regionButt5.position(625, 125);
	regionButt5.mousePressed(battle5);
	regTeamButt6 = createButton('region COLOR');
	regTeamButt6.position(350, 150);
	regTeamButt6.mousePressed(regColor6);
	regionIn6 = createInput('0');
	regionIn6.position(450, 150);
	regionButt6 = createButton('West Africa BATTLE');
	regionButt6.position(625, 150);
	regionButt6.mousePressed(battle6);
	regTeamButt7 = createButton('region COLOR');
	regTeamButt7.position(350, 175);
	regTeamButt7.mousePressed(regColor7);
	regionIn7 = createInput('0');
	regionIn7.position(450, 175);
	regionButt7 = createButton('South Africa BATTLE');
	regionButt7.position(625, 175);
	regionButt7.mousePressed(battle7);
	regTeamButt8 = createButton('region COLOR');
	regTeamButt8.position(350, 200);
	regTeamButt8.mousePressed(regColor8);
	regionIn8 = createInput('0');
	regionIn8.position(450, 200);
	regionButt8 = createButton('East Africa BATTLE');
	regionButt8.position(625, 200);
	regionButt8.mousePressed(battle8);
	regTeamButt9 = createButton('region COLOR');
	regTeamButt9.position(350, 225);
	regTeamButt9.mousePressed(regColor9);
	regionIn9 = createInput('0');
	regionIn9.position(450, 225);
	regionButt9 = createButton('Russia BATTLE');
	regionButt9.position(625, 225);
	regionButt9.mousePressed(battle9);
	regTeamButt10 = createButton('region COLOR');
	regTeamButt10.position(350, 250);
	regTeamButt10.mousePressed(regColor10);
	regionIn10 = createInput('0');
	regionIn10.position(450, 250);
	regionButt10 = createButton('Middle East BATTLE');
	regionButt10.position(625, 250);
	regionButt10.mousePressed(battle10);
	regTeamButt11 = createButton('region COLOR');
	regTeamButt11.position(350, 275);
	regTeamButt11.mousePressed(regColor11);
	regionIn11 = createInput('0');
	regionIn11.position(450, 275);
	regionButt11 = createButton('India BATTLE');
	regionButt11.position(625, 275);
	regionButt11.mousePressed(battle11);
	regTeamButt12 = createButton('region COLOR');
	regTeamButt12.position(350, 300);
	regTeamButt12.mousePressed(regColor12);
	regionIn12 = createInput('0');
	regionIn12.position(450, 300);
	regionButt12 = createButton('Siberia BATTLE');
	regionButt12.position(625, 300);
	regionButt12.mousePressed(battle12);
	regTeamButt13 = createButton('region COLOR');
	regTeamButt13.position(350, 325);
	regTeamButt13.mousePressed(regColor13);
	regionIn13 = createInput('0');
	regionIn13.position(450, 325);
	regionButt13 = createButton('Southeast Asia BATTLE');
	regionButt13.position(625, 325);
	regionButt13.mousePressed(battle13);
	regTeamButt14 = createButton('region COLOR');
	regTeamButt14.position(350, 350);
	regTeamButt14.mousePressed(regColor14);
	regionIn14 = createInput('0');
	regionIn14.position(450, 350);
	regionButt14 = createButton('Oceania BATTLE');
	regionButt14.position(625, 350);
	regionButt14.mousePressed(battle14);
	regTeamButt15 = createButton('region COLOR');
	regTeamButt15.position(350, 375);
	regTeamButt15.mousePressed(regColor15);
	regionIn15 = createInput('0');
	regionIn15.position(450, 375);
	regionButt15 = createButton('UN Air Fort BATTLE');
	regionButt15.position(625, 375);
	regionButt15.mousePressed(battle15);
	regTeamButt16 = createButton('region COLOR');
	regTeamButt16.position(350, 400);
	regTeamButt16.mousePressed(regColor16);
	regionIn16 = createInput('0');
	regionIn16.position(450, 400);
	regionButt16 = createButton('Pacific Underwater Fort BATTLE');
	regionButt16.position(625, 400);
	regionButt16.mousePressed(battle16);
	// textAlign(CENTER);
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
	reg1.h = regionIn1.value();
	reg2.h = regionIn2.value();
	reg3.h = regionIn3.value();
	reg4.h = regionIn4.value();
	reg5.h = regionIn5.value();
	reg6.h = regionIn6.value();
	reg7.h = regionIn7.value();
	reg8.h = regionIn8.value();
	reg9.h = regionIn9.value();
	reg10.h = regionIn10.value();
	reg11.h = regionIn11.value();
	reg12.h = regionIn12.value();
	reg13.h = regionIn13.value();
	reg14.h = regionIn14.value();
	reg15.h = regionIn15.value();
	reg16.h = regionIn16.value();
	regions = [reg1, reg2, reg3, reg4, reg5, reg6, reg7, reg8, reg9, reg10, reg11, reg12, reg13, reg14, reg15, reg16];
	// regTeamButt1.elt.attribute.innerHtml('dook')
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

function regColor1(){
	laboriousColorFunction();
	regTeamButt1.style('background-color', teamCol);
	reg1.c = teamCol;
}

function regColor2(){
	laboriousColorFunction();
	regTeamButt2.style('background-color', teamCol);
	reg2.c = teamCol;
}

function regColor3(){
	laboriousColorFunction();
	regTeamButt3.style('background-color', teamCol);
	reg3.c = teamCol;
}

function regColor4(){
	laboriousColorFunction();
	regTeamButt4.style('background-color', teamCol);
	reg4.c = teamCol;
}

function regColor5(){
	laboriousColorFunction();
	regTeamButt5.style('background-color', teamCol);
	reg5.c = teamCol;
}

function regColor6(){
	laboriousColorFunction();
	regTeamButt6.style('background-color', teamCol);
	reg6.c = teamCol;
}

function regColor7(){
	laboriousColorFunction();
	regTeamButt7.style('background-color', teamCol);
	reg7.c = teamCol;
}

function regColor8(){
	laboriousColorFunction();
	regTeamButt8.style('background-color', teamCol);
	reg8.c = teamCol;
}

function regColor9(){
	laboriousColorFunction();
	regTeamButt9.style('background-color', teamCol);
	reg9.c = teamCol;
}

function regColor10(){
	laboriousColorFunction();
	regTeamButt10.style('background-color', teamCol);
	reg10.c = teamCol;
}

function regColor11(){
	laboriousColorFunction();
	regTeamButt11.style('background-color', teamCol);
	reg11.c = teamCol;
}

function regColor12(){
	laboriousColorFunction();
	regTeamButt12.style('background-color', teamCol);
	reg12.c = teamCol;
}

function regColor13(){
	laboriousColorFunction();
	regTeamButt13.style('background-color', teamCol);
	reg13.c = teamCol;
}

function regColor14(){
	laboriousColorFunction();
	regTeamButt14.style('background-color', teamCol);
	reg14.c = teamCol;
}

function regColor15(){
	laboriousColorFunction();
	regTeamButt15.style('background-color', teamCol);
	reg15.c = teamCol;
}

function regColor16(){
	laboriousColorFunction();
	regTeamButt16.style('background-color', teamCol);
	reg16.c = teamCol;
}
