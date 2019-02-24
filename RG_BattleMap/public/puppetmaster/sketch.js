// Master Interface for Cody the Intern
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
let teams = [];
let regStartCol = 'gray';
let regions = [ // need array wrapper?
	{name: 'North America', h: 0, b: false, color: regStartCol},
	{name: 'Central America', h: 0, b: false, color: regStartCol},
	{name: 'South America', h: 0, b: false, color: regStartCol},
	{name: 'Greenland', h: 0, b: false, color: regStartCol},
	{name: 'Europe', h: 0, b: false, color: regStartCol},
	{name: 'West Africa', h: 0, b: false, color: regStartCol},
	{name: 'South Africa', h: 0, b: false, color: regStartCol},
	{name: 'East Africa', h: 0, b: false, color: regStartCol},
	{name: 'Russia', h: 0, b: false, color: regStartCol},
	{name: 'Middle East', h: 0, b: false, color: regStartCol},
	{name: 'India', h: 0, b: false, color: regStartCol},
	{name: 'Siberia', h: 0, b: false, color: regStartCol},
	{name: 'China', h: 0, b: false, color: regStartCol},
	{name: 'Oceania', h: 0, b: false, color: regStartCol},
	{name: 'UN Air Fortress', h: 0, b: false, color: regStartCol},
	{name: 'P.U.F.F.', h: 0, b: false, color: regStartCol}
];

/*
UPDATED V.2

*/
let startTeams //starts with 20 team max
let teamLimitIn;
var teamLimit = 20; //starts with 20 team max
let teamIns = []; //team name inputs
let teamButts = []; //all team color buttons
// let teamColors = []; //just to store color for logging
let teamData = []; //team socket data

let regColorButts = [];
let regIns = [];
let regBattleButts = [];
let battleCount; //if 2, battle
let regData = []; //region socket data

let colorDiv;
let colorButts = []; //all color buttons
let colorBucket; //stores the selected color
let swatches = ['HotPink', 'Magenta', 'Purple', 'Indigo', 'Crimson', 'OrangeRed',
		'GoldenRod', 'Yellow', 'DarkKhaki', 'Pink', 'PaleGreen', 'MediumSpringGreen',
		'YellowGreen', 'Olive', 'SaddleBrown', 'Lime', 'SeaGreen', 'DarkGreen', 'Teal',
		'Cyan', 'CornflowerBlue', 'Blue', 'White', 'Gray', 'LightSlateGray', 'DarkSlateGray'];

let timerButton; // starts timer on screen
let updateMap; // to send updated info to server && screen -- want to phase out


function setup(){
	noCanvas();
	 /*
	NEW AND IMPROVED INPUTS
	-- super thanks to u/GoToLoop on processing forum for loop/arrow functions
	 */

	 //number of teams in play
	 startTeams = str(teamLimit);
	 teamLimitIn = createInput(startTeams);
	 teamLimitIn.parent('teams');
	 // team buttons
	 for (let i = 0; i < teamLimit; i++){
		 teamIns[i] = createInput(i);
		 teamIns[i].parent('teams');
		 teamButts[i] = createButton('Team ' + (i+1) + ' Color').mousePressed(() =>
	 			teamButts[i].style('background-color', colorBucket));
		 teamButts[i].style('background-color', 'LightSlateGray');
		 teamButts[i].parent('teams');
	 }

	 //regions
	for(let i = 0; i < regions.length; i++){
		let newDiv = createDiv('');
		let divId = str(i);
		newDiv.id(divId);
		newDiv.parent('regions');
		regColorButts[i] = createButton(regions[i].name).mousePressed(() =>
			regColorButts[i].style('background-color', colorBucket)); //need to add corresponding data line
		regColorButts[i].style('background-color', regStartCol);
		regColorButts[i].parent(divId);
		regIns[i] = createInput('0'); //need corr data line
		regIns[i].parent(divId);
		// regBattleButts[i] = createButton('Battle? : ' + regions[i].b); //need draw loop update
		regBattleButts[i] = createButton('Battle?').mousePressed(() =>
			battleOnOff(regBattleButts[i])); //need draw loop update
		regBattleButts[i].style('background-color', 'blue');
		regBattleButts[i].parent(divId);
	}


	//color buttons
	// colorDiv = createDiv('colorButtons');
	for(let i = 0; i < swatches.length; i++){
		let thisCol = swatches[i];
		colorButts[i] = createButton(thisCol).mousePressed(() => colorGrab(thisCol));
		colorButts[i].style('background-color', thisCol);
		colorButts[i].parent('colors');
	}






	//overall buttons
	timerButton = createButton('START TIMER');
	timerButton.mousePressed(function(){
		socket.emit('timerStart');
	});
	timerButton.parent('overall');
	updateMap = createButton('UPDATE MAP'); //outdated
	updateMap.mousePressed(function(){
		for (var i = 0; i < teamButts.length; i++){
			teamData[i] = {
				teamNum: i+1,
				name: teamIns[i].elt.value,
				color: teamButts[i].elt.style.backgroundColor
			};
		}
		data = {
      r: regions,
      t: teamData,
			l: teamLimit
		}
		socket.emit('update', data);
	});
	updateMap.parent('overall');




  // Listen for confirmation of connection
  socket.on('connect', function() {
    console.log("Connected");
  });

	// - - - - - heartbeat
	socket.on('update', function(data){
		regions = data.r;
		teams = data.t;
		teamLimit = data.l;
		});
}

function draw(){
	// team updates
	teamLimit = teamLimitIn.value();
	for (var i = 0; i < startTeams; i++){
		if (i >= teamLimit){
			teamIns[i].hide();
			teamButts[i].hide();
		}
		else if(i < teamLimit){
			teamIns[i].show();
			teamButts[i].show();
		}
	}
	for (var i = 0; i < teamButts.length; i++){
		teamData[i] = {
			teamNum: i+1,
			name: teamIns[i].elt.value,
			color: teamButts[i].elt.style.backgroundColor
		};
	}
	//region updates
	battleCount = 0;
	for (var i = 0; i < regions.length; i++){
		if(regBattleButts[i].elt.style.backgroundColor == 'red'){
			regions[i].b = true;
			battleCount++;
		}
		else{
			regions[i].b = false;
		}
		regions[i].h = regIns[i].elt.value;
		regions[i].color = regColorButts[i].elt.style.backgroundColor;
	}
	data = {
		r: regions,
		t: teamData,
		l: teamLimit
	}
	socket.emit('update', data);
	if (battleCount == 2){
		socket.emit('battle');
	}
}

function battleOnOff(reg, i){
	// reg.b = !reg.b;
	if (reg.elt.style.backgroundColor == 'blue'){
		reg.elt.style.backgroundColor = 'red';
	}
	else {
		reg.elt.style.backgroundColor = 'blue';
	}
	// return reg.b;
}
function colorGrab(colorButt){
	colorBucket = colorButt;
}
/*
	let newCol = new ColorButt('Magenta', color('magenta'));
	newCol = createButton('newCol.name');
	newCol.mousePressed(newCol.colorGrab());
	colorButts.push(newCol);

class ColorButt {
	constructor(name, c){
		this.name = name;
		this.c = c;
		this = createButton('')
	}

	colorGrab(){
		colorBucket = this.c;
	}
}
*/
//I hate that these are individual, but it's late and I can fix it later

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
/*
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
*/
