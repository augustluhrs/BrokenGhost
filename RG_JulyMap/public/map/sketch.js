// Battle Map Screen to be Projected or Displayed on Players' Phones
// by August Luhrs Feb. 2019
// assets from Arnab Chakravarty
// updates July 2019

// Open and connect socket
let socket = io('/map');

//i img variables
var reg1, reg2, reg3, reg4, reg5, reg6, reg7, reg8,
	reg9, reg10, reg11, reg12, reg13, reg14, reg15, reg16;
var nAmerica, cAmerica, sAmerica, europe, nAfrica, sAfrica, russia, nearEast,
	pacRim, china, australia;

//rando variables
let canvas;
var regions = [];
var teams = [];
var teamLimit;
var refresh;
// var fortSize = 150; //size of fortress ellipses
var fortSize; //size of fortress ellipses
var antFortWidth; //size of antarctica ellipse
var antFortHeight; //size of antarctica ellipse
var startCol;
var hench = [];
var henchBox; // w and h of the henchmen boxes
var henchText; //textSize of henchmen count
var regText; //Size of reg name
let font;
// let kaiju;
// let timerOn = false;
// let startMillis, elapsed, clock, clockSec, clockMin, clockHour;
// let timeElapsed; //from server
// let letsBattle = false;
// let jitterX, jitterY;
// let jitterSpeed = 5;
// let kaijuOn = false;
// let noTarget = true;
// let molesOn = false;
// let moleArmy = [];
// let moleCount = 100;
// let moleHill;
// let moleColors = [
// 	[244, 164, 96],
// 	[205, 133, 63],
// 	[210, 105, 30],
// 	[139, 69, 19],
// 	[160, 82, 45],
// 	[165, 42, 42]
// ];
// let firstMoles;
// let doomOn = false;
// let laserOn = false;
// let laserReset = 0;
let superOn = false;
// let superFlyIn = false;
// let superFlyCount = 0;
// let superTarget;

/*
class Mole {
	constructor(region){
		this.x = int(region.x);
		this.y = int(region.y);
		this.diameter = random(2,5);
		// this.speedX = int(random(-3, 3));
		// this.speedY = int(random(-3, 3));
		this.speedX = random(-3, 3);
		this.speedY = random(-3, 3);
		// this.stutterX = int(random(-this.speedX, this.speedX));
		// this.stutterY = int(random(-this.speedY, this.speedY));
		this.c = random(moleColors);
	}

	move(){
		// if (this.x % 4 == 0){
		// 	this.x += this.speedX + this.stutterX;
		// 	this.y += this.speedY;
		// }
		// else if (this.x % 6 == 0){
		// 	this.x += this.speedX;
		// 	this.y += this.speedY + this.stutterY;
		// }
		// else{
			this.x += this.speedX;
			this.y += this.speedY;
		// }
	}

	display(){
		noStroke();
		fill(this.c[0], this.c[1], this.c[2]);
		ellipse(this.x, this.y, this.diameter, this.diameter);
	}
}
*/

function preload(){
	// reg1 = loadImage('../assets/NorthAmerica.png');
	// reg2 = loadImage('../assets/CentralAmerica.png');
	// reg3 = loadImage('../assets/SouthAmerica.png');
	// reg4 = loadImage('../assets/Greenland.png');
	// reg5 = loadImage('../assets/Europe.png');
	// reg6 = loadImage('../assets/WestAfrica.png');
	// reg7 = loadImage('../assets/SouthAfrica.png');
	// reg8 = loadImage('../assets/EastAfrica.png');
	// reg9 = loadImage('../assets/Russia.png');
	// reg10 = loadImage('../assets/MiddleEast.png');
	// reg11 = loadImage('../assets/India.png');
	// reg12 = loadImage('../assets/Siberia.png');
	// reg13 = loadImage('../assets/China.png');
	// reg14 = loadImage('../assets/Oceania.png');

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
	// reg 12-15 are event regions

	//font
	font = loadFont('../assets/fonts/Action_Man_Bold_Italic.ttf');

	// event images
	// kaiju = loadImage('../assets/Kaiju.png');
	// doomDevice = loadImage('../assets/Doomsday.png');
	// moles = loadImage('../assets/Moles.png');
	superbious = loadImage('../assets/Superbious.png');
}

function setup(){
  //- - - - - overall
	createCanvas(windowWidth, windowHeight);

	// background(150, 50, 50);
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
		/* //old
		{img: reg1, x: 0, y: height/10, w: width/3, h: height/3 },
		{img: reg2, x: 11 * width/80, y: 61 * height/160, w: width/5, h: height/4 },
		{img: reg3, x: 41 * width/160, y: 46 * height/80, w: width/8, h: height/3 },
		{img: reg4, x: width/5, y: 0, w: width/4, h: height/4 },
		{img: reg5, x: 15 * width/40, y: height/12, w: width/5, h: height/3 },
		{img: reg6, x: 129 * width/320, y: 68 * height/160, w: 5 * width/40, h: 5 * height/20 },
		{img: reg7, x: 78*width/160, y: 101*height/160, w: width/8, h: height/4 },
		{img: reg8, x: 10 * width/20, y: 7 * height/16, w: 5 * width/40, h: 5 * height/20 },
		{img: reg9, x: 11 * width/20, y: height/15, w: width/4, h: height/3 },
		{img: reg10, x: 90 * width/160, y: 61*height/160, w: 7* width/80, h: 4*height/20 },
		{img: reg11, x: 51 * width/80, y: 31 * height/80, w:width/9, h: 5* height/20 },
		{img: reg12, x: 123 * width/160, y: height/9, w: width/4, h: height/3},
		{img: reg13, x: 27 * width/40, y: 20 * height/60, w: width/6, h: 3* height/10},
		{img: reg14, x: 8 * width/10, y: 6* height/10,w: width/4,h: height/3},
		{ex: width/1.39, ey: height/1.21},
		{ex: width/10.85, ey: height/1.37},
		{ex: width/2.44,  ey: height/1.18, a: false} //Antarctica
		*/ //new
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
		{ex: width/1.46, ey: height/1.39}, //Moon Gate
		{ex: width/1.31, ey: height/2.63}, //Mole Megavator
		{ex: width/2,  ey: height/1.06, a: false} //Antarctica
		// {ex: width/2.44,  ey: height/1.18, a: false} //Antarctica
	];


	hench = [ //number, box, and text
		//should adjust N.A.
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
		{n: '0', c: startCol, r: 'Moon Gate', x: width/ 1.46, y: height/ 1.39},
		{n: '0', c: startCol, r: 'Mole Megavator', x: width/ 1.31, y: height/ 2.63},
		{n: 'S', c: startCol, r: 'Antarctica', x: width/2, y: height/1.05}
		// {n: 'S', c: startCol, r: 'Antarctica', x: width/2.45, y: height/1.15}
	];

	socket.emit('refresh');

  // Listen for confirmation of connection
  socket.on('connect', function() {
    console.log("Connected");
		socket.emit('refresh');
		redraw();
  });

	// socket.on('timerStart', function(){
	// 	timerOn = true;
	// 	startMillis = millis();
	// })

	// - - - - - heartbeat
	socket.on('update',
		function(data){
			// regions = data.r; //don't uncomment this
			teams = data.t;
			teamLimit = int(data.l);
			// timeElapsed = data.m;
			// if (timeElapsed > 1){
			// 	timerOn = true;
			// }
			// else {
			// 	timerOn = false;
			// }

			for (var i = 0; i < hench.length; i++){
				// let fillCol = color(regions[i].color);
				hench[i].c = color(data.r[i].color);
				hench[i].n = data.r[i].h;
				hench[i].b = data.r[i].b;
				hench[i].t = data.r[i].t;
				hench[i].s = data.r[i].s;
			}
		});
/*
	socket.on('battle', function(){
		console.log('Battle between:');
		letsBattle = true;
	});

	socket.on('battle over', function(){
		console.log('Battle Over');
		letsBattle = false;
	});

	socket.on('kaiju', function(){
		kaijuOn = true;
	});

	socket.on('kaiju off', function(){
		kaijuOn = false;
	});

	socket.on('moles', function(){
		molesOn = true;
		firstMoles = true;
		molesOut = false;
	});

	socket.on('moles off', function(){
		molesOn = false;
		// firstMoles = true;
		// molesOut = false;
	});

	socket.on('doomsday', function(){
		doomOn = true;
	});
	socket.on('fire laser', function(){
		laserOn = true;
		console.log('firing laser');
	});
	*/

	socket.on('superbious', function(){
		superOn = true;
		// superFlyIn = true;
	});

}

function draw(){
	background(0);
	// if (!letsBattle){
	for (var i = hench.length - 1; i >= 0; i--){
		//map draw
		fill(hench[i].c);
		tint(hench[i].c);
		// if (i != 14 && i != 15 && i != 16){
		if (i <= 10){
			image(regions[i].img, regions[i].x, regions[i].y, regions[i].w, regions[i].h);
		}
		else if (i > 10 && i < 14){ //event regions for 3 non-antarc
			ellipse(regions[i].ex, regions[i].ey, fortSize, fortSize);
		}
		else if (superOn){ //antarctica
			ellipse(regions[i].ex, regions[i].ey, antFortWidth, antFortHeight);
		}
		strokeWeight(4);
		if (i != 14){
			rect(hench[i].x, hench[i].y, henchBox, henchBox);
		}
		else if (superOn){
			rect(hench[i].x, hench[i].y, henchBox, henchBox);
		}
	}
	// }
	/*
	//jitter the battlers
	else { //fade all but fighting and jitter
		for (var i = hench.length - 1; i >= 0; i--){ //switched to fix M. East text and allow for Antarctica add
			if (hench[i].b == true){ //highlight and jitter
				let jitterX = random((jitterSpeed * -1), jitterSpeed);
				let jitterY = random((jitterSpeed * -1), jitterSpeed);

				//map draw
				fill(hench[i].c);
				tint(hench[i].c);
				if (i != 14 && i != 15 && i != 16){
					image(regions[i].img, regions[i].x + jitterX, regions[i].y + jitterY, regions[i].w + jitterX, regions[i].h + jitterY);
				}
				else if (i == 14 || i == 15){
					ellipse(regions[i].ex + jitterX, regions[i].ey + jitterY, fortSize + jitterX, fortSize + jitterY);
				}
				else if (superOn){
					ellipse(regions[i].ex + jitterX, regions[i].ey + jitterY, fortSize + jitterX, fortSize + jitterY);
				}
				strokeWeight(4);
				if (i != 16){
					rect(hench[i].x, hench[i].y, henchBox, henchBox);
				}
				else if (superOn){
					rect(hench[i].x, hench[i].y, henchBox, henchBox);
				}
			}
			else{ //fade
				//map draw
				// let fadeCol = hench[i].c;
				// fadeCol.setAlpha(50);
				fill(hench[i].c);
				tint(hench[i].c);
				if (i != 14 && i != 15 && i != 16){
					image(regions[i].img, regions[i].x, regions[i].y, regions[i].w, regions[i].h);
				}
				else if (i == 14 || i == 15){
					ellipse(regions[i].ex, regions[i].ey, fortSize, fortSize);
				}
				else if (superOn){
					ellipse(regions[i].ex, regions[i].ey, fortSize, fortSize);
				}
				strokeWeight(4);
				if (i != 16){
					rect(hench[i].x, hench[i].y, henchBox, henchBox);
				}
				else if (superOn){
					rect(hench[i].x, hench[i].y, henchBox, henchBox);
				}
			}
		}
	}
	*/
	//region and hench text
	stroke(0);
	fill(255);
	textSize(regText);
	for (var i = hench.length - 1; i >= 0; i--){
		if (i != 14){
			text(hench[i].r, hench[i].x, hench[i].y - henchBox/2 - 20);
			textSize(henchText);
			text(hench[i].n, hench[i].x, hench[i].y + henchBox/4);
		}
		else if (superOn){ //so only shows Antarctica when Superb out
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
		// if (i % 2 == 0){
		// 	text(teams[i].name, (i + 1) * windowWidth/(teamLimit + 1) , height - height/18)
		// }
		// else{
		// 	text(teams[i].name, (i + 1) * windowWidth/(teamLimit + 1) , height - height/54)
		// }
	}
	// if (timerOn){ //time elapsed since start of game
	// 	textSize(width/25);
	// 	// elapsed = millis() - startMillis;
	// 	clock = int(timeElapsed / 1000);
  //   clockMin = int(clock / 60) - (clockHour * 60);
  //   clockSec = int(clock % 60);
  //   clockHour = int(clock / 3600);
  //   strokeWeight(4);
  //   stroke(0);
  //   fill(255);
  //   if (clockSec < 10 && clockMin <10){
  //     text(clockHour + ":0" + clockMin + ":0" + clockSec, 18 * width/20, height/10);
  //   }
  //   else if(clockSec < 10){
  //     text(clockHour + ":" + clockMin + ":0" + clockSec, 18 * width/20, height/10);
  //   }
  //   else if(clockMin < 10){
  //     text(clockHour + ":0" + clockMin + ":" + clockSec, 18 * width/20, height/10);
  //   }
  //   else text(clockHour + ":" + clockMin + ":" + clockSec, 18 * width/20, height/10);
	// }
	nodeLines(); //map connections
	/*
	if (kaijuOn) { //kaiju shows up on target regions
		push();
		tint(240, 240, 240);
		noTarget = true;
		for (var i = hench.length - 1; i >= 0; i--){
			if (hench[i].t == true){
				push();
				imageMode(CENTER);
				image(kaiju, hench[i].x + (width/72), hench[i].y + (height/108), width/8, height/5);
				pop();
				noTarget = false;
			}
		}
		if(noTarget){
			image(kaiju, width/1.16 + (width/72), height/2.67 + (height/108), width/8, height/5);
		}
		pop();
	}
	if(molesOn){ //moles pop out of target region, 100 per click
		push();
		tint(240, 240, 240);
		image(moles, width/3.6, height/2.9, width/7, height/7);
		pop();
		push();
		if (firstMoles){
			for (var i = hench.length - 1; i >= 0; i--){
				if (hench[i].t == true){
					moleHill = hench[i];
				}
			}
			for (let i = 0; i < moleCount; i++){
				moleArmy.push(new Mole(moleHill));
			}
			firstMoles = false;
		}
		// else if(!molesOut){
		// 	if (moleArmy.length >= 1000){
		// 		molesOut = true;
		// 	}
 		// 	else if (moleArmy.length % 95 == 0){
		// 		for (let i = 0; i < moleCount; i++){
		// 			moleArmy.push(new Mole(moleHill));
		// 		}
		// 	}
		// }
		for (let i = moleArmy.length - 1; i >= 0; i--){
			moleArmy[i].move();
			moleArmy[i].display();
			if (moleArmy[i].x > width || moleArmy[i].x < 0 || moleArmy[i].y > height || moleArmy[i].y < 0){
				moleArmy.splice(i, 1);
			}
		}
		pop();
	}
	if(doomOn){ //laser shows up and fires on target regions
		push();
		tint(240, 240, 240);
		image(doomDevice, 0, 0, width/7, height/8);
			if (laserOn){
				stroke(0, 255, 0);
				strokeWeight(7);
				laserReset = 0;
				for (var i = hench.length - 1; i >= 0; i--){
					if (hench[i].t == true){
						line(width/11.2, height/15.88, hench[i].x, hench[i].y);
						laserReset++;
					}
				}
				if (laserReset == 0){
					laserOn = false;
				}
			}
		pop();

	}
	*/
	if(superOn){
		push();
		tint(240, 240, 240);
		// if (superFlyIn){ // for future animation?
		// 	if (superFlyCount < 100){
		// 		superFlyCount++;
		// 	}
		// 	else {
		// 		superFlyIn = false;
		// 	}
		// }
		// else{
		for (var i = hench.length - 1; i >= 0; i --){
			if (hench[i].s == true){
				push();
				imageMode(CENTER);
				//need to make this click and draggable
				image(superbious, hench[i].x + (width/72), hench[i].y + (height/108), width/6, height/6);
			 	pop();
			}
		}
		// }
		pop();
	}
}

function mousePressed(){ //just for positioning
	console.log(width/mouseX, height/mouseY);
}

function nodeLines(){	//connecting node lines
	push();
	strokeWeight(10);
	stroke(255);
	// filter(BLUR, 4); //blur effect
	// line(width/3.53 , height/3.45, width/3.20, height/ 5.16); //N.America --> Greenland
	line(width/29.23 , height/4.54, 0, height/ 4.54); // N. America --> Siberia
	line(width/10.83, height/3.86, width/8.43, height/1.58); // N.America --> P.U.F.F.
	line(width/3.62 , height/1.19, width/6.08, height/ 1.31); // South America --> PUFF
	line(width/ 2.76, height/1.56, width/2.2, height/ 1.64); // South America --> West Africa
	line(width/ 3.51, height/3.45, width/2.46, height/3.11 ); // N. Amer --> Europe
	// line(width/ 2.09, height/2.54, width/2.15, height/2.21 ); // Europe --> West Africa
	line(width/2.02 , height/2.54, width/1.9, height/ 2.08); // Europe --> East Africa
	line(width/ 1.67, height/1.29, width/1.51, height/ 1.295); // South Africa --> Moon
	line(width/ 1.05, height/3.93, width, height/ 3.93); // Siberia --> N. America
	line(width/ 1.06 , height/2.78, width/1.01, height/ 1.92); // Siberia --> PUFF
	line(width/ 1.27, height/1.67, width/1.16, height/1.39 ); // China --> Oceania
	line(width/ 1.05, height/1.2, width, height/ 1.26); // Oceania --> PUFF (right edge)
	line(width/ 1.15, height/1.19, width/1.39, height/1.31 ); // Oceania --> UN Air
	line(0 , height/ 1.26, width/ 9.33, height/ 1.30 ); // Oceania (left edge) --> PUFF
	line(0 , height/ 1.92, width/ 10.23, height/ 1.44); // Siberia (left edge) --> PUFF
	line(width/ 1.59, height/ 1.82, width/ 1.51, height/ 1.56 ); // UN Air --> India
	pop();
}
