//========================================================================
// DeVry University - New Development
// PROJECT TITLE:	Word Flight
// PROJECT DATE:	03/02/2020
// PROGRAMMERS:		Chris Medeiros
//					Samantha Harvey
//					Joanna Blackwell
//					James Powell
//					Sumeira Zehra
// FILE NAME:		game.js
// DESCRIPTION:		Controls the heart of Word Flight
// LAST UPDATE:		03/22/2020 - Created main game.js file to work from
//========================================================================

// Initialize game object
game = Object.create(GameObject.prototype);

// Keybindings
game.keys = ['A', 'S', 'D', 'F'];
for (var i = 0; i < game.keys.length-1; i++) {
    engine.input.bind(engine.key[game.keys[i]], game.keys[i]);
}

// Declare Game Variables
// - Globals
game.scale = 0.9;

// Image hooks
// - Start Scene
//   - Images
game.wordFlightTitle = {
    image: document.getElementById("wordFlightTitle"),
    org_width: 1000 * game.scale,
    org_height: 208 * game.scale,
    width: 0,
    height: 0,
	posX: 0,
	posY: 0,
    resize: function() {
        this.width = this.org_width * (1- engine.widthProportion);
        this.height = this.org_height * (1- engine.widthProportion);
	this.posX = engine.width/2 - this.width/2;
	this.posY = engine.height/4 - this.height/2;
    },
	draw: function() {
		this.resize();
		// drawImage(source, posX, posY, width, height)
		engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height); // 1000 x 208
	}
};

game.startHangar = {
    image: document.getElementById("startHangar"),
    org_width: 1000 * game.scale,
    org_heigth: 208 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
	
    resize: function() {
	this.width = this.org_width * (1 - engine.widthProportion);
	this.height = this.org_height * (1 - engine.widthProportion);
	this.posX = engine.width/2 - this.width/2;
	this.posY = engine.height/4 - this.height/2;
     },
	
	draw: function() {
		this.resize();
		//drawImage(source, posX, posY, width, height)
		engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height); //1000 x 208
	}
};

game.startRunway = {
     image: document.getElementById("startRunway"),
     org_width: 1000 * game.scale, 
     org_height: 208 * game.scale,
     width: 0,
     height: 0,
     posX: 0,
     posY: 0,
	
     resize: function() {
	this.width = this.org_width * (1 - engine.widthProportion);
	this.height = this.org_height * (1 - engine.widthProportion);
	this.posX = engine.width/2 - this.width/2;
	this.posY = engine.height/4 - this.height/2;
     },
	
	draw: function () {
		this.resize();
		//drawImage(source, posX, posY, width, height)
		engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height); //1000 x 208
	}
};

game.startScene = {
     image: document.getElementById("startScene"),
     org_width: 1000 * game.scale,
     org_height: 208 * game.scale,
     width: 0,
     height: 0,
     posX: 0, 
     posY: 0, 

     resize: function() {
	this.width = this.org_width * (1 - engine.widthProportion);
	this.height = this.org_height * (1 - engine.widthProportion); //why is this not heightProportion?
	this.posX = engine.width/2 - this.width/2;
	this.posY = engine.height/4 - this.height/2;
     },
	
	draw: function() {
		this.resize();
		//drawImage(source, posX, posY, width, height)
		engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height); //1000 x 208
	}
};

//   - Buttons
game.menuButton = {
    image: document.getElementById("menuButton"),
    org_width: 644 * game.scale,  //do we want the menuButton smaller than other buttons on screen? 
    org_height: 156 * game.scale,
    width: 0,
    height: 0,
    posX: 0,	//do I need to change position since menuButton will be in top right corner?
    posY: 0,
	
    resize: function() {
	this.width = this.org_width * (1 - engine.widthProportion);
	this.height = this.org_height * (1 - engine.widthProportion);
	this.posX = engine.width/2 - this.width/2;
	this.posY = engine.height/2 - this.height/2;
    },
	draw: function() {
		this.resize();
		//drawImage(source, posX, posY, width, height)
		//engine.context.drawImage(this.image, engine.width/2 - this.width/2, engine.height/2, this.width, this.height); //644x156
	},
	
	adjustStyle: function() {
		this.resize();
		this.image.style.position = "absolute";
		this.image.style.display = "block";
		this.image.style.left = this.posX.toString() + "px";
		this.image.style.top = this.posY.toString() + "px";
		this.image.style.width = this.width + "px";
		this.image.style.height = this.height + "px";
		this.image.style.zIndex = 1; //Do I keep zIndex same to be on same level as other buttons above Canvas? 
	}
};
	
game.startButton = {
    image: document.getElementById("startButton"),
    org_width: 644 * game.scale,
    org_height: 156 * game.scale,
    width: 0,
    height: 0,
	posX: 0,
	posY: 0,
    resize: function() {
        this.width = this.org_width * (1- engine.widthProportion);
        this.height = this.org_height * (1- engine.widthProportion);
		this.posX = engine.width/2 - this.width/2;
		this.posY = engine.height/2 - this.height/2;
    },
	draw: function() {
		this.resize();
		// drawImage(source, posX, posY, width, height)
		// engine.context.drawImage(this.image, engine.width/2 - this.width/2, engine.height/2, this.width, this.height); // 644x156
	},
	adjustStyle: function() {
		this.resize();
		this.image.style.position = "absolute";
		this.image.style.display = "block";
		this.image.style.left = this.posX.toString() + "px";
		this.image.style.top = this.posY.toString() + "px";
		this.image.style.width = this.width + "px";
		this.image.style.height = this.height + "px";
		this.image.style.zIndex = 1;
	}
};

game.leaderboardButton = {
    image:document.getElementById("leaderboardButton"),
    org_width: 644 * game.scale,
    org_height: 156 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
	
    resize: function(){
	this.width = this.org_width * (1 - engine.widthProportion);
	this.height = this.org_height * (1 - engine.widthProportion);
	this.posX = engine.width/2 - this.width/2;
	this.posY = engine.height/2 - this.height/2;
    },
	
	draw: function() {
		this.resize();
		//drawImage(source, posX, posY, width, height)
		//engine.context.drawImage(this.image, engine.width/2 - this.width/2, enging.height/2, this.width, this.height); //644x156
	},
	
	adjustStyle: function() {
		this.resize();
		this.image.style.position = "absolute";
		this.image.style.display = "block";
		this.image.style.left = this.posX.toString() + "px";
		this.image.style.top = this.posY.toString() + "px";
		this.image.style.width = this.width + "px";
		this.image.style.height = this.height + "px";
		this.image.style.zIndex = 1; //same question as menuButton
	}
};

game.quitButton = {
    image: document.getElementById("quitButton"),
    org_width: 644 * game.scale,
    org_height: 156 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
	
    resize: function() {
	this.width = this.org_width * (1 - engine.widthProportion);
	this.height = this.org_height * (1 - engine.widthProportion);
	this.posX = engine.width/2 - this.width/2;
	this.posY = engine.height/2 - this.height/2;
    },
	draw: function() {
		this.resize();
		//drawImage(source, posX, posY, width, height)
		//engine.context.drawImage(this.image, engine.width/2 - this.width/2, engine.height/2, this.width, this.height); //644x156
	},
	
	adjustStyle: function() {
		this.resize();
		this.image.style.position = "absolute";
		this.image.style.display = "block";
		this.image.style.left = this.posX.toString() + "px";
		this.image.style.top = this.posY.toString() + "px";
		this.image.style.width = this.width + "px";
		this.image.style.height = this.height + "px";
		this.image.style.zIndex = 1; //same question as previous buttons
	}
};

/* Game States and transitions
** -- Start Scene
** |\ - Play Scene
** |  \ - End Scene
** \____\ - Leaderboard Scene
**        \ - Start Scene
*/
game.gameState = ['start', 'play', 'end', 'leaderboard'];
game.currState = game.gameState[0];

// Maintain live game data (timers, scores, etc.)
game.gameController = {
	gsStart: function(dt) {
		// Start Scene
	},
	gsPlay: function(dt) {
		// Play Scene
	},
	gsEnd: function(dt) {
		// End Scene
	},
	gsLeaderboard: function(dt) {
		// Leaderboard Scene
	}
};

// Update
game.update = function(dt) {
	switch(game.currState) {
		case 'start':
			this.gameController.gsStart(dt);
			break;
		case 'play':
			this.gameController.gsPlay(dt);
			break;
		case 'end':
			this.gameController.gsEnd(dt);
			break;
		case 'leaderboard':
			this.gameController.gsLeaderboard(dt);
			break;
		default:
			this.gameController.gsStart(dt);
			break;
	};
};

// Draw
game.draw = function() {
	
	// Draw based on the GameState
	switch(this.currState) {
		case 'start':
			// Draw images on the canvas
			this.wordFlightTitle.draw();
			// Display buttons
			this.startButton.adjustStyle();
			break;
		case 'play':
			
			break;
		case 'end':
			
			break;
		case 'leaderboard':
			
			break;
		default:
			break;
	}
};

// Lose focus
window.onblur = function() {
    return game.stop();
};

// Gain focus
window.onfocus = function() {
    return game.run();
};

// Run Game
game.run();
