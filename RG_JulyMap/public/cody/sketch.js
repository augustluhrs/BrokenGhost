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

//for map
let mapRegions;
var nAmerica, cAmerica, sAmerica, europe, nAfrica, sAfrica, russia, nearEast,
	pacRim, china, australia;
//NPC images
var mermen, moonmen, molemen, oganaughts, superbious;

//new Buttons and arrays
//regions
let megavatorButt, gateButt, puffButt, antarcButt;
let megavatorOn = false;
let gateOn = false;
let puffOn = false;
let antarcOn = false;
//NPCs
let moleButt, moonButt, merButt, oganButt, superButt;
let moveMole, moveMoon, moveMer, moveOgan, moveSuper;
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
let npcs = [];


function preload(){
	//reg 1-11
	nAmerica = loadImage('../assets/NorthAmerica.png'); //needs Greenland
	cAmerica = loadImage('../assets/CentralAmerica.png');
	sAmerica = loadImage('../assets/SouthAmerica.png');
	europe = loadImage('../assets/Europe.png');
	nAfrica = loadImage('../assets/WestAfrica.png'); //needs East Africa
	sAfrica = loadImage('../assets/SouthAfrica.png');
	russia = loadImage('../assets/Russia.png');
	nearEast = loadImage('../assets/MiddleEast.png'); //needs India
	pacRim = loadImage('../assets/Siberia.png');
	china = loadImage('../assets/China.png');
	australia = loadImage('../assets/Oceania.png');
	// reg 12-15 are event regions (ellipses)

	//font
	font = loadFont('../assets/fonts/Action_Man_Bold_Italic.ttf');

	// event images
	// kaiju = loadImage('../assets/Kaiju.png');
	// doomDevice = loadImage('../assets/Doomsday.png');
	// moles = loadImage('../assets/Moles.png');
	// mermen = loadImage('');
	// moonmen = loadImage('');
	// molemen = loadImage('');
	// oganaughts = loadImage('');
	superbious = loadImage('../assets/Superbious.png');
}

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
	merButt = createButton('Move Mermen')
		.parent('NPCs')
		.style('background-color', 'cyan')
		.mousePressed(function(){
			targetOnOff(merButt);
		});
	moleButt = createButton('Move Molemen')
		.parent('NPCs')
		.style('background-color', 'cyan')
		.mousePressed(function(){
			targetOnOff(moleButt);
		});
	moonButt = createButton('Move Moonmen')
		.parent('NPCs')
		.style('background-color', 'cyan')
		.mousePressed(function(){
			targetOnOff(moonButt);
		});
	oganButt = createButton('Move Oganaughts')
		.parent('NPCs')
		.style('background-color', 'cyan')
		.mousePressed(function(){
			targetOnOff(oganButt);
		});
	superButt = createButton('Move Suberbious')
		.parent('super')
		.style('background-color', 'cyan')
		.mousePressed(function(){
			targetOnOff(superButt);
		});

	moveMer = createCheckbox('show Mermen')
		.parent('NPCs')
		.changed(function(){
			if(moveMer.checked()){
				npcs[0].s = true;
			}
			else{
				npcs[0].s = false;
			}
		});
	moveMole = createCheckbox('show Molemen')
		.parent('NPCs')
		.changed(function(){
			if(moveMole.checked()){
				npcs[1].s = true;
			}
			else{
				npcs[1].s = false;
			}
		});
	moveMoon = createCheckbox('show Moonmen')
		.parent('NPCs')
		.changed(function(){
			if(moveMoon.checked()){
				npcs[2].s = true;
			}
			else{
				npcs[2].s = false;
			}
		});
	moveOgan = createCheckbox('show Oganaughts')
		.parent('NPCs')
		.changed(function(){
			if(moveOgan.checked()){
				npcs[3].s = true;
			}
			else{
				npcs[3].s = false;
			}
		});
	moveSuper = createCheckbox('show Superbious')
		.parent('super')
		.changed(function(){
			if(moveSuper.checked()){
				npcs[4].s = true;
			}
			else{
				npcs[4].s = false;
			}
		});



	// 	checkbox = createCheckbox('label', false);
  // checkbox.changed(myCheckedEvent);

	mapRegions = [ //just for map, region images
		{img: nAmerica, x: 0, y: height/10, w: width/3, h: height/3 },
		{img: cAmerica, x: 11 * width/80, y: 61 * height/160, w: width/5, h: height/4 },
		{img: sAmerica, x: 41 * width/160, y: 46 * height/80, w: width/8, h: height/3 },
		{img: europe, x: 15 * width/40, y: height/12, w: width/5, h: height/3 },
		{img: nAfrica, x: 129 * width/320, y: 68 * height/160, w: 5 * width/40, h: 5 * height/20 },
		{img: sAfrica, x: 78*width/160, y: 101*height/160, w: width/8, h: height/4 },
		{img: russia, x: 11 * width/20, y: height/15, w: width/4, h: height/3 },
		{img: nearEast, x: 90 * width/160, y: 61*height/160, w: 7* width/80, h: 4*height/20 },
		{img: russia, x: 123 * width/160, y: height/9, w: width/4, h: height/3},
		{img: china, x: 27 * width/40, y: 20 * height/60, w: width/6, h: 3* height/10},
		{img: australia, x: 8 * width/10, y: 6* height/10,w: width/4,h: height/3},
		{ex: width/7.36, ey: height/1.39}, //P.U.F.F.
		{ex: width/1.31, ey: height/2.63}, //Mole Megavator
		{ex: width/1.46, ey: height/1.39}, //Moon Gate
		{ex: width/2,  ey: height/1.05, a: false} //Antarctica
	];
	npcs = [
		{img: mermen, x: 0, y: 0, w: 100, h: 100, s: false},
		{img: molemen, x: 0, y: 0, w: 100, h: 100, s: false},
		{img: moonmen, x: 0, y: 0, w: 100, h: 100, s: false},
		{img: oganaughts, x: 0, y: 0, w: 100, h: 100, s: false},
		{img: superbious, x: 0, y: 0, w: 100, h: 100, s: false}
	];
	// npcs = {
	// 	molemen: {img: molemen, x: 0, y: 0, w: 40, h: 40, s: false},
	// 	moonmen: {img: moonmen, x: 0, y: 0, w: 40, h: 40, s: false},
	// 	mermen: {img: mermen, x: 0, y: 0, w: 40, h: 40, s: false},
	// 	oganaughts: {img: oganaughts, x: 0, y: 0, w: 40, h: 40, s: false},
	// 	superbious: {img: superbious, x: 0, y: 0, w: 40, h: 40, s: false}
	// };

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
	background(0);
	//canvas draw
	for (var i = mapRegions.length - 1; i >= 0; i--){
		//map draw
		push();
		fill(regions[i].color);
		tint(regions[i].color);
		strokeWeight(4);
		if (i <= 10){
			image(mapRegions[i].img, mapRegions[i].x, mapRegions[i].y, mapRegions[i].w, mapRegions[i].h);
		}
		else if (i == 11 && events.puff){ //if puff is active
			ellipse(regions[i].ex, regions[i].ey, fortSize, fortSize);
		}
		else if (i == 12 && events.megavator){ //if megavator is active
			ellipse(regions[i].ex, regions[i].ey, fortSize, fortSize);
		}
		else if (i == 13 && events.gate){ //if gate is active
			ellipse(regions[i].ex, regions[i].ey, fortSize, fortSize);
		}
		else if (i == 14 && events.antarc){ //antarctica
			ellipse(regions[i].ex, regions[i].ey, antFortWidth, antFortHeight);
		}
		pop();
	}
	//NPC draw
	for (var i = npcs.length - 1; i >= 0; i--){
		if (npcs[i].s == true){
			image(npcs[i].img, npcs[i].x, npcs[i].y, npcs[i].w, npcs[i].h);
		}
	}
	// no longer object
	// for (var npc in npcs){
	// 	console.log(npc);
	// 	console.log(npcs);
	// 	if (npcs.npc.s == true){
	// 		console.log('draw');
	// 		image(npc.img, npc.x, npc.y, npc.w, npc.h);
	// 	}
	// 	else{
	// 		console.log(npcs.npc.h)
	// 	}
	// }

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
	}
	//update regions array
	for (var i = 0; i < regions.length; i++){
		regions[i].h = regIns[i].elt.value;
		regions[i].color = regColorButts[i].elt.style.backgroundColor;
	}
	//need to normalize npc x/ys
	let normNpcs = [
		{x: (width/npcs[0].x), y: (height/npcs[0].y), s: npcs[0].s},
		{x: (width/npcs[1].x), y: (height/npcs[1].y), s: npcs[1].s},
		{x: (width/npcs[2].x), y: (height/npcs[2].y), s: npcs[2].s},
		{x: (width/npcs[3].x), y: (height/npcs[3].y), s: npcs[3].s},
		{x: (width/npcs[4].x), y: (height/npcs[4].y), s: npcs[4].s}
	]
	//send full status to server/map
	data = {
		r: regions,
		t: teamData,
		l: teamLimit,
		e: events,
		n: normNpcs
	}
	socket.emit('update', data);
}

function mouseDragged(){
	if (merButt.elt.style.backgroundColor == 'green'){
		npcs[0].x = mouseX;
		npcs[0].y = mouseY;
	}
	if (moleButt.elt.style.backgroundColor == 'green'){
		npcs[1].x = mouseX;
		npcs[1].y = mouseY;
	}
	if (moonButt.elt.style.backgroundColor == 'green'){
		npcs[2].x = mouseX;
		npcs[2].y = mouseY;
	}
	if (oganButt.elt.style.backgroundColor == 'green'){
		npcs[3].x = mouseX;
		npcs[3].y = mouseY;
	}
	if (superButt.elt.style.backgroundColor == 'green'){
		npcs[4].x = mouseX;
		npcs[4].y = mouseY;
	}
}

function targetOnOff(b){
	if (b.elt.style.backgroundColor == 'cyan'){
		b.elt.style.backgroundColor = 'green';
	}
	else {
		b.elt.style.backgroundColor = 'cyan';
	}
}

function colorGrab(colorButt){
	colorBucket = colorButt;
}
