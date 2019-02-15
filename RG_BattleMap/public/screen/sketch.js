// Battle Map Screen to be Projected or Displayed on Players' Phones
// by August Luhrs Feb. 2019
// assets from Arnab Chakravarty


// Open and connect socket
let socket = io('/screen');

var regions = [];
var teams = [];
var teamLimit;
// let italy;
var reg1, reg2, reg3, reg4, reg5, reg6, reg7, reg8,
	reg9, reg10, reg11, reg12, reg13, reg14, reg15, reg16;

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
	// reg1 = loadImage('assets/NorthAmerica.png');
	// reg1 = loadImage('assets/NorthAmerica.png');
}

function setup(){
  //- - - - - overall
	// var screenSize = windowHeight - 100;
	// createCanvas(int(screenSize * .666), screenSize);
	createCanvas(windowWidth, windowHeight);
	// background(150, 50, 50);
	background(0);
	textAlign(CENTER);
	// textSize(width/32);


  // Listen for confirmation of connection
  socket.on('connect', function() {
    console.log("Connected");
  });

	// - - - - - heartbeat
	socket.on('update',
		function(data){
			background(0);
			regions = data.r;
			teams = data.t;
			teamLimit = int(data.l);
			console.log(data);
			console.log(regions);
			// console.log(teams);
			for (var i = 0; i < teamLimit; i++){
				// stroke(255);
				// strokeWeight(.5);
				let tR = teams[i].c.levels[0];
				let tG = teams[i].c.levels[1];
				let tB = teams[i].c.levels[2];
				let tA = teams[i].c.levels[3];
				let fillCol = color(tR, tG, tB, tA);
				fill(fillCol);
				// console.log(teams[i].n.length);
				// textSize(width/(teams[i].n.length * 4));
				if (teams[i].n.length >= 12){
					textSize(windowWidth/60);
				}
				else{
					textSize(windowWidth/50);
				}
				if (i % 2 == 0){
					text(teams[i].n, (i + 1) * windowWidth/(teamLimit + 1) , windowHeight - 50)
				}
				else{
					text(teams[i].n, (i + 1) * windowWidth/(teamLimit + 1) , windowHeight - 25)
				}
			}
			redraw();
		});
}

function draw(){
	//image(img, x, y, w, h)
	// tint(255,255,0);
	// image(reg1, 0, 0, width/4, height/3);
	showReg1();
}

function showReg1(){
	let rR = regions[0].c.levels[0];
	let rG = regions[0].c.levels[1];
	let rB = regions[0].c.levels[2];
	let rA = regions[0].c.levels[3];
	let fillCol = color(rR, rG, rB, rA);
	tint(fillCol);
	image(reg1, 0, 0, width/4, height/3);
}
