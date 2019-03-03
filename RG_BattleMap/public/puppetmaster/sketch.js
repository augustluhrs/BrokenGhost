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
	{name: 'North America', h: 0, b: false, t: false, color: regStartCol},
	{name: 'Central America', h: 0, b: false,t: false, color: regStartCol},
	{name: 'South America', h: 0, b: false,t: false, color: regStartCol},
	{name: 'Greenland', h: 0, b: false, t: false,color: regStartCol},
	{name: 'Europe', h: 0, b: false,t: false, color: regStartCol},
	{name: 'West Africa', h: 0, b: false,t: false, color: regStartCol},
	{name: 'South Africa', h: 0, b: false,t: false, color: regStartCol},
	{name: 'East Africa', h: 0, b: false,t: false, color: regStartCol},
	{name: 'Russia', h: 0, b: false,t: false, color: regStartCol},
	{name: 'Middle East', h: 0, b: false,t: false, color: regStartCol},
	{name: 'India', h: 0, b: false, t: false,color: regStartCol},
	{name: 'Siberia', h: 0, b: false, t: false,color: regStartCol},
	{name: 'China', h: 0, b: false, t: false,color: regStartCol},
	{name: 'Oceania', h: 0, b: false,t: false, color: regStartCol},
	{name: 'UN Air Fortress', h: 0, b: false, t: false,color: regStartCol},
	{name: 'P.U.F.F.', h: 0, b: false, t: false,color: regStartCol},
	{name: 'Antarctica', h: 'S', b: false,t: false, color: regStartCol}

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
let letsBattle = false;
let regData = []; //region socket data
let battleOver; //battle over button

let colorDiv;
let colorButts = []; //all color buttons
let colorBucket; //stores the selected color
let swatches = ['HotPink', 'Magenta', 'Purple', 'Indigo', 'Crimson', 'OrangeRed',
		'GoldenRod', 'Yellow', 'DarkKhaki', 'Pink', 'PaleGreen', 'MediumSpringGreen',
		'YellowGreen', 'Olive', 'SaddleBrown', 'Lime', 'SeaGreen', 'DarkGreen', 'Teal',
		'Cyan', 'CornflowerBlue', 'Blue', 'White', 'Gray', 'LightSlateGray', 'DarkSlateGray'];

let timerButton; // starts timer on screen
let updateMap; // to send updated info to server && screen -- want to phase out

//special events
let superButt, kaijuButt, moleButt, doomButt;
let targetButts = [];

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
			battleOnOff(regBattleButts[i]));
		regBattleButts[i].style('background-color', 'blue');
		regBattleButts[i].parent(divId);
		targetButts[i] = createButton('TARGET').mousePressed(() =>
			targetOnOff(targetButts[i], regions[i]));
		targetButts[i].style('background-color', 'teal');
		targetButts[i].parent(divId);
	}


	//color buttons
	// colorDiv = createDiv('colorButtons');
	for(let i = 0; i < swatches.length; i++){
		let thisCol = swatches[i];
		colorButts[i] = createButton(thisCol).mousePressed(() => colorGrab(thisCol));
		colorButts[i].style('background-color', thisCol);
		colorButts[i].parent('colors');
	}



	//special buttons
	kaijuButt = createButton('KAIJU ACTIVE');
	kaijuButt.parent('special');
	kaijuButt.mousePressed(function(){
		socket.emit('kaiju');
	});
	moleButt = createButton('MOLES ACTIVE');
	moleButt.parent('special');
	moleButt.mousePressed(function(){
		socket.emit('moles');
	});
	doomButt = createButton('DOOMSDAY ACTIVE');
	doomButt.parent('special');
	doomButt.mousePressed(function(){
		socket.emit('doomsday');
	});
	superButt = createButton('SUPERBIOUS ACTIVE');
	superButt.parent('special');
	superButt.mousePressed(function(){
		socket.emit('superbious');
	});

	// superOn.mousePressed()



	//overall buttons
	timerButton = createButton('START TIMER');
	timerButton.mousePressed(function(){
		socket.emit('timerStart');
	});
	timerButton.parent('overall');
	battleOver = createButton('BATTLE OVER');
	battleOver.parent('overall');
	battleOver.mousePressed(function(){
		for (var i = 0; i < regions.length; i++){
			if (regBattleButts[i].elt.style.backgroundColor == 'red'){
				regBattleButts[i].elt.style.backgroundColor = 'blue';
			}
		}
		socket.emit('battle over');
		letsBattle = false;
	})
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
	} //adjustable team inputs
	for (var i = 0; i < teamButts.length; i++){
		teamData[i] = {
			teamNum: i+1,
			name: teamIns[i].elt.value,
			color: teamButts[i].elt.style.backgroundColor
		};
	} //team color Buttons
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
	if (battleCount == 2 && !letsBattle){
			socket.emit('battle');
			letsBattle = true;
	}
}

function battleOnOff(reg){
	if (reg.elt.style.backgroundColor == 'blue'){
		reg.elt.style.backgroundColor = 'red';
	}
	else {
		reg.elt.style.backgroundColor = 'blue';
	}
}

function targetOnOff(butt, reg){
	if (butt.elt.style.backgroundColor == 'teal'){
		butt.elt.style.backgroundColor = 'hotPink';
		reg.t = true;
	}
	else {
		butt.elt.style.backgroundColor = 'teal';
		reg.t = false;
	}
}
function colorGrab(colorButt){
	colorBucket = colorButt;
}
