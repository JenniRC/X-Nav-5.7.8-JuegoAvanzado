// Original game from:
// http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
// Slight modifications by Gregorio Robles <grex@gsyc.urjc.es>
// to meet the criteria of a canvas class for DAT @ Univ. Rey Juan Carlos
var keys = { 'left': 37 ,'right': 39 ,'down': 40 ,'up': 38 };

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/mifondo.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/mario.gif";

// princess image
var princessReady = false;
var princessImage = new Image();
princessImage.onload = function () {
	princessReady = true;
};
princessImage.src = "images/Peach.png";

// plant image
var plantReady = false;
var plantImage = new Image();
plantImage.onload = function () {
	plantReady = true;
};
plantImage.src = "images/planta.png";

// monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/Bowser.png";

// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};

var plant = {
	rendered : false
};

var monsters = [];
var nmonsters = 0;

var plants = [];
var nplants = 0;

var princess = {};
var princessesCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a princess
var reset = function () {
	if(princessesCaught > 3){
		plants[nplants] = plant = {
						rendered : false
					};
		nplants ++;
		localStorage["Plantas"] = nplants;
	}

	if(((princessesCaught % 3) == 0) && princessesCaught > 5){
		monsters[nmonsters] = monster = {
							speed : 2*princessesCaught
						};
		nmonsters ++;
		localStorage["Monsters"] = nmonsters;

	}

	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the princess somewhere on the screen randomly
	princess.x = 64 + (Math.random() * (canvas.width - 96));
	princess.y = 64 + (Math.random() * (canvas.height - 96));

	for(i = 0; i<nplants; i++){

		if(princessesCaught > 2 && plants[i].rendered== false ){
			plants[i].x = 32 + (Math.random() * (canvas.width - 64));
			plants[i].y = 32 + (Math.random() * (canvas.height - 64));
			plants[i].rendered = true;

		}
	}

	for(i = 0; i< nmonsters; i ++){
		if(princessesCaught > 5){
				monsters[i].x = 32 + (Math.random() * (canvas.width - 96));
				monsters[i].y = 32 + (Math.random() * (canvas.width - 96));
			}
	}

};

var lastMove;
var cantMove;

// Update game objects
var update = function (modifier) {

	if (keys['up'] in keysDown && cantMove != keys['up']) { // Player holding up
		hero.y -= hero.speed * modifier;
		lastMove = keys['up'];
		cantMove = 0;
	}
	if (keys['down'] in keysDown && cantMove != keys['down']) { // Player holding down
		hero.y += hero.speed * modifier;
		lastMove = keys['down'];
		cantMove = 0;
	}
	if (keys['left'] in keysDown && cantMove != keys['left']) { // Player holding left
		hero.x -= hero.speed * modifier;
		lastMove = keys['left'];
		cantMove = 0;
	}
	if (keys['right'] in keysDown && cantMove != keys['right']) { // Player holding right
		hero.x += hero.speed * modifier;
		lastMove = keys['right'];
		cantMove = 0;
	}

	// Are they touching?
	if (
		hero.x <= (princess.x + 16)
		&& princess.x <= (hero.x + 16)
		&& hero.y <= (princess.y + 16)
		&& princess.y <= (hero.y + 16)
	) {
		++princessesCaught;
		localStorage["Princesses"] = princessesCaught;
		reset();
	}
	for(i = 0; i<nplants; i++){
		if (hero.x <= (plants[i].x + 16)
		&& plants[i].x <= (hero.x + 16)
		&& hero.y <= (plants[i].y + 16)
		&& plants[i].y <= (hero.y + 32))
		{
			cantMove = lastMove;
		}
	}
//If hero or princess are closed to a Bowser -> game over
	for(i = 0; i<nmonsters; i++){
		if ((hero.x <= (monsters[i].x + 16)
		&& monsters[i].x <= (hero.x + 16)
		&& hero.y <= (monsters[i].y + 16)
		&& monsters[i].y <= (hero.y + 32))
		|| (princess.x <= (monsters[i].x + 16)
		&& monsters[i].x <= (princess.x + 16)
		&& princess.y <= (monsters[i].y + 16)
		&& monsters[i].y <= (princess.y + 32)))
		{

			princessesCaught = 0;
			localStorage["Princesses"] = princessesCaught;
			nmonsters = 0;
			localStorage["Monsters"] = nmonsters;
			nplants = 0;
			localStorage["Plantas"] = nplants;
			reset();
		}
	}

	if(hero.x > (canvas.width-32)){
		hero.x = canvas.width-32;
	}else if(hero.x < 16){
		hero.x = 16;
	}else if(hero.y > (canvas.height-32)){
		hero.y = canvas.height-32;
	}else if(hero.y < 16){
		hero.y = 16;
	}

	for(i = 0; i<nmonsters; i++){
		if (hero.x <= (monsters[i].x + 16)
		&& monsters[i].x <= (hero.x + 16)
		&& hero.y <= (monsters[i].y + 16)
		&& monsters[i].y <= (hero.y + 32))
		{
			princessesCaught = 0;
			localStorage["Princesses"] = princessesCaught;
			nmonsters = 0;
			localStorage["Monsters"] = nmonsters;
			nplants = 0;
			localStorage["Plantas"] = nplants;
			reset();
		}
	}

	for(i=0; i<nmonsters; i++){
		x = monsters[i].x - princess.x;
		y = monsters[i].y - princess.y;
		if(x > 0){
			monsters[i].x -= monsters[i].speed * modifier;
		}else if (x < 0){
			monsters[i].x += monsters[i].speed * modifier;
		}
		if(y > 0){
			monsters[i].y -= monsters[i].speed * modifier;
		}else if (y < 0){
			monsters[i].y += monsters[i].speed * modifier;
		}
	}

};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (princessReady) {
		ctx.drawImage(princessImage, princess.x, princess.y);
	}

	if (plantReady && princessesCaught > 3){
		for(i = 0; i < nplants ; i++){
			ctx.drawImage(plantImage, plants[i].x, plants[i].y);
		}

	}

	if(monsterReady && princessesCaught > 7){
		for(i=0;i<nmonsters;i++){
			ctx.drawImage(monsterImage, monsters[i].x, monsters[i].y);
		}
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Princesses rescue: " + princessesCaught, 32, 32);
};

// The main game loop
var main = function () {
	if(localStorage["Princesses"] != null){
		princessesCaught = localStorage["Princesses"];
	}
	if(localStorage["Monsters"] != null){
		nmonsters = localStorage["Monsters"];
	}
	if(localStorage["Plantas"] != null){
		nplants = localStorage["Plantas"];
	}

	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();
	then = now;
};

// Let's play this game!
reset();
var then = Date.now();
//The setInterval() method will wait a specified number of milliseconds, and then execute a specified function, and it will continue to execute the function, once at every given time-interval.
//Syntax: setInterval("javascript function",milliseconds);
setInterval(main, 1); // Execute as fast as possible
