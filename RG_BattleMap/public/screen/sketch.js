// Battle Map Screen to be Projected or Displayed on Players' Phones
// by August Luhrs Feb. 2019
// assets from Arnab Chakravarty


// Open and connect socket
let socket = io('/screen');

//rando variables
let canvas;
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
/*
var jitterX1, jitterX2, jitterX3, jitterX15;
var jitterY1, jitterY2, jitterY3, jitterY15;
var jitterSpeed = 2;
*/

function preload(){
	reg1 = loadImage('../assets/NorthAmerica.png');
	reg2 = loadImage('../assets/CentralAmerica.png');
	reg3 = loadImage('../assets/SouthAmerica.png');
	reg4 = loadImage('../assets/Greenland.png');
	reg5 = loadImage('../assets/Europe.png');
	reg6 = loadImage('../assets/WestAfrica.png');
	reg7 = loadImage('../assets/SouthAfrica.png');
	reg8 = loadImage('../assets/EastAfrica.png');
	reg9 = loadImage('../assets/Russia.png');
	reg10 = loadImage('../assets/MiddleEast.png');
	reg11 = loadImage('../assets/India.png');
	reg12 = loadImage('../assets/Siberia.png');
	reg13 = loadImage('../assets/China.png');
	reg14 = loadImage('../assets/Oceania.png');
	//reg15 and reg16 are ellipses for now
	// font = loadFont('../assets/fonts/Action_Man_Shaded_Italic.ttf');
	font = loadFont('../assets/fonts/Action_Man_Bold_Italic.ttf');
	kaiju = loadImage('../assets/kaiju.png');
}

function setup(){
  //- - - - - overall
	// var screenSize = windowHeight - 100;
	// createCanvas(int(screenSize * .666), screenSize);

	// canvas = createCanvas(windowWidth, windowHeight);
	// canvas.style('display', 'block');
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

	refresh = createButton('refresh map');
	refresh.position(0,10);
	refresh.mousePressed(function(){
		socket.emit('refresh');
	})

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
		{ex: width/10.85, ey: height/1.37}
	];


	hench = [
		{n: '0', c: startCol, r: 'North America', x: width/5.8 , y: height/3.5},
		{n: '0', c: startCol, r: 'Central America', x: width/5.4, y: height/1.91},
		{n: '0', c: startCol, r: 'South America', x: width/3.03, y: height/1.32},
		{n: '0', c: startCol, r: 'Greenland', x: width/ 2.69, y: height/ 6.21},
		{n: '0', c: startCol, r: 'Europe', x: width/2.19 , y: height/ 2.89 },
		{n: '0', c: startCol, r: 'West Africa', x: width/ 2.33 , y: height/ 1.81 },
		{n: '0', c: startCol, r: 'South Africa', x: width/ 1.95, y: height/ 1.29},
		{n: '0', c: startCol, r: 'East Africa', x: width/ 1.64 , y: height/ 1.49},
		{n: '0', c: startCol, r: 'Russia', x: width/ 1.58 , y: height/ 3.86 },
		{n: '0', c: startCol, r: 'Middle East', x: width/ 1.72, y: height/ 2.08 },
		{n: '0', c: startCol, r: 'India', x: width/ 1.45, y: height/ 1.72},
		{n: '0', c: startCol, r: 'Siberia', x: width/ 1.12, y: height/ 3.45 },
		{n: '0', c: startCol, r: 'China', x: width/ 1.22, y: height/ 1.89 },
		{n: '0', c: startCol, r: 'Oceania', x: width/ 1.11, y: height/ 1.17},
		{n: '0', c: startCol, r: 'UN Air Fortress', x: width/ 1.39, y: height/ 1.21},
		{n: '0', c: startCol, r: 'P. U. F. F.', x: width/ 10.85, y: height/ 1.37} // Pacific Underwater Freedom Fortress
	];

	socket.emit('refresh');

  // Listen for confirmation of connection
  socket.on('connect', function() {
    console.log("Connected");
		socket.emit('refresh');
		redraw();
  });

	socket.on('timerStart', function(){
		timerOn = true;
		startMillis = millis();
	})

	// - - - - - heartbeat
	socket.on('update',
		function(data){
			// background(0); // ?????
			// regions = data.r;
			teams = data.t;
			teamLimit = int(data.l);
			console.log(data);

			for (var i = 0; i < hench.length; i++){
				let hR = data.r[i].c.levels[0];
				let hG = data.r[i].c.levels[1];
				let hB = data.r[i].c.levels[2];
				let hA = data.r[i].c.levels[3];
				let fillCol = color(hR, hG, hB, hA);
				// fill(fillCol);
				hench[i].c = fillCol;
				hench[i].n = data.r[i].h;
			}

			for (var i = 0; i < teamLimit; i++){
				// stroke(255);
				// strokeWeight(.5);
				let tR = teams[i].c.levels[0];
				let tG = teams[i].c.levels[1];
				let tB = teams[i].c.levels[2];
				let tA = teams[i].c.levels[3];
				let fillCol = color(tR, tG, tB, tA);
				stroke(0);
				fill(fillCol);
				// textSize(width/(teams[i].n.length * 4));
				textSize(width/(35 + teams[i].n.length)); //team size text scaling
				/*
				if (teams[i].n.length >= 12){
					textSize(windowWidth/60);
				}
				else{
					textSize(windowWidth/50);
				}
				*/
				//two rows of team names, offset
				if (i % 2 == 0){
					text(teams[i].n, (i + 1) * windowWidth/(teamLimit + 1) , windowHeight - 50)
				}
				else{
					text(teams[i].n, (i + 1) * windowWidth/(teamLimit + 1) , windowHeight - 10)
				}
			}
			redraw();
		});
}

function draw(){
	background(0);
	fill(255, test, 255);
	ellipse(200, test, 20, 20);
	test+=5;

	for (var i = 0; i < hench.length; i++){
		fill(hench[i].c);
		tint(hench[i].c);
		if (i != 14 && i != 15 ){
			image(regions[i].img, regions[i].x, regions[i].y, regions[i].w, regions[i].h);

		}
		else {
			ellipse(regions[i].ex, regions[i].ey, fortSize, fortSize);
		}
		// image(regions[1].img, regions[1].x + (i*5), regions[1].y, regions[1].w, regions[1].h);
		strokeWeight(4);
		rect(hench[i].x, hench[i].y, henchBox, henchBox);
		// push();
		// strokeWeight(4);
		stroke(0);
		fill(255);
		textSize(regText);
		text(hench[i].r, hench[i].x, hench[i].y - henchBox/2 - 20);
		stroke(0);
		fill(255);
		textSize(henchText);
		text(hench[i].n, hench[i].x, hench[i].y + henchBox/4);
		// pop();
	}

	// if (kaijuOn) {image(kaiju, balalalala)}

	if (timerOn){ //time elapsed since start of game
		textSize(width/25);
		elapsed = millis() - startMillis;
		clock = int(elapsed / 1000);
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
	nodeLines();
}

function mousePressed(){ //for map placement ease
	image(kaiju, mouseX, mouseY, width/6, height/5); // multiple clicks = fade in
}

//battle attempt from earlier
	// ellipse(width/1.39 + jitterX15, height/1.21 + jitterY15, fortSize, fortSize);
	// if (regions[14].b){
	// 	jitterX15 += random(-jitterSpeed, jitterSpeed);
	// 	jitterY15 += random(-jitterSpeed, jitterSpeed);
	// 	// redraw();
	// }
	// else{
	// 	jitterX15 = 0;
	// 	jitterY15 = 0;
	// }

function nodeLines(){	//connecting node lines
	push();
	strokeWeight(10);
	stroke(255);
	// filter(BLUR, 4); //blur effect
	line(width/3.53 , height/3.45, width/3.20, height/ 5.16); //N.America --> Greenland
	line(width/29.23 , height/4.54, 0, height/ 4.54); // N. America --> Siberia
	line(width/3.62 , height/1.19, width/8.44, height/ 1.31); // South America --> PUFF
	line(width/ 2.76, height/1.56, width/2.2, height/ 1.64); // South America --> West Africa
	line(width/ 2.43, height/6.54, width/2.02, height/4.26 ); // Greenland --> Europe
	line(width/ 2.09, height/2.54, width/2.15, height/2.21 ); // Europe --> West Africa
	line(width/2.02 , height/2.54, width/1.9, height/ 2.08); // Europe --> East Africa
	line(width/ 1.67, height/1.29, width/1.45, height/ 1.18); // South Africa --> UN Air
	line(width/ 1.05, height/3.93, width, height/ 3.93); // Siberia --> N. America
	line(width/ 1.16 , height/2.76, width/1.01, height/ 1.92); // Siberia --> PUFF
	line(width/ 1.27, height/1.67, width/1.21, height/1.48 ); // China --> Oceania
	line(width/ 1.05, height/1.2, width, height/ 1.26); // Oceania --> PUFF
	line(width/ 1.15, height/1.19, width/1.33, height/1.19 ); // Oceania --> UN Air
	line(0 , height/ 1.26, width/ 17.47, height/ 1.35 ); // Oceania --> PUFF
	line(0 , height/ 1.92, width/ 17.88, height/ 1.6); // Siberia --> PUFF
	line(width/ 1.42, height/ 1.59, width/ 1.41, height/ 1.37 ); // UN Air --> India
	pop();
}
