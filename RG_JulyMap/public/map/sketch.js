// Battle Map Screen to be Projected or Displayed on Players' Phones
// by August Luhrs Feb. 2019
// assets from Arnab Chakravarty
// updates July 2019

// Open and connect socket
let socket = io('/map');

//img variables
var nAmerica, cAmerica, sAmerica, europe, nAfrica, sAfrica, russia, nearEast,
	pacRim, china, australia;
// var kaiju, stella;
var mermen, moonmen, molemen, oganaughts, superbious;

//rando variables
let canvas;
var regions = [];
var teams = [];
var teamLimit;
var events = {};
var npcs = {};

var fortSize; //size of fortress ellipses
var antFortWidth; //size of antarctica ellipse
var antFortHeight; //size of antarctica ellipse
var startCol;
var hench = [];
var henchBox; // w and h of the henchmen boxes
var henchText; //textSize of henchmen count
var regText; //Size of reg name
let font;

//Buttons
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
  //- - - - - overall
	createCanvas(windowWidth, windowHeight);
	background(0);
	textFont(font);
	textAlign(CENTER);
	rectMode(CENTER);
	henchBox = width/32; // w and h of the henchmen boxes
	henchText = width/45; //textSize of henchmen count
	regText = width/45;
	startCol = color(150,150, 175,195);
  fortSize	= width/11.19;
	antFortWidth = 3 * width/4;
	antFortHeight = height/15;

	regions = [ //just for map, region images
 		//new
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
		{ex: width/2,  ey: height/1.05, a: false} //Antarctica, a is vestigal
	];

	hench = [ //number, box, and text
		{n: '0', c: startCol, r: 'North America', x: width/5.75 , y: height/4.07},
		{n: '0', c: startCol, r: 'Central America', x: width/3.77, y: height/1.91},
		{n: '0', c: startCol, r: 'South America', x: width/3.1, y: height/1.35},
		// {n: '0', c: startCol, r: 'Greenland', x: width/ 2.69, y: height/ 6.21},
		{n: '0', c: startCol, r: 'Europe', x: width/2.19 , y: height/ 2.89 },
		{n: '0', c: startCol, r: 'North Africa', x: width/ 2.33 , y: height/ 1.81 },
		// {n: '0', c: startCol, r: 'West Africa', x: width/ 2.33 , y: height/ 1.81 },
		{n: '0', c: startCol, r: 'South Africa', x: width/ 1.95, y: height/ 1.29},
		// {n: '0', c: startCol, r: 'East Africa', x: width/ 1.64 , y: height/ 1.49},
		{n: '0', c: startCol, r: 'Russia', x: width/ 1.625 , y: height/ 4.07 },
		{n: '0', c: startCol, r: 'Near East', x: width/ 1.55, y: height/ 2.18 },
		// {n: '0', c: startCol, r: 'Middle East', x: width/ 1.72, y: height/ 2.08 },
		// {n: '0', c: startCol, r: 'India', x: width/ 1.45, y: height/ 1.72},
		{n: '0', c: startCol, r: 'Pacific Rim', x: width/ 1.12, y: height/ 3.93 },
		// {n: '0', c: startCol, r: 'Siberia', x: width/ 1.12, y: height/ 3.45 },
		{n: '0', c: startCol, r: 'China', x: width/ 1.26, y: height/ 1.85},
		{n: '0', c: startCol, r: 'Australia', x: width/ 1.08, y: height/ 1.35},
		// {n: '0', c: startCol, r: 'Oceania', x: width/ 1.11, y: height/ 1.17},
		// {n: '0', c: startCol, r: 'UN Air Fortress', x: width/ 1.39, y: height/ 1.21},
		{n: '0', c: startCol, r: 'P. U. F. F.', x: width/ 7.36, y: height/ 1.39}, // Pacific Underwater Freedom Fortress
		{n: '0', c: startCol, r: 'Mole Megavator', x: width/ 1.31, y: height/ 2.63},
		{n: '0', c: startCol, r: 'Moon Gate', x: width/ 1.46, y: height/ 1.39},
		{n: 'S', c: startCol, r: 'Antarctica', x: width/2, y: height/1.05}
	];

	events = { //this is redundant, but w/e
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

	npcs = [ //had to change from object to array
		{img: mermen, x: 0, y: 0, w: 100, h: 100, s: false},
		{img: molemen, x: 0, y: 0, w: 100, h: 100, s: false},
		{img: moonmen, x: 0, y: 0, w: 100, h: 100, s: false},
		{img: oganaughts, x: 0, y: 0, w: 100, h: 100, s: false},
		{img: superbious, x: 0, y: 0, w: 100, h: 100, s: false}
	];

	socket.emit('refresh');

  // Listen for confirmation of connection
  socket.on('connect', function() {
    console.log("Connected");
		socket.emit('refresh');
		redraw();
  });

	// - - - - - heartbeat
	socket.on('update',
		function(data){
			// regions = data.r; //don't uncomment this
			teams = data.t;
			teamLimit = int(data.l);
			events = data.e;
			let normNpcs = data.n;
			//update NPC locations/show, normalized w and h
			for (var i = 0; i < npcs.length; i++){
				npcs[i].x = width/normNpcs[i].x;
				npcs[i].y = height/normNpcs[i].y;
				npcs[i].s = normNpcs[i].s;
			}
			// update region data
			for (var i = 0; i < hench.length; i++){
				// let fillCol = color(regions[i].color);
				hench[i].c = color(data.r[i].color);
				hench[i].n = data.r[i].h;
				hench[i].b = data.r[i].b;
				hench[i].t = data.r[i].t;
				hench[i].s = data.r[i].s;
			}
		});

}

function draw(){
	background(0);
	for (var i = hench.length - 1; i >= 0; i--){
		//map draw
		push();
		fill(hench[i].c);
		tint(hench[i].c);
		strokeWeight(4);
		if (i <= 10){
			image(regions[i].img, regions[i].x, regions[i].y, regions[i].w, regions[i].h);
			rect(hench[i].x, hench[i].y, henchBox, henchBox);
		}
		else if (i == 11 && events.puff){ //if puff is active
			ellipse(regions[i].ex, regions[i].ey, fortSize, fortSize);
			rect(hench[i].x, hench[i].y, henchBox, henchBox);
		}
		else if (i == 12 && events.megavator){ //if megavator is active
			ellipse(regions[i].ex, regions[i].ey, fortSize, fortSize);
			rect(hench[i].x, hench[i].y, henchBox, henchBox);
		}
		else if (i == 13 && events.gate){ //if gate is active
			ellipse(regions[i].ex, regions[i].ey, fortSize, fortSize);
			rect(hench[i].x, hench[i].y, henchBox, henchBox);
		}
		else if (i == 14 && events.antarc){ //antarctica
			ellipse(regions[i].ex, regions[i].ey, antFortWidth, antFortHeight);
			rect(hench[i].x, hench[i].y, henchBox, henchBox);
		}
		pop();
	}
	//region and hench text
	stroke(0);
	fill(255);
	textSize(regText);
	for (var i = hench.length - 1; i >= 0; i--){
		if (i <= 10){
			text(hench[i].r, hench[i].x, hench[i].y - henchBox/2 - 20);
			textSize(henchText);
			text(hench[i].n, hench[i].x, hench[i].y + henchBox/4);
		}
		else if (i == 11 && events.puff){ //if puff is active
			text(hench[i].r, hench[i].x, hench[i].y - henchBox/2 - 20);
			textSize(henchText);
			text(hench[i].n, hench[i].x, hench[i].y + henchBox/4);
		}
		else if (i == 12 && events.megavator){ //if megavator is active
			text(hench[i].r, hench[i].x, hench[i].y - henchBox/2 - 20);
			textSize(henchText);
			text(hench[i].n, hench[i].x, hench[i].y + henchBox/4);
		}
		else if (i == 13 && events.gate){ //if gate is active
			text(hench[i].r, hench[i].x, hench[i].y - henchBox/2 - 20);
			textSize(henchText);
			text(hench[i].n, hench[i].x, hench[i].y + henchBox/4);
		}
		else if (i == 14 && events.antarc){ //so only shows Antarctica when Superb out
			text(hench[i].r, hench[i].x, hench[i].y - henchBox/2 - 20);
			textSize(henchText);
			text(hench[i].n, hench[i].x, hench[i].y + henchBox/4);
		}
	}
	//team draw
	for (var i = 0; i < teamLimit; i++){ //team names
		let fillCol = color(teams[i].color);
		stroke(0);
		fill(fillCol);
		textSize(width/(35 + teams[i].name.length)); //team size text scaling
		//two rows of team names, offset
		if (i % 2 == 0){
			text(teams[i].name, (i + 1) * windowWidth/(teamLimit + 1) , height/18)
		}
		else{
			text(teams[i].name, (i + 1) * windowWidth/(teamLimit + 1) , height/9)
		}
	}
	nodeLines(); //map connections
	//NPC draw
	for (var i = npcs.length - 1; i >= 0; i--){
		if (npcs[i].s == true){
			image(npcs[i].img, npcs[i].x, npcs[i].y, npcs[i].w, npcs[i].h);
		}
	}
}

function mousePressed(){ //just for positioning
	console.log(width/mouseX, height/mouseY);
}

function nodeLines(){	//connecting node lines
	push();
	strokeWeight(10);
	stroke(255);
	line(width/29.23 , height/4.54, 0, height/ 4.54); // N. America --> Siberia
	line(width/ 2.76, height/1.56, width/2.2, height/ 1.64); // South America --> West Africa
	line(width/ 3.51, height/3.45, width/2.46, height/3.11 ); // N. Amer --> Europe
	// line(width/ 2.09, height/2.54, width/2.15, height/2.21 ); // Europe --> West Africa
	line(width/2.02 , height/2.54, width/1.9, height/ 2.08); // Europe --> East Africa
	line(width/ 1.05, height/3.93, width, height/ 3.93); // Siberia --> N. America
	line(width/ 1.27, height/1.67, width/1.16, height/1.39 ); // China --> Oceania
	if (events.puff){
		line(width/10.83, height/3.86, width/8.43, height/1.58); // N.America --> P.U.F.F.
		line(width/3.62 , height/1.19, width/6.08, height/ 1.31); // South America --> PUFF
		line(width/ 1.06 , height/2.78, width/1.01, height/ 1.92); // Siberia --> PUFF
		line(width/ 1.05, height/1.2, width, height/ 1.26); // Oceania --> PUFF (right edge)
		line(0 , height/ 1.26, width/ 9.33, height/ 1.30 ); // Oceania (left edge) --> PUFF
		line(0 , height/ 1.92, width/ 10.23, height/ 1.44); // Siberia (left edge) --> PUFF
	}
	// if (megavatorOn){ } //no nodes
	if (events.gate){
		line(width/ 1.67, height/1.29, width/1.51, height/ 1.295); // South Africa --> Moon
		line(width/ 1.15, height/1.19, width/1.39, height/1.31 ); // Oceania --> Moon Gate
		line(width/ 1.59, height/ 1.82, width/ 1.51, height/ 1.56 ); // Moon Gate --> India
	}
	pop();
}
