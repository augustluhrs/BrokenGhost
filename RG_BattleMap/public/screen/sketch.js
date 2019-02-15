// Battle Map Screen to be Projected or Displayed on Players' Phones
// by August Luhrs Feb. 2019
// assets from Arnab Chakravarty


// Open and connect socket
let socket = io('/screen');

var regions = [];
var teams = [];
var teamLimit;
var refresh;
// let italy;
var reg1, reg2, reg3, reg4, reg5, reg6, reg7, reg8,
	reg9, reg10, reg11, reg12, reg13, reg14, reg15, reg16;

var startCol;
// let hench1 = {n: 0, c: startCol, r: reg1};
// let hench2 = {n: 0, c: startCol, r: reg2};
var hench = [];
var henchBox = 60; // w and h of the henchmen boxes
var henchText = 42; //textSize of henchmen count
var regText = 36; //Size of reg name

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
	rectMode(CENTER);
	startCol = color(0,255, 255,195);
	// textSize(width/32);

	refresh = createButton('refresh map');
	refresh.mousePressed(function(){
		socket.emit('refresh');
	})

	for (var i = 0; i < regions.length; i++){
		// for (var j = 0; j < 4; j++){
		regions[i].c.levels = [0, 0, 255, 155];
		// }
	}

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

  // Listen for confirmation of connection
  socket.on('connect', function() {
    console.log("Connected");
		socket.emit('refresh');
		redraw();
  });

	// - - - - - heartbeat
	socket.on('update',
		function(data){
			background(0);
			regions = data.r;
			teams = data.t;
			teamLimit = int(data.l);
			console.log(data);
			// console.log(regions);
			// console.log(teams);
			for (var i = 0; i < hench.length; i++){
				let hR = regions[i].c.levels[0];
				let hG = regions[i].c.levels[1];
				let hB = regions[i].c.levels[2];
				let hA = regions[i].c.levels[3];
				let fillCol = color(hR, hG, hB, hA);
				// fill(fillCol);
				hench[i].c = fillCol;
				hench[i].n = regions[i].h;
			}

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
	showReg2();
	showReg3();
	showReg4();
	showReg5();
	showReg6();
	showReg7();
	showReg8();
	showReg9();
	showReg10();
	showReg11();
	showReg12();
	showReg13();
	showReg14();
	showReg15();
	showReg16();

	for (var i = 0; i < hench.length; i++){
		fill(hench[i].c);
		rect(hench[i].x, hench[i].y, henchBox, henchBox);
		push();
		strokeWeight(4);
		stroke(0);
		fill(255);
		textSize(regText);
		text(hench[i].r, hench[i].x, hench[i].y - henchBox/2 - 20);
		// strokeWeight(4);
		stroke(255);
		fill(0);
		textSize(henchText);
		text(hench[i].n, hench[i].x, hench[i].y + henchBox/4);
		pop();
	}
}

function mousePressed(){ //for map placement ease
	// console.log((width/mouseX) +'&'+ (height/mouseY));
	console.log(mouseX) +'  &  '+ (mouseY));

}

function showReg1(){ // North America
	let rR = regions[0].c.levels[0];
	let rG = regions[0].c.levels[1];
	let rB = regions[0].c.levels[2];
	let rA = regions[0].c.levels[3];
	let fillCol = color(rR, rG, rB, rA);
	tint(fillCol);
	image(reg1, 0, height/10, width/3, height/3);
}

function showReg2(){ //Central America
	let rR = regions[1].c.levels[0];
	let rG = regions[1].c.levels[1];
	let rB = regions[1].c.levels[2];
	let rA = regions[1].c.levels[3];
	let fillCol = color(rR, rG, rB, rA);
	tint(fillCol);
	image(reg2, 11 * width/80, 61 *height/160, width/5, height/4);
}

function showReg3(){ // South America
	let rR = regions[2].c.levels[0];
	let rG = regions[2].c.levels[1];
	let rB = regions[2].c.levels[2];
	let rA = regions[2].c.levels[3];
	let fillCol = color(rR, rG, rB, rA);
	tint(fillCol);
	image(reg3, 41 *width/160, 46* height/80, width/8, height/3);
}

function showReg4(){ // Greenland
	let rR = regions[3].c.levels[0];
	let rG = regions[3].c.levels[1];
	let rB = regions[3].c.levels[2];
	let rA = regions[3].c.levels[3];
	let fillCol = color(rR, rG, rB, rA);
	tint(fillCol);
	image(reg4, width/5, 0, width/4, height/4);
}

function showReg5(){ //Europe
	let rR = regions[4].c.levels[0];
	let rG = regions[4].c.levels[1];
	let rB = regions[4].c.levels[2];
	let rA = regions[4].c.levels[3];
	let fillCol = color(rR, rG, rB, rA);
	tint(fillCol);
	image(reg5, 15 * width/40, height/12, width/5, height/3);
}

function showReg6(){ //West Africa
	let rR = regions[5].c.levels[0];
	let rG = regions[5].c.levels[1];
	let rB = regions[5].c.levels[2];
	let rA = regions[5].c.levels[3];
	let fillCol = color(rR, rG, rB, rA);
	tint(fillCol);
	image(reg6, 129 * width/320, 68 * height/160,  5 * width/40, 5 * height/20);
}

function showReg7(){ //South Africa
	let rR = regions[6].c.levels[0];
	let rG = regions[6].c.levels[1];
	let rB = regions[6].c.levels[2];
	let rA = regions[6].c.levels[3];
	let fillCol = color(rR, rG, rB, rA);
	tint(fillCol);
	image(reg7, 78*width/160, 101*height/160, width/8, height/4);
}

function showReg8(){ // East Africa
	let rR = regions[7].c.levels[0];
	let rG = regions[7].c.levels[1];
	let rB = regions[7].c.levels[2];
	let rA = regions[7].c.levels[3];
	let fillCol = color(rR, rG, rB, rA);
	tint(fillCol);
	image(reg8, 10 * width/20, 7 * height/16, 5 * width/40, 5 * height/20);
}

function showReg9(){ //Russia
	let rR = regions[8].c.levels[0];
	let rG = regions[8].c.levels[1];
	let rB = regions[8].c.levels[2];
	let rA = regions[8].c.levels[3];
	let fillCol = color(rR, rG, rB, rA);
	tint(fillCol);
	image(reg9, 11 * width/20, height/15, width/4, height/3);
}

function showReg10(){ // Middle East
	let rR = regions[9].c.levels[0];
	let rG = regions[9].c.levels[1];
	let rB = regions[9].c.levels[2];
	let rA = regions[9].c.levels[3];
	let fillCol = color(rR, rG, rB, rA);
	tint(fillCol);
	image(reg10, 90 * width/160, 61*height/160, 7* width/80, 4*height/20);
}

function showReg11(){ // India
	let rR = regions[10].c.levels[0];
	let rG = regions[10].c.levels[1];
	let rB = regions[10].c.levels[2];
	let rA = regions[10].c.levels[3];
	let fillCol = color(rR, rG, rB, rA);
	tint(fillCol);
	image(reg11, 51 * width/80, 31 * height/80, width/9,5* height/20);
}

function showReg12(){ // Siberia
	let rR = regions[11].c.levels[0];
	let rG = regions[11].c.levels[1];
	let rB = regions[11].c.levels[2];
	let rA = regions[11].c.levels[3];
	let fillCol = color(rR, rG, rB, rA);
	tint(fillCol);
	image(reg12, 123 * width/160, height/9, width/4, height/3);
}

function showReg13(){ //China
	let rR = regions[12].c.levels[0];
	let rG = regions[12].c.levels[1];
	let rB = regions[12].c.levels[2];
	let rA = regions[12].c.levels[3];
	let fillCol = color(rR, rG, rB, rA);
	tint(fillCol);
	image(reg13, 27 * width/40, 20 * height/60, width/6, 3* height/10);
}

function showReg14(){ //Oceania
	let rR = regions[13].c.levels[0];
	let rG = regions[13].c.levels[1];
	let rB = regions[13].c.levels[2];
	let rA = regions[13].c.levels[3];
	let fillCol = color(rR, rG, rB, rA);
	tint(fillCol);
	image(reg14, 8 * width/10, 6* height/10, width/4, height/3);
}

function showReg15(){
	let rR = regions[14].c.levels[0];
	let rG = regions[14].c.levels[1];
	let rB = regions[14].c.levels[2];
	let rA = regions[14].c.levels[3];
	let fillCol = color(rR, rG, rB, rA);
	tint(fillCol);
	// image(reg15, 0, 0, width/4, height/3);
}

function showReg16(){
	let rR = regions[15].c.levels[0];
	let rG = regions[15].c.levels[1];
	let rB = regions[15].c.levels[2];
	let rA = regions[15].c.levels[3];
	let fillCol = color(rR, rG, rB, rA);
	tint(fillCol);
	// image(reg16, 0, 0, width/4, height/3);
}
