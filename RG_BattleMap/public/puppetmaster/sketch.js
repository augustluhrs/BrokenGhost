// Master Interface for Davis the Intern
// Controls the Screen Display Elements
// by August Luhrs Feb. 2019


// Open and connect socket
let socket = io('/puppetmaster');

let map;
var regions = [];
let italy;

function setup(){
  //- - - - - overall
	// var screenSize = windowHeight - 100;
	// createCanvas(int(screenSize * .666), screenSize);
	// map = createDiv('map');
	// canvas = createCanvas(windowWidth, windowHeight);
	// canvas.parent('map');
	map = createCanvas(windowWidth, windowHeight);
	map.id('map');
	background(150, 50, 50, 50);
	// noCanvas();

	italy = createImg('../assets/italy.jpg');
	// italy = loadImage('../assets/italy.jpg');
	italy.class('region');
	// italy.parent('map');
	// italy.style('display', 'inline-block');
	italy.position(100, 100);
	italy.show();
	italy.mousePressed(function(){
		console.log('italy');
		// italy.tint(random(255), random(255), random(255));
		// italy.style('color', '#ffff00');
	});

  // Listen for confirmation of connection
  socket.on('connect', function() {
    console.log("Connected");
  });

	// - - - - - heartbeat
	socket.on('heartbeat',
		function(data){
		}
	);
}

function draw(){
	italy.show();
}
