// Master Interface for Cody the Intern
// Controls the Screen Display Elements
// by August Luhrs Feb. 2019
// assets from Arnab Chakravarty
// updates July 2019


// FOR THE LOVE OF GOD DON'T LOOK AT THIS CODE
// ITS HORRENDOUS, I DID WHAT I HAD TO


// Open and connect socket
let socket = io('/cody');

// let map;
// let italy;

//interface buttons and inputs
let teams = [];
let regStartCol = 'mediumOrchid';
let startLabel = 'Superb!'
let regions = [ // need array wrapper?
	{name: 'North America', h: 0, b: false, t: false, s: false, color: regStartCol},
	{name: 'Central America', h: 0, b: false,t: false, s: false, color: regStartCol},
	{name: 'South America', h: 0, b: false,t: false,  s: false,color: regStartCol},
	// {name: 'Greenland', h: 0, b: false, t: false, s: false,color: regStartCol},
	{name: 'Europe', h: 0, b: false,t: false,  s: false,color: regStartCol},
	{name: 'North Africa', h: 0, b: false,t: false, s: false, color: regStartCol},
	// {name: 'West Africa', h: 0, b: false,t: false, s: false, color: regStartCol},
	{name: 'South Africa', h: 0, b: false,t: false, s: false, color: regStartCol},
	// {name: 'East Africa', h: 0, b: false,t: false,  s: false,color: regStartCol},
	{name: 'Russia', h: 0, b: false,t: false,  s: false,color: regStartCol},
	{name: 'Near East', h: 0, b: false,t: false,  s: false,color: regStartCol},
	// {name: 'Middle East', h: 0, b: false,t: false,  s: false,color: regStartCol},
	// {name: 'India', h: 0, b: false, t: false, s: false,color: regStartCol},
	{name: 'Pacific Rim', h: 0, b: false, t: false, s: false,color: regStartCol},
	// {name: 'Siberia', h: 0, b: false, t: false, s: false,color: regStartCol},
	{name: 'China', h: 0, b: false, t: false, s: false,color: regStartCol},
	{name: 'Australia', h: 0, b: false,t: false, s: false, color: regStartCol},
	// {name: 'Oceania', h: 0, b: false,t: false, s: false, color: regStartCol},
	// {name: 'UN Air Fortress', h: 0, b: false, t: false, s: false,color: regStartCol},
	{name: 'P.U.F.F.', h: 0, b: false, t: false, s: false,color: regStartCol},
	{name: 'Mole Megavator', h: 0, b: false, t: false, s: false,color: regStartCol},
	{name: 'Moon Gate', h: 0, b: false, t: false, s: false,color: regStartCol},
	{name: 'Antarctica', h: 'S', b: false,t: false,  s: false,color: regStartCol}

];

/*
UPDATED V.3

*/
let startTeams //starts with 20 team max
let teamLimitIn;
var teamLimit = 8; //starts with 20 team max
let teamIns = []; //team name inputs
let teamButts = []; //all team color buttons
// let teamColors = []; //just to store color for logging
let teamData = []; //team socket data

let regColorButts = [];
let regIns = [];
// let regBattleButts = [];
// let battleCount; //if 2, battle
// let letsBattle = false;
let regData = []; //region socket data
// let battleOver; //battle over button
// let quakeButt;

let colorDiv;
let colorButts = []; //all color buttons
let colorBucket; //stores the selected color
let swatches = ['HotPink', 'Magenta', 'Purple', 'Indigo', 'Crimson', 'OrangeRed',
		'GoldenRod', 'Yellow', 'DarkKhaki', 'Pink', 'PaleGreen', 'MediumSpringGreen',
		'YellowGreen', 'Olive', 'SaddleBrown', 'Lime', 'SeaGreen', 'DarkGreen', 'Teal',
		'Cyan', 'CornflowerBlue', 'Blue', 'White', 'Gray', 'LightSlateGray', 'DarkSlateGray'];

let mapWipeButt, takeoverButt;
// let timerButton, stopTimer; // timer on server
// let updateMap; // to send updated info to server && screen -- want to phase out

//special events
// let antButt;
// let kaijuButt, moleButt, doomButt;
// let targetButts = [];
// let superTargetButts = [];
// let kaijuOffButt, molesOffButt, laserButt;
// let target = '';

//new Buttons and arrays
//regions
let megavatorButt, gateButt, puffButt, antarcButt;
let megavatorOn = false;
let gateOn = false;
let puffOn = false;
let antarcOn = false;
//NPCs
let moleButt, moonButt, merButt, oganButt, superButt;
let moleOn = false;
let moonOn = false;
let merOn = false;
let oganOn = false;
let superOn = false;
//events
// let kaijuButt, stellaButt;
let events = {
	megavator: megavatorOn,
	gate: gateOn,
	puff: puffOn,
	antarc: antarcOn,
	mole: moleOn,
	moon: moonOn,
	mer: merOn,
	ogan: oganOn,
	super: superOn
};
let npcs = {
	molemen: {x: 0, y: 0, s: false},
	moonmen: {x: 0, y: 0, s: false},
	mermen: {x: 0, y: 0, s: false},
	oganaughts: {x: 0, y: 0, s: false},
	superbious: {x: 0, y: 0, s: false}
};


function setup(){
	// noCanvas();
	 /*
	NEW AND IMPROVED INPUTS
	-- super thanks to u/GoToLoop on processing forum for loop/arrow functions
	 */
	 createCanvas(windowWidth, windowHeight);
	 background(0);
	 //number of teams in play
	 startTeams = str(teamLimit);
	 teamLimitIn = createInput(startTeams);
	 teamLimitIn.parent('teams');
	 // team buttons
	 for (let i = 0; i < teamLimit; i++){
		 teamIns[i] = createInput('Team ' + (i+1));
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
		regIns[i] = createInput(startLabel); //need corr data line
		regIns[i].parent(divId);
		/*
		// regBattleButts[i] = createButton('Battle? : ' + regions[i].b); //need draw loop update
		regBattleButts[i] = createButton('Battle?').mousePressed(() =>
			battleOnOff(regBattleButts[i]));
		regBattleButts[i].style('background-color', 'blue');
		regBattleButts[i].parent(divId);
		targetButts[i] = createButton('TARGET').mousePressed(() =>
			targetOnOff(targetButts[i], regions[i]));
		targetButts[i].style('background-color', 'teal');
		targetButts[i].parent(divId);
		superTargetButts[i] = createButton('Super Target').mousePressed(() =>
			superTargetOnOff(superTargetButts[i], regions[i]));
		superTargetButts[i].style('background-color', 'cyan');
		superTargetButts[i].parent(divId);
		*/
	}


	//color buttons
	// colorDiv = createDiv('colorButtons');
	for(let i = 0; i < swatches.length; i++){
		let thisCol = swatches[i];
		colorButts[i] = createButton(thisCol).mousePressed(() => colorGrab(thisCol));
		colorButts[i].style('background-color', thisCol);
		colorButts[i].parent('colors');
	}
	/*
	//special buttons
	//Kaiju
	kaijuButt = createButton('KAIJU ACTIVE');
	kaijuButt.parent('kaiju');
	kaijuButt.mousePressed(function(){
		socket.emit('kaiju');
	});
	kaijuOffButt = createButton('KAIJU OFF')
		.parent('kaiju')
		.mousePressed(() => socket.emit('kaiju off'));
	//molemen
	moleButt = createButton('MOLES ACTIVE');
	moleButt.parent('mole');
	moleButt.mousePressed(function(){
		socket.emit('moles');
	});
	molesOffButt = createButton('MOLES OFF')
		.parent('mole')
		.mousePressed(() => socket.emit('moles off'));
	//doomsday device
	doomButt = createButton('DOOMSDAY ACTIVE');
	doomButt.parent('doom');
	doomButt.mousePressed(function(){
		socket.emit('doomsday');
	});
	laserButt = createButton('FIRE ZE LAZA').mousePressed(() =>
		socket.emit('fire laser'));
	laserButt.parent('doom');
	*/
	//superbious
	// antarcButt = createButton('Show Antarctica Region');
	// antarcButt.parent('super');
	// antarcButt.mousePressed(function(){
	// 	regions[14].s = true;
	// 	// socket.emit('superbious');
	// });

	//overall buttons
	mapWipeButt = createButton('MAP RESET')
		.parent('overall')
		.mousePressed(function(){
			for (var i = 0; i < regions.length; i++){
				regColorButts[i].style('background-color', 'gray');
				regIns[i].value('0');
			}
		});
	takeoverButt = createButton('Lets Take Over the World')
		.parent('overall')
		.mousePressed(function(){
			teamLimitIn.value('5');
			teamButts[0].style('background-color', 'OrangeRed');
			teamIns[0].value('Let\'s');
			teamButts[1].style('background-color', 'Yellow');
			teamIns[1].value('Take');
			teamButts[2].style('background-color', 'Lime');
			teamIns[2].value('Over');
			teamButts[3].style('background-color', 'Cyan');
			teamIns[3].value('The');
			teamButts[4].style('background-color', 'Magenta');
			teamIns[4].value('World');
		});
	//event buttons
	puffButt = createButton('Show P.U.F.F. Region')
		.parent('events')
		.mousePressed(function(){
			// puffOn = true;
			events.puff = true;
		});
	megavatorButt = createButton('Show Mole Megavator Region')
		.parent('events')
		.mousePressed(function(){
			events.megavator = true;
		});
	gateButt = createButton('Show Moon Gate Region')
		.parent('events')
		.mousePressed(function(){
			events.gate = true;
		});
	antarcButt = createButton('Show Antarctica Region');
		antarcButt.parent('super');
		antarcButt.mousePressed(function(){
			events.antarc = true;
		});

	//NPC Buttons


  // Listen for confirmation of connection
  socket.on('connect', function() {
    console.log("Connected");
  });

	// - - - - - heartbeat
	// socket.on('update', function(data){
	// 	regions = data.r;
	// 	teams = data.t;
	// 	teamLimit = data.l;
	//
	// 	});
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
	//adjustable team inputs
	for (var i = 0; i < teamButts.length; i++){
		teamData[i] = {
			teamNum: i+1,
			name: teamIns[i].elt.value,
			color: teamButts[i].elt.style.backgroundColor
		};
	} //team color Buttons
	//region updates
	/*
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
	*/
	for (var i = 0; i < regions.length; i++){
		regions[i].h = regIns[i].elt.value;
		regions[i].color = regColorButts[i].elt.style.backgroundColor;
	}
	data = {
		r: regions,
		t: teamData,
		l: teamLimit,
		e: events,
		n: npcs
	}
	socket.emit('update', data);
	/*
	if (battleCount >= 2 && !letsBattle){
			socket.emit('battle');
			letsBattle = true;
	}
	*/
}
/*
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
*/
// function superTargetOnOff(butt, reg){
// 	if (butt.elt.style.backgroundColor == 'cyan'){
// 		butt.elt.style.backgroundColor = 'pink';
// 		reg.s = true;
// 	}
// 	else {
// 		butt.elt.style.backgroundColor = 'cyan';
// 		reg.s = false;
// 	}
// }
function colorGrab(colorButt){
	colorBucket = colorButt;
}
