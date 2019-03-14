// Battle Map Screen to be Projected or Displayed on Players' Phones
// by August Luhrs Feb. 2019
// assets from Arnab Chakravarty


// Open and connect socket
let socket = io('/screen');

//rando variables
// let canvas;
var regions = [];
var teams = [];
var teamLimit;
var refresh;
var reg1, reg2, reg3, reg4, reg5, reg6, reg7, reg8,
	reg9, reg10, reg11, reg12, reg13, reg14, reg15, reg16;
var fortSize = 150; //size of fortress ellipses
var startCol;
var hench = [];
var henchBox; // w and h of the henchmen boxes
var henchText; //textSize of henchmen count
var regText; //Size of reg name
let font;
let kaiju;
let test = 0;
let timerOn = false;
let startMillis, elapsed, clock, clockSec, clockMin, clockHour;
let timeElapsed; //from server
let letsBattle = false;
let jitterX, jitterY;
let jitterSpeed = 5;
let kaijuOn = false;
let noTarget = true;
let molesOn = false;
let moleArmy = [];
let moleCount = 100;
let moleHill;
let moleColors = [
	[244, 164, 96],
	[205, 133, 63],
	[210, 105, 30],
	[139, 69, 19],
	[160, 82, 45],
	[165, 42, 42]
];
let firstMoles;
let doomOn = false;
let laserOn = false;
let laserReset = 0;
let superOn = false;
let superFlyIn = false;
let superFlyCount = 0;
// let superTarget;


function preload(){
	font = loadFont('../assets/fonts/Action_Man_Bold_Italic.ttf');
}

function setup(){
	noCanvas();
	// textFont(font);
	// textAlign(CENTER);
	// regText = width/45;
	startCol = color(150,150, 175,195);

	regions = [ //just for map
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
	];

	hench = [
		{n: '0', own: 'no one', c: startCol, r: 'North America', x: width/5.8 , y: height/3.5},
		{n: '0', own: 'no one', c: startCol, r: 'Central America', x: width/5.4, y: height/1.91},
		{n: '0', own: 'no one', c: startCol, r: 'South America', x: width/3.61, y: height/1.37},
		{n: '0', own: 'no one', c: startCol, r: 'Greenland', x: width/ 2.69, y: height/ 6.21},
		{n: '0',own: 'no one', c: startCol, r: 'Europe', x: width/2.19 , y: height/ 2.89 },
		{n: '0', own: 'no one', c: startCol, r: 'West Africa', x: width/ 2.33 , y: height/ 1.81 },
		{n: '0', own: 'no one',c: startCol, r: 'South Africa', x: width/ 1.95, y: height/ 1.29},
		{n: '0', own: 'no one',c: startCol, r: 'East Africa', x: width/ 1.64 , y: height/ 1.49},
		{n: '0', own: 'no one',c: startCol, r: 'Russia', x: width/ 1.58 , y: height/ 3.86 },
		{n: '0', own: 'no one',c: startCol, r: 'Middle East', x: width/ 1.72, y: height/ 2.08 },
		{n: '0', own: 'no one',c: startCol, r: 'India', x: width/ 1.45, y: height/ 1.72},
		{n: '0', own: 'no one',c: startCol, r: 'Siberia', x: width/ 1.12, y: height/ 3.45 },
		{n: '0', own: 'no one',c: startCol, r: 'China', x: width/ 1.31, y: height/ 2.24 },
		{n: '0', own: 'no one',c: startCol, r: 'Oceania', x: width/ 1.11, y: height/ 1.17},
		{n: '0', own: 'no one',c: startCol, r: 'UN Air Fortress', x: width/ 1.39, y: height/ 1.21},
		{n: '0', own: 'no one',c: startCol, r: 'P. U. F. F.', x: width/ 10.85, y: height/ 1.37}, // Pacific Underwater Freedom Fortress
		{n: 'S', own: 'no one',c: startCol, r: 'Antarctica', x: width/2.45, y: height/1.15}
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
			timeElapsed = data.m;
			if (timeElapsed > 1){
				timerOn = true;
			}
			else {
				timerOn = false;
			}

			for (var i = 0; i < hench.length; i++){
				// let fillCol = color(regions[i].color);
				// hench[i].c = color(data.r[i].color);
				hench[i].c = data.r[i].color;
				hench[i].n = data.r[i].h;
				hench[i].b = data.r[i].b;
				hench[i].t = data.r[i].t;
				hench[i].s = data.r[i].s;
				for (var j = teams.length -1; j >=0; j--){
					if (hench[i].c == teams[j].color){
						hench[i].own = teams[j].name;
					}
				}
			}
		});

	// socket.on('battle', function(){
	// 	console.log('Battle between:');
	// 	letsBattle = true;
	// });
	//
	// socket.on('battle over', function(){
	// 	console.log('Battle Over');
	// 	letsBattle = false;
	// });

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
	socket.on('superbious', function(){
		superOn = true;
		superFlyIn = true;
		// regionPs[16] = createP('');
	});

	regionPs = [];
	for (var i = 0; i < hench.length; i++){
		if (i != 16){
			regionPs[i] = createP(hench[i].r + ": " + hench[i].n + ' henchmen from ' + hench[i].own);
		}
		else {
			regionPs[i] = createP('');
		}
		regionPs[i].hide();
	}
}

function draw(){

	if (superOn){
		for (var i = hench.length - 1; i >= 0; i--){
			regionPs[i].remove();
		}
		for (var i = 0; i < hench.length ; i++){
			// regionPs[i].remove();
			regionPs[i] = createP(hench[i].r + ": " + hench[i].n + ' henchmen from ' + hench[i].own);
		}
	}
	else {
		for (var i = hench.length - 2; i >= 0; i--){
			regionPs[i].remove();
		}
		for (var i = 0; i < hench.length - 1; i++){
			// regionPs[i].remove();
			regionPs[i] = createP(hench[i].r + ": " + hench[i].n + ' henchmen from ' + hench[i].own);
		}
	}

	/*
	//region and hench text|
	stroke(0);
	fill(255);
	textSize(regText);
	for (var i = hench.length - 1; i >= 0; i--){
		if (i != 16){
			text(hench[i].r, hench[i].x, hench[i].y - henchBox/2 - 20);
			textSize(henchText);
			text(hench[i].n, hench[i].x, hench[i].y + henchBox/4);
		}
		else if (superOn){
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
			text(teams[i].name, (i + 1) * windowWidth/(teamLimit + 1) , height - height/18)
		}
		else{
			text(teams[i].name, (i + 1) * windowWidth/(teamLimit + 1) , height - height/54)
		}
	}
	if (timerOn){ //time elapsed since start of game
		textSize(width/25);
		// elapsed = millis() - startMillis;
		clock = int(timeElapsed / 1000);
    clockMin = int(clock / 60) - (clockHour * 60);
    clockSec = int(clock % 60);
    clockHour = int(clock / 3600);
    strokeWeight(4);
    stroke(0);
    fill(255);
    if (clockSec < 10 && clockMin <10){
      text(clockHour + ":0" + clockMin + ":0" + clockSec, 18 * width/20, height/10);
    }
    else if(clockSec < 10){
      text(clockHour + ":" + clockMin + ":0" + clockSec, 18 * width/20, height/10);
    }
    else if(clockMin < 10){
      text(clockHour + ":0" + clockMin + ":" + clockSec, 18 * width/20, height/10);
    }
    else text(clockHour + ":" + clockMin + ":" + clockSec, 18 * width/20, height/10);
	}
	nodeLines(); //map connections
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

		else if(!molesOut){
			if (moleArmy.length >= 1000){
				molesOut = true;
			}
 			else if (moleArmy.length % 95 == 0){
				for (let i = 0; i < moleCount; i++){
					moleArmy.push(new Mole(moleHill));
				}
			}
		}

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
	if(superOn){
		push();
		tint(240, 240, 240);
		if (superFlyIn){ // for future animation?
			if (superFlyCount < 100){
				superFlyCount++;
			}
			else {
				superFlyIn = false;
			}
		}
		else{
			for (var i = hench.length - 1; i >= 0; i --){
				if (hench[i].s == true){
					push();
					imageMode(CENTER);
					image(superbious, hench[i].x + (width/72), hench[i].y + (height/108), width/6, height/6);
				 	pop();
				}
			}
		}
		pop();
	}
	*/
}
