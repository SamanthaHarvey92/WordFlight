// JavaScript Document
// Notes:
// - *.arc(xPosition, yPosition, radius, beginAngle, endAngle)

// atom.input.bind(atom.key.LEFT_ARROW, 'left');
game = Object.create(Game.prototype);
game.keys = ['A', 'S', 'D', 'F'];
for (var i = 0; i < game.keys.length; i++) {
	atom.input.bind(atom.key[game.keys[i]], game.keys[i]);
};
game.controls = ['SPACE'];
for (var i = 0; i < game.controls.length; i++) {
	atom.input.bind(atom.key[game.controls[i]], game.controls[i]);
};
atom.currentMoleTime = 0;
atom.tillNewMole = 2;

// Splash Screen
game.imgSplash = document.getElementById("hexed");
game.imgLife = document.getElementById("life");

/* Game States and transitions
** -- Open Page
**  \ - Splash
**    \ - Title
**      \ - Play
**      | \ - Win
**      |   \ - Title
**		| \ - Lose
**      |   \ - Title
*/
atom.gameState = ['splash', 'title', 'play', 'win', 'lose'];
atom.currState = atom.gameState[0];

// Game Variables
atom.startGame = false;
atom.startTime = 3;
atom.startCountdown = 3;
atom.highScore = -Infinity;

// Update
game.update = function(dt) {
	
	switch(atom.currState) {
		case 'splash':
			this.gameController.gsSplash(dt);
			break;
		case 'title':
			this.gameController.gsTitle(dt);
			break;
		case 'play':
			this.gameController.gsPlay(dt);
			break;
		case 'win':
			this.gameController.gsWin(dt);
			break;
		case 'lose':
			this.gameController.gsLose(dt);
			break;
		default:
			break;
	};
	
	/*if (atom.input.pressed('left')) {
		return console.log("player started moving left");
	} else if (atom.input.down('left')) {
		return console.log("player still moving left");
	}*/
};

game.gameController = {
	gsSplash: function(dt) {
		atom.currentMoleTime = atom.currentMoleTime + dt;
		if (atom.currentMoleTime > 3) {
			atom.currState = atom.gameState[1];
		};
	},
	gsTitle: function(dt) {
		if (!atom.startGame) {
			for (var i = 0; i < game.controls.length; i++) {
				if (atom.input.pressed(game.controls[i])) {
					atom.startGame = true;
				};
			};
		} else {
			if (atom.startCountdown > -1) {
				atom.startCountdown = atom.startCountdown - dt;
			} else {
				atom.startCountdown = atom.startTime;
				atom.startGame = false;
				game.life.reset_lives();
				game.bop.total = 0;
				atom.currState = atom.gameState[2];
			};
		};
	},
	gsPlay: function(dt) {
		atom.currentMoleTime = atom.currentMoleTime + dt;
		if (atom.currentMoleTime > atom.tillNewMole) {
			game.activeMole = Math.floor(Math.random() * 4);
			atom.currentMoleTime = 0;

			if (game.bop.bopped === false) {
				game.bop.total = game.bop.total > 0 ? game.bop.total - 1 : 0;
				game.life.adjust_lives();
			} else {
				game.bop.bopped = false;
			};
		};

		for (var i = 0; i < game.keys.length; i++) {
			if (atom.input.pressed(game.keys[i])) {
				game.bop.with_key(game.keys[i]);
			}
		};
		
		if (game.bop.total >= 20) atom.currState = atom.gameState[3];
		if (game.life.currentLives < 0) atom.currState = atom.gameState[4];
	},
	gsWin: function(dt) {
		if (!atom.startGame) {
			for (var i = 0; i < game.keys.length; i++) {
				if (atom.input.pressed(game.keys[i])) {
					atom.startGame = true;
				};
			};

			if (atom.startCountdown > -2) {
				atom.startCountdown = atom.startCountdown - dt;
			} else {
				atom.startCountdown = atom.startTime;
				atom.startGame = true;
				atom.startCountdown = atom.startTime;
			};

		} else {
			atom.startGame = false;
			atom.startCountdown = atom.startTime;
			atom.currState = atom.gameState[1];
		};
	},
	gsLose: function(dt) {
		if (!atom.startGame) {
			for (var i = 0; i < game.keys.length; i++) {
				if (atom.input.pressed(game.keys[i])) {
					atom.startGame = true;
				};
			};

			if (atom.startCountdown > -2) {
				atom.startCountdown = atom.startCountdown - dt;
			} else {
				atom.startCountdown = atom.startTime;
				atom.startGame = true;
				atom.startCountdown = atom.startTime;
			};

		} else {
			atom.startGame = false;
			atom.startCountdown = atom.startTime;
			atom.currState = atom.gameState[1];
		};
	}
};

// Bop
game.bop = {
	bopped: true,
	total: 0,
	draw: function () {
		atom.context.fillStyle = '#ee3';
		atom.context.font = '130px monospace';
		atom.context.fillText('Score: ' + this.total, 300, 200);
	},
	with_key: function(key) {
		if (!!(game.activeMole + 1) === true && key === game.holes[game.activeMole].label) {
			this.total = this.total + 1;
			game.activeMole = -1;
			this.bopped = true;
		} else {
			this.total = this.total > 0 ? this.total - 1  : 0;
			game.life.adjust_lives();
		}
	}
};

// Draw
game.draw = function() {
	
	// Draw based on GameState
	switch(atom.currState) {
		case 'splash':
			atom.context.drawImage(this.imgSplash, 0, 0, atom.width, atom.height);
			atom.context.fillStyle = '#fff';
			atom.context.font = '48px monospace';
			atom.context.fillText('H E X E D Gaming', 50, atom.height - 48);
			break;
		case 'title':
			this.drawBackground();
			atom.context.fillStyle = '#fff';
			atom.context.font = '84px monospace';
			atom.context.fillText('Whack-A-Mole', (atom.width-608)/2, 150);
			atom.context.fillStyle = '#333';
			atom.context.font = '48px monospace';
			if (!atom.startGame) {
				atom.context.fillText("Press 'Spacebar' to begin", (atom.width-723)/2, atom.height - 107);
			} else {
				if (atom.startCountdown > 0) {
					atom.context.fillText(Math.ceil(atom.startCountdown) + "...", (atom.width-117)/2, atom.height - 107);
				} else {
					atom.context.fillText("GO!!!", (atom.width-145)/2, atom.height - 107);
				}
			};
			this.drawHighScore();
			break;
		case 'play':
			this.drawBackground();
			// this.drawHoles(['A', 'S', 'D', 'F'], 145, 85);
			// this.mole.draw(100, 100);
			for (var i = 0; i < game.holes.length; i++) {

				if (i === game.activeMole) {
					game.holes[i].active = true;
				} else {
					game.holes[i].active = false;
				};

				game.holes[i].draw();
			}
			this.bop.draw();
			this.life.draw();
			break;
		case 'win':
			this.drawBackground();
			atom.context.fillStyle = '#fff';
			atom.context.font = '32px monospace';
			atom.context.fillText('Whack-A-Mole', 10, 32);
			atom.context.font = '54px monospace';
			atom.context.fillText('Congratulations!', (atom.width-521)/2, 150);
			atom.context.font = '84px monospace';
			atom.context.fillText('You Won!', (atom.width-406)/2, 250);
			atom.context.fillStyle = '#0ee';
			atom.context.font = '36px monospace';
			atom.context.fillText("Score: " + game.bop.total, atom.width/2 - 100, 320);
			this.drawHighScore();
			this.life.reset_lives();
			break;
		case 'lose':
			this.drawBackground();
			atom.context.fillStyle = '#fff';
			atom.context.font = '32px monospace';
			atom.context.fillText('Whack-A-Mole', 10, 32);
			atom.context.font = '54px monospace';
			atom.context.fillText('Sorry!', (atom.width-196)/2, 150);
			atom.context.font = '84px monospace';
			atom.context.fillText('You Lost!', (atom.width-456)/2, 250);
			atom.context.fillStyle = '#0ee';
			atom.context.font = '36px monospace';
			atom.context.fillText("Score: " + game.bop.total, atom.width/2 - 100, 320);
			this.drawHighScore();
			this.life.reset_lives();
			break;
		default:
			break;
	};
	
};

// Lives
game.life = {
	maxLives: 3,
	currentLives: 3,
	lifeSpacing: 40,
	draw: function() {
		this.drawLife();
	},
	drawLife: function() {
		atom.context.fillStyle = "#fff";
		atom.context.font = "24px monospace";
		atom.context.fillText("Lives: ", 5, 29);
		for (var i = 0; i < this.currentLives; i++) {
			atom.context.drawImage(game.imgLife, 94 + i * 40, 4, 34, 34);
		};
	},
	adjust_lives: function () {
		this.currentLives = this.currentLives > -1 ? this.currentLives - 1 : -1;
		if (this.currentLives < 0) atom.currState = atom.gameState[4];
	},
	reset_lives: function () {
		this.currentLives = this.maxLives;
	}
};

// Create Lives
game.makeLives = function(maxLives, xOffset, yOffset, lifeWidth, lifeHeight) {
	game.lives = [];
	for (var i = 0; i < maxLives - 1; i++) {

		var newLife = Object.create(game.life);
		newLife.lifeLocation = [xOffset + game.life.lifeSpacing * i, yOffset];
		newLife.iWidth = lifeWidth;
		newLife.iHeight = lifeHeight;
		game.lives.push(newLife);
	};
};

// Create Holes
game.makeHoles = function(labels, xOffset, yOffset) {
	game.holes = [];
	for (var i = 0; i < labels.length; i++) {
		var newHole = Object.create(game.hole);
		newHole.holeLocation = [xOffset + game.hole.spacing * i, yOffset];
		newHole.label = labels[i];
		game.holes.push(newHole);
	};
};

// Draw holes
/* game.drawHoles = function(holeLabels, xOffset, yOffset) {
	for (i = 0; i < holeLabels.length; i++) {
		atom.context.fillStyle = game.hole.color;
		var holeLocation = [xOffset + game.hole.spacing * i, yOffset];
		game.hole.draw(holeLocation, holeLabels[i]);
	}
}; */

// Hole Object
game.hole = {
	size: 40,
	spacing: 280,
	color: '#311',
	labelOffset: 140,
	labelColor: '#000',
	labelFont: "130px monospace",
	/*draw: function(holeLocation, holeLabel) {
		atom.context.beginPath();
		atom.context.arc(holeLocation[0], atom.height/2+holeLocation[1], this.size, 0, Math.PI*2, false);
		atom.context.fill();
		atom.context.fillStyle = this.labelColor;
		atom.context.font = this.labelFont;
		atom.context.fillText(holeLabel, holeLocation[0] - this.size, atom.height/2+holeLocation[1] + this.labelOffset);
	}*/
	moleOffset: 20,
	draw: function() {
		this.drawHole();
		this.drawLabel();
		if (this.active === true) {
			this.drawMole(this.holeLocation[0], this.holeLocation[1] - this.moleOffset);
		};
	},
	drawHole: function() {
		atom.context.fillStyle = this.color;
		atom.context.beginPath();
		atom.context.arc(this.holeLocation[0], this.holeLocation[1], this.size, 0, Math.PI*2, false);
		atom.context.fill();
	},
	drawLabel: function() {
		atom.context.fillStyle = this.labelColor;
		atom.context.font = this.labelFont;
		atom.context.fillText(this.label, this.holeLocation[0] - this.size, this.holeLocation[1] + this.labelOffset);
	},
	drawMole: function(xPosition, yPosition) {
		game.mole.draw(xPosition, yPosition);
	}
};

// Mole Object
game.mole = {
	size: 40,
	color: '#557',
	noseSize: 8,
	noseColor: '#c55',
	eyeSize: 5,
	eyeOffset: 10,
	eyeColor: '#000',
	draw: function(xPosition, yPosition) {
		this.drawHead(xPosition, yPosition);
		this.drawEyes(xPosition, yPosition);
		this.drawNose(xPosition, yPosition);
		this.drawWhiskers(xPosition, yPosition);
	},
	drawHead: function(xPosition, yPosition) {
		atom.context.beginPath();
		atom.context.fillStyle = this.color;
		atom.context.arc(xPosition, yPosition, this.size, 0, Math.PI*2);
		atom.context.fill();
	},
	drawNose: function(xPosition, yPosition) {
		atom.context.beginPath();
		atom.context.fillStyle = this.noseColor;
		atom.context.arc(xPosition, yPosition, this.noseSize, 0, Math.PI*2);
		atom.context.fill();
	},
	drawEyes: function(xPosition, yPosition) {
		atom.context.beginPath();
		atom.context.fillStyle = this.eyeColor;
		atom.context.arc(xPosition + this.eyeOffset, yPosition - this.eyeOffset, this.eyeSize, 0, Math.PI*2);
		atom.context.fill();
		atom.context.beginPath();
		atom.context.fillStyle = this.eyeColor;
		atom.context.arc(xPosition - this.eyeOffset, yPosition - this.eyeOffset, this.eyeSize, 0, Math.PI*2);
		atom.context.fill();
	},
	drawWhiskers: function(xPosition, yPosition) {
		atom.context.beginPath();
		// Whisker 1
		atom.context.moveTo(xPosition - 10, yPosition);
		atom.context.lineTo(xPosition - 30, yPosition);
		// Whisker 2
		atom.context.moveTo(xPosition + 10, yPosition);
		atom.context.lineTo(xPosition + 30, yPosition);
		// Whisker 3
		atom.context.moveTo(xPosition - 10, yPosition + 5);
		atom.context.lineTo(xPosition - 30, yPosition + 10);
		// Whisker 4
		atom.context.moveTo(xPosition + 10, yPosition + 5);
		atom.context.lineTo(xPosition + 30, yPosition + 10);
		atom.context.stroke();
	}
};

// Draw the previous high score
game.drawHighScore = function() {
	var lifeMultipler = game.life.currentLives > 0 ? game.life.currentLives : 1;
	atom.highScore = game.bop.total > atom.highScore ? game.bop.total * lifeMultipler : atom.highScore;
	if (atom.highScore > -Infinity) {
		atom.context.fillStyle = '#333';
		atom.context.font = '20px monospace';
		atom.context.fillText("High Score: " + atom.highScore, 5, atom.height - 8);
	}
};

// Draw the game's background
game.drawBackground = function() {
	atom.context.beginPath();
	atom.context.fillStyle = '#34e';
	atom.context.fillRect(0, 0, atom.width, atom.height/2);
	atom.context.fillStyle = '#ee3';
	atom.context.arc(140, atom.height/2 - 30, 90, Math.PI*2, 0);
	atom.context.fill();
	atom.context.fillStyle = '#2e2';
	atom.context.fillRect(0, atom.height/2, atom.width, atom.height/2);
};

// Lose focus
window.onblur = function () {
	return game.stop();
}

// Gain Focus
window.onfocus = function () {
	return game.run();
}

// Create the Holes objects only once per hole
game.makeHoles(game.keys, 145, atom.height/2 + 85);

// Create the Lives objects
game.makeLives(3, 94, 4, 34, 34);

// Run Game
game.run();