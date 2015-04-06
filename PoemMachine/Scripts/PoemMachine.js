//Song
var pinkrabbitsong = document.getElementById("pinkrabbit");
pinkrabbitsong.play();
// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 480;
document.body.appendChild(canvas);

var Ready = false;
var images = {};

//Physics
var velY = 0,
	velX = 0,
	friction = 0.98;

function loadImage(name) {


	images[name] = new Image();
	images[name].onload = function() { 
		Ready = true;
  }
  images[name].src = "images/" + name + ".png";
}

loadImage("MainBackGround");
loadImage("hero");
loadImage("monster");

// Game objects


var hero = {
	speed: 2 // movement in pixels per second
};
var monster = {};
var monstersCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {
	//hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;
	hero.x = 0;

	//Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown || 87 in keysDown) { // Player holding up
		hero.y -= hero.speed;
		changeframe();
	}
	if (40 in keysDown || 83 in keysDown) { // Player holding down
		hero.y += hero.speed;
		changeframe();
	}
	if (37 in keysDown || 65 in keysDown) { // Player holding left
		hero.x -= hero.speed;
		changeframe();
	}
	if (39 in keysDown || 68 in keysDown) { // Player holding right
		hero.x += hero.speed;
		changeframe();
	}

    if (hero.x >= 1000) {
        hero.x = 1000;
    } else if (hero.x <= 5) {
        hero.x = 5;
    }

    if (hero.y > 480) {
        hero.y = 480;
    } else if (hero.y <= 5) {
        hero.y = 5;
    }

	// Are they touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		//reset();
		monster.x = 32 + (Math.random() * (canvas.width - 64));
		monster.y = 32 + (Math.random() * (canvas.height - 64));
	}
};

// Draw everything
nrenderframe = 0;
ticksPerFrame = 10;
tickcount = 0;
function changeframe()
{
	tickcount++;
	if(tickcount > ticksPerFrame)
	{
		tickcount = 0;
		if(nrenderframe ==0)
		{
			nrenderframe = 1;
		}
		else if(nrenderframe == 1)
		{
			nrenderframe = 0;
		}
	}
}
var render = function () {


	if (Ready) {
		
		ctx.drawImage(images["MainBackGround"], 0, 0);
		drawhero(nrenderframe);
		
		ctx.drawImage(images["monster"], monster.x, monster.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Chase your dreams!: " + monstersCaught, 32, 32);
};
var nwidth = 41;
var nheight = 58;

var nwidth2 =82;
var nheight2 = 58;


function drawhero(time)
{
	if(time == 1)
	{
		ctx.drawImage(images["hero"], 
		0,
		0,
		nwidth,
		nheight,
		hero.x, 
		hero.y,
		nwidth,
		nheight
		);
	}
	else
	{
		ctx.drawImage(images["hero"], 
		nwidth,
		0,
		nwidth,
		nheight,
		hero.x, 
		hero.y,
		nwidth,
		nheight
		);
	}


}


// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();

main();