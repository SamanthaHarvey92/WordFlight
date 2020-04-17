//========================================================================
// DeVry University - New Development
// PROJECT TITLE:   Word Flight
// PROJECT DATE:    03/02/2020
// PROGRAMMERS:     Chris Medeiros
//                  Samantha Harvey
//                  Joanna Blackwell
//                  James Powell
//                  Sumeira Zehra
// FILE NAME:       game.js
// DESCRIPTION:     Controls the heart of Word Flight
// LAST UPDATE:     03/22/2020 - Created main game.js file to work from
//========================================================================

// Initialize game object
game = Object.create(GameObject.prototype);

// Keybindings
game.keys = ['A', 'S', 'D', 'F'];
for (var i = 0; i < game.keys.length - 1; i++) {
    engine.input.bind(engine.key[game.keys[i]], game.keys[i]);
}

// Control bindings for testing purposes
game.controls = ['SPACE'];
for (var i = 0; i < game.controls.length; i++) {
    engine.input.bind(engine.key[game.controls[i]], game.controls[i]);
};

// Mouse bindings
game.mouse = ['LEFT', 'MIDDLE', 'RIGHT', 'WHEELDOWN', 'WHEELUP'];
for (var i = 0; i < game.mouse.length; i++) {
    // engine.input.bind(engine.button.LEFT, 'left_click');
    engine.input.bind(engine.button[game.mouse[i]], game.mouse[i]);
}

// Declare Game Variables
// - Globals
game.scale = 1.0;
game.planeScale = 1.0;
game.lastWord = "";
game.word = "";
game.nextWord = "";
game.lastSponsor = "";
game.sponsor = "";
game.nextSponsor = "";
game.sponsorId = "";
game.score = 0;
game.readyForNextWord = false;
game.playTime = (3 * 60 + 30) * 1000; // (3:30)
game.timeoutTime = 120;
// - Player information
game.player = {
    score: 250,
    initials: "CD",
    reset: function () {
        this.score = 0;
        this.initials = "";
    }
};
// - Browser size monitors
game.oldWidth = 0;
game.oldHeight = 0;

/*score
 - Play scene
     - Game over: update game.player.score
   - End scene
       - Update game.player.initials
     - Leaderboard scene
	   -- Reset score
*/

// Google Analytics
/*		*** WARNING *** WARNING *** WARNING ***
*** DO NOT UNCOMMENT THE GTAG() FUNCTIONS BEFORE DEPLOYMENT ***/
game.google = {
	load: function () {
		// gtag('event', 'screen_view', {'screen_name': 'Menu'});
		
		// DEBUG ONLY:
		console.log("<GoogleAnalytics:load>");
	},
	start: function () {
		// gtag('event', 'screen_view', {'screen_name': 'Start'});
		
		// DEBUG ONLY:
		console.log("<GoogleAnalytics:start>");
	},
	finish: function () {
		// gtag('event', 'screen_view', {'screen_name': 'Finish'});
		
		// DEBUG ONLY:
		console.log("<GoogleAnalytics:finish>");
	},
	quit: function () {
		// gtag('event', 'screen_view', {'screen_name': 'Quit'});
		
		// DEBUG ONLY:
		console.log("<GoogleAnalytics:quit>");
	},
	timeOut: function () {
		// gtag('event', 'screen_view', {'screen_name': 'TimeOut'});
		
		// DEBUG ONLY:
		console.log("<GoogleAnalytics:timeOut>");
	},
	leaderboard: function () {
		// gtag('event', 'screen_view', {'screen_name': 'Leaderboard'});
		
		// DEBUG ONLY:
		console.log("<GoogleAnalytics:leaderboard>");
	}
};/*
*** DO NOT UNCOMMENT THE GTAG() FUNCTIONS BEFORE DEPLOYMENT ***
		*** WARNING *** WARNING *** WARNING ***
*/

// Game functions
game.timeoutOverlay = {
    div: document.getElementById("timeoutOverlay"),
    divHeader: document.getElementById("timeoutHeader"),
    divInstructions: document.getElementById("timeoutInstructions"),
    divTimer: document.getElementById("timeoutTimer"),
    initialTime: null,
    finalTime: null,
    currentTime: null,
    initialTimerExpired: false,
    finalTimerExpired: false,
    init: function () {
        // Hide the overlay
        this.hideOverlay();

        // Add event listener to the main overlay div element
        this.div.addEventListener("click", function (e) {
            game.timeoutOverlay.refreshTimer();
        });

        // Initialize all variables
        this.resetTimer();
    },
    showOverlay: function () {
        this.div.style.display = "block";
        this.divHeader.style.display = "block";
        this.divInstructions.style.display = "block";
        this.divTimer.style.display = "block";
    },
    hideOverlay: function () {
        this.div.style.display = "none";
    },
    update: function (dt) {
        if (this.currentTime != null) {
            // Update the current time
            this.updateTime(dt);

            // Update the active timer
            if (!this.initialTimerExpired) {
                this.initialTimer(dt);
            } else if (!this.finalTimerExpired) {
                this.finalTimer(dt);
            }
        } else if (this.initialTimerExpired && this.finalTimerExpired) {
            // All timers expired - redirect
            this.expireTimer();
        }
    },
    initialTimer: function (dt) {
        // Check whether the time is greater than the limit
        if (this.currentTime >= this.initialTime) {
            // Reset the timer to zero
            this.currentTime = 0;
            // Flag the initial timer as complete
            this.initialTimerExpired = true;
            // Display the overlay
            this.showOverlay();
        }
    },
    finalTimer: function (dt) {
        // Update the time left
        this.divTimer.innerHTML = ". . . " + Math.ceil(this.finalTime - this.currentTime) + " . . .";

        // Check whether the time is greater than the limit
        if (this.currentTime >= this.finalTime) {
            // Set the timer to null, stopping execution
            this.currentTime = null;
            // Flag the final timer as complete
            this.finalTimerExpired = true;
        }
    },
    updateTime: function (dt) {
        this.currentTime += dt;
    },
    refreshTimer: function () {
        this.resetTimer();
    },
    resetTimer: function () {
        this.hideOverlay();
        this.initialTime = game.timeoutTime;
        this.finalTime = game.timeoutTime / 10;
        this.currentTime = 0;
        this.initialTimerExpired = false;
        this.finalTimerExpired = false;
    },
    expireTimer: function () {
		game.google.timeOut();
        window.location.replace("http://www.flywithbutchohare.com/");
    }
};
game.timeoutOverlay.init();

// Update words
game.updateWords = {
    lastWord: function () {
        game.lastWord = game.word;
        game.lastSponsor = game.sponsor;
    },
    word: function () {
        game.word = game.nextWord;
        game.sponsor = game.nextSponsor;
    },
    nextWord: function () {
        game.databaseQuery();
    },
    update: function () {
        if (game.word == game.lastWord) {
            this.nextWord();
            this.word();
            this.nextWord();
        } else {
            this.lastWord();
            this.word();
            this.nextWord();
        }
    }
}

// Database - Pull random word with its sponsor
game.databaseQuery = function () {
    // AJAX query
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var selection = JSON.parse(this.responseText);
            for (var a = 0; a < selection.length; a++) {
                game.nextWord = selection[a].word.toUpperCase();
                game.nextSponsor = selection[a].sponsor_name.toUpperCase();
            }

            // Remove all spaces from the word
            game.nextWord = game.nextWord.replace(/\s+/g, '');

            // DEBUG
            // console.log("\n(dbq)LastWord: " + game.lastWord + " | LastSponsor: " + game.lastSponsor);
            // console.log("(dbq)Word: " + game.word + " | Sponsor: " + game.sponsor);
            // console.log("(dbq)NextWord: " + game.nextWord + " | NextSponsor: " + game.nextSponsor);
        }

    }
    ajax.open("GET", "scripts/word_generator.php", true);
    ajax.send();
}

// Get the sponsor
game.getSponsor = function () {
    switch (this.sponsor) {
        case "ARGO TEA":
            this.sponsorId = "sponsorArgo";
            break;
        case "AUNTIE ANNES":
            this.sponsorId = "sponsorAuntieAnnes";
            break;
        case "BROOKSTONE":
            this.sponsorId = "sponsorBrookstone";
            break;
        case "BSMOOTH":
            this.sponsorId = "sponsorBSmooth";
            break;
        case "BURRITO BEACH":
            this.sponsorId = "sponsorBurritoBeach";
            break;
        case "CHICAGO SPORTS":
            this.sponsorId = "sponsorChicagoSports";
            break;
        case "CNN":
            this.sponsorId = "sponsorCNN";
            break;
        case "COACH":
            this.sponsorId = "sponsorCoach";
            break;
        case "DUNKIN DONUTS":
            this.sponsorId = "sponsorDunkinDonuts";
            break;
        case "DUTY FREE STORE":
            this.sponsorId = "sponsorDutyFreeStore";
            break;
        case "FIELD":
            this.sponsorId = "sponsorField";
            break;
        case "HUDSON":
            this.sponsorId = "sponsorHudson";
            break;
        case "MAC COSMETICS":
            this.sponsorId = "sponsorMacCosmetics";
            break;
        case "NUTS ON CLARK":
            this.sponsorId = "sponsorNutsOnClark";
            break;
        case "ROCKY MOUNTAIN CHOCOLATE":
            this.sponsorId = "sponsorRockyMountainChocolate";
            break;
        case "SARAHS CANDIES":
            this.sponsorId = "sponsorSarahsCandies";
            break;
        case "SHOE HOSPITAL":
            this.sponsorId = "sponsorShoeHospital";
            break;
        case "SPIRIT OF THE RED HORSE":
            this.sponsorId = "sponsorSpiritOfTheRedHorse";
            break;
        case "TALIE":
            this.sponsorId = "sponsorTalie";
            break;
        default:
            this.sponsorId = "__INVALID__";
            break;
    }
    return this.sponsorId;
}

// Image hooks
// - Start Scene
//   - Images
game.wordFlightTitle = {
    image: document.getElementById("wordFlightTitle"),
    org_width: 826 * game.scale,
    org_height: 200 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);
        this.posX = engine.width / 2 - this.width / 2;
        this.posY = 20;
    },
    draw: function () {
        this.resize();
        // drawImage(source, posX, posY, width, height)
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.startHangar = {
    image: document.getElementById("startHangar"),
    org_width: 1920 * game.scale,
    org_heigth: 1080 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = engine.width;
        this.height = engine.height;
    },
    draw: function () {
        this.resize();
        // drawImage(source, posX, posY, width, height)
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.startRunway = {
    image: document.getElementById("startRunway"),
    org_width: 1920 * game.scale,
    org_height: 1080 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = engine.width;
        this.height = engine.height;
    },
    draw: function () {
        this.resize();
        // drawImage(source, posX, posY, width, height)
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.startScene = {
    image: document.getElementById("startScene"),
    org_width: 1920 * game.scale,
    org_height: 1080 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);
        this.posX = engine.width / 2 - this.width / 2;
        this.posY = engine.height / 4 - this.height / 2;
    },
    draw: function () {
        this.resize();
        //drawImage(source, posX, posY, width, height)
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

//   - Buttons
game.menuButton = {
    image: document.getElementById("wordFlightMenuButton"),
    org_width: 275 * game.scale,
    org_height: 138 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
	init: function () {
        // Add event listener to the button
        this.image.addEventListener("click", game.menuButton.clickMe);
    },
    resize: function () {
        this.width = this.org_width * (1 - engine.dimensionProportion);
        this.height = this.org_height * (1 - engine.dimensionProportion);

        // Attach Top-Right Side
        this.posX = engine.width - this.width;
        this.posY = 50 * (1 - engine.dimensionProportion);
    },
    draw: function () {
        this.adjustStyle();
    },
    adjustStyle: function () {
        this.resize();
        this.image.style.position = "absolute";
        this.image.style.display = "block";
        this.image.style.left = this.posX.toString() + "px";
        this.image.style.top = this.posY.toString() + "px";
        this.image.style.width = this.width + "px";
        this.image.style.height = this.height + "px";
        this.image.style.zIndex = 1;
    },
	clickMe: function() {
		switch(game.currState) {
			case 'start':
				game.google.quit();
				window.location.replace("http://www.flywithbutchohare.com/");
				break;
			default:
				game.hideElements.hideAll();
				game.player.reset();
				game.updateWords.update();
                game.inputKeypad.hideKeypad();
                game.playLetterSpaces.hideKeypad();
                game.readyForNextWord = false;
                game.planeManager.resetElements();
                game.playTimerBox.resetTimer();
				game.timeoutOverlay.refreshTimer();
				game.currState = game.gameState[0];
				game.drawOnce();
				break;
		}
	}
}
game.menuButton.init();

game.startButton = {
    image: document.getElementById("startButton"),
    org_width: 450 * game.scale,
    org_height: 120 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
	init: function () {
        // Add event listener to the button
        this.image.addEventListener("click", game.startButton.clickMe);
    },
    resize: function () {
        this.width = this.org_width * (1.4 - engine.widthProportion);
        this.height = this.org_height * (1.2 - engine.widthProportion);
        this.posX = engine.width / 1.98 - this.width / 2;
        this.posY = engine.height / 3 - this.height / 2;
    },
    draw: function () {
        this.adjustStyle();
    },
    adjustStyle: function () {
        this.resize();
        this.image.style.position = "absolute";
        this.image.style.display = "block";
        this.image.style.left = this.posX.toString() + "px";
        this.image.style.top = this.posY.toString() + "px";
        this.image.style.width = this.width + "px";
        this.image.style.height = this.height + "px";
        this.image.style.zIndex = 1;
    },
	clickMe: function () {
		game.google.start();
	}
};
game.startButton.init();

game.leaderboardButton = {
    image: document.getElementById("leaderboardButton"),
    org_width: 450 * game.scale,
    org_height: 120 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
	init: function () {
        // Add event listener to the button
        this.image.addEventListener("click", game.leaderboardButton.clickMe);
    },
    resize: function () {
        this.width = this.org_width * (1.4 - engine.widthProportion);
        this.height = this.org_height * (1.2 - engine.widthProportion);
        this.posX = engine.width / 1.98 - this.width / 2;
        this.posY = engine.height / 2 - this.height / 2;
    },
    draw: function () {
        this.adjustStyle();
    },
    adjustStyle: function () {
        this.resize();
        this.image.style.position = "absolute";
        this.image.style.display = "block";
        this.image.style.left = this.posX.toString() + "px";
        this.image.style.top = this.posY.toString() + "px";
        this.image.style.width = this.width + "px";
        this.image.style.height = this.height + "px";
        this.image.style.zIndex = 1;
    },
	clickMe: function () {
		game.google.leaderboard();
	}
};
game.leaderboardButton.init();

game.quitButton = {
    image: document.getElementById("quitButton"),
    org_width: 450 * game.scale,
    org_height: 120 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
	init: function () {
        // Add event listener to the button
        this.image.addEventListener("click", game.quitButton.clickMe);
    },
    resize: function () {
        this.width = this.org_width * (1.4 - engine.widthProportion);
        this.height = this.org_height * (1.2 - engine.widthProportion);
        this.posX = engine.width / 1.98 - this.width / 2;
        this.posY = engine.height / 1.5 - this.height / 2;
    },
    draw: function () {
        this.adjustStyle();
    },
    adjustStyle: function () {
        this.resize();
        this.image.style.position = "absolute";
        this.image.style.display = "block";
        this.image.style.left = this.posX.toString() + "px";
        this.image.style.top = this.posY.toString() + "px";
        this.image.style.width = this.width + "px";
        this.image.style.height = this.height + "px";
        this.image.style.zIndex = 1;
    },
	clickMe: function() {
		game.google.quit();
	}
};
game.quitButton.init();

// - Play Scene
//   - Images
game.playBackground = {
    image: document.getElementById("playBackground"),
    org_width: 1923,
    org_height: 1093,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = engine.width;
        this.height = engine.height;
    },
    draw: function () {
        this.resize();
        // drawImage(source, posX, posY, width, height)
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.playTitle = {
    image: document.getElementById("wordFlightTitleSmall"),
    org_width: 488 * game.scale,
    org_height: 110 * game.scale,
    width: 0,
    height: 0,
    org_posX: 10,
    org_posY: 10,
    posX: 10,
    posY: 10,
    resize: function () {
        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);
    },
    draw: function () {
        this.resize();
        // drawImage(source, posX, posY, width, height)
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.playSponsor = {
    image: document.getElementById("wordFlightSponsor"),
    org_width: 290 * game.scale,
    org_height: 295 * game.scale,
    width: 0,
    height: 0,
    org_posX: 1590,
    org_posY: 785,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);

        // Attach Bottom Side
        this.posX = engine.width - this.width - (50 * (1 - engine.widthProportion));
        this.posY = engine.height - this.height;
    },
    draw: function () {
        this.resize();
        // drawImage(source, posX, posY, width, height)
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.playSponsorLogo = {
    image: function () {
        return document.getElementById(game.getSponsor());
    },
    org_width: 200 * game.scale,
    org_height: 200 * game.scale,
    width: 0,
    height: 0,
    org_posX: 1590,
    org_posY: 785,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = game.playSponsor.width * 0.95;
        this.height = this.width;

        // Attach Bottom Side
        this.posX = game.playSponsor.posX + (game.playSponsor.width - this.width) / 2;
        this.posY = game.playSponsor.posY + game.playSponsor.height / 2 - this.height / 3;
    },
    draw: function () {
        this.resize();
        // drawImage(source, posX, posY, width, height)
        engine.context.drawImage(this.image(), this.posX, this.posY, this.width, this.height);
    }
};

game.playTimer = {
    image: document.getElementById("playTimer"),
    org_width: 814 * game.scale,
    org_height: 218 * game.scale,
    width: 0,
    height: 0,
    org_posX: 0,
    org_posY: 342,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);

        // Attach Left Side
        this.posX = this.org_posX;
        this.posY = Math.max(game.playTitle.height + game.playTitle.posY + 10, engine.height / 2 - this.height);
    },
    draw: function () {
        this.resize();
        // drawImage(source, posX, posY, width, height)
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.playLetterSpace = {
    image: document.getElementById("playLetterSpace"),
    org_width: 110 * game.scale,
    org_height: 142 * game.scale,
    width: 0,
    height: 0,
    org_posX: 20,
    org_posY: 0,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);

        // Attach Left Side with Buffer
        this.posX = Math.max(20, Math.min(5, this.org_posX - engine.widthDifference));
        this.posY = Math.max(game.playTimer.height + game.playTimer.posY + 20, engine.height - engine.height / 4 - this.height * 1.2);
    },
    draw: function () {
        this.resize();
        // drawImage(source, posX, posY, width, height)
        //engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.playLetterSpaces = {
    div: document.getElementById("letterSpaces"),
    org_width: 0,
    org_height: 0,
    width: 0,
    height: 0,
    org_posX: 20,
    org_posY: 0,
    posX: 0,
    posY: 0,
    divArray: [],
    keyArray: [],
    btnMargin: 5,
    btnWidth: 0,
    btnHeight: 0,
    btnPerRow: 0,
    lettersFound: 0,
    dict: {},
    add: function (dict, key, value) {
        if (!this.dict[key]) {
            this.dict[key] = [value];
        } else {
            this.dict[key].push(value);
        }
    },
    resize: function () {
        this.width = game.playSponsor.posX - 20;
        this.height = game.playLetterSpace.org_height * (1 - engine.widthProportion); // + this.btnMargin;

        // Attach Left Side with Buffer
        this.posX = Math.max(20, Math.min(5, this.org_posX - engine.widthDifference));
        this.posY = Math.max(game.playTimer.height + game.playTimer.posY + 20, Math.min(game.inputKeypad.posY - this.height - 40), ((game.inputKeypad.posY - (game.playTimer.height + game.playTimer.posY)) / 2));


        this.btnWidth = (this.width - ((2 * this.btnMargin) + ((this.btnPerRow - 1) * (2 * this.btnMargin)))) / (12) - 2;
        this.btnHeight = this.height; //game.playLetterSpace.height;

        for (var i = 0; i < this.keyArray.length; i++) {
            var domElement = document.getElementById(this.keyArray[i]);
            domElement.style.width = this.btnWidth + "px";
            domElement.style.height = domElement.childNodes[1].style.getPropertyValue('height') + "px";
            domElement.childNodes[1].style.fontSize = this.btnWidth * 0.65 + "px";
        }

    },
    adjustStyle: function () {
        if (this.keyArray.length == 0) this.buildKeypad();
        this.resize();
        this.div.style.position = "absolute";
        this.div.style.display = "inline-block";
        this.div.style.left = this.posX.toString() + "px";
        this.div.style.top = this.posY.toString() + "px";
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
        this.div.style.zIndex = 1;
    },
    hideKeypad: function () {
        this.divArray = [];
        this.keyArray = [];
        this.lettersFound = 0;
        this.dict = {};
    },
    buildKeypad: function () {
        var letter = "";

        var divPrefix = '<div id="inputContainerDiv_';
        var btnPrefix = '<img id="inputLetterButton_';
        var innerDivPrefix = '<div id="inputLetterDiv_';
        var buttonBuilder = '';

        this.btnPerRow = game.word.length;

        for (var i = 0; i < this.btnPerRow; i++) {

            letter = game.word.substr(i, 1).toUpperCase();

            // Open outer div
            buttonBuilder += divPrefix + i + '" class="word-spaces-container" style="width:' + (this.div.width / 12) + 'px">';

            // Inner Image
            buttonBuilder += btnPrefix + i + '" class="word-spaces-image" src="images/play_scene/play_empty_space.png">';

            // Open inner div
            buttonBuilder += innerDivPrefix + i + '" class="word-spaces-center-letter">';

            // Write letter
            buttonBuilder += letter;

            // Close inner div
            buttonBuilder += "</div>";

            // Close outer div
            buttonBuilder += "</div>";

            this.keyArray.push("inputContainerDiv_" + i);
            this.add(this.dict, "inputContainerDiv_" + i, letter);
            this.divArray.push(this.dict);
        }

        this.div.innerHTML = buttonBuilder;
    },
    showLetters: function () {
        for (var i = 0; i < this.keyArray.length; i++) {
            var domElement = document.getElementById(this.keyArray[i]).childNodes[1];
            domElement.style.display = "block";
        }
    },
    testLetter: function (input) {
        var increaseBy = 0;
        for (var i = 0; i < this.keyArray.length; i++) {
            if (input == this.dict[this.keyArray[i]]) {

                // Increment the number of letters found
                this.lettersFound++;

                // Unhide the discovered letter
                var domElement = document.getElementById(this.keyArray[i]).childNodes[1];
                domElement.style.display = "block";

                // Draw plane parts
                game.planeManager.draw();

                // Increment score
                if (this.lettersFound == this.keyArray.length) {
                    increaseBy = Math.floor(12 / (12 - this.lettersFound)) * 3;
                    game.playScoreBox.updateScore("Plane", increaseBy);
                } else {
                    increaseBy = 10;
                    game.playScoreBox.updateScore("Letter", increaseBy);
                }
                game.score += increaseBy;
                game.playScore.updateScore();
            }
        }

        // Notify the game that all letters have been found
        if (this.lettersFound >= this.keyArray.length) {
            game.readyForNextWord = true;
        }
    }
};

//   - Plane Parts
game.planeCanvasBG = {
    image: document.getElementById("letterButton_"),
    org_width: 110 * game.scale,
    org_height: 142 * game.scale,
    width: 0,
    height: 0,
    org_posX: 20,
    org_posY: 0,
    posX: 0,
    posY: 0,
    animPosX: 0,
    animPosY: 0,
    resize: function () {
        this.height = Math.max(engine.height * 0.5, (game.playSponsor.posY - 20) - (game.playMenuButton.posY + game.playMenuButton.height + 20));
        this.width = Math.min(this.height, (engine.width - 20) - (game.playTimer.width + 20));
        this.height = this.width;

        this.posX = engine.width - this.width - 20;
        this.posY = ((game.playSponsor.posY - 20) + (game.playMenuButton.posY + game.playMenuButton.height + 20)) / 2 - this.height / 2;

        // Check for animation
        this.posX = Math.max(this.posX, this.posX + this.animPosX);
        this.posY = Math.max(this.posY, this.posY + this.animPosY);
    },
    draw: function () {
        this.resize();
        // drawImage(source, posX, posY, width, height)
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.playPlaneDorsalFin = {
    image: document.getElementById("playPlaneDorsalFin"),
    org_width: 186 * game.scale * game.planeScale,
    org_height: 30 * game.scale * game.planeScale,
    description: "Dorsal Fin",
    width: 0,
    height: 0,
    org_posX: 20,
    org_posY: 0,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);

        // Attach Left Side with Buffer
        this.posX = game.playPlaneTail.posX - this.width / 4;
        this.posY = (game.playPlaneTail.posY + game.playPlaneTail.height / 2) - this.height / 2;
    },
    draw: function () {
        this.resize();
        // drawImage(source, posX, posY, width, height)
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.playPlaneLeftInnerEngine = {
    image: document.getElementById("playPlaneEngine"),
    org_width: 80 * game.scale * game.planeScale,
    org_height: 50 * game.scale * game.planeScale,
    description: "Left Inner Engine",
    width: 0,
    height: 0,
    org_posX: 20,
    org_posY: 0,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);

        // Attach Left Side with Buffer
        this.posX = game.playPlaneLeftWing.posX + (game.playPlaneLeftWing.width / 1.5) - this.width / 2;
        this.posY = (game.playPlaneLeftWing.posY + game.playPlaneLeftWing.height * 0.625) - this.height / 2;
    },
    draw: function () {
        this.resize();
        // drawImage(source, posX, posY, width, height)
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.playPlaneLeftOuterEngine = {
    image: document.getElementById("playPlaneEngine"),
    org_width: 80 * game.scale * game.planeScale,
    org_height: 50 * game.scale * game.planeScale,
    description: "Left Outer Engine",
    width: 0,
    height: 0,
    org_posX: 20,
    org_posY: 0,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);

        // Attach Left Side with Buffer
        this.posX = game.playPlaneLeftWing.posX + (game.playPlaneLeftWing.width / 2) - this.width / 3;
        this.posY = (game.playPlaneLeftWing.posY + game.playPlaneLeftWing.height * 0.45) - this.height / 2;
    },
    draw: function () {
        this.resize();
        // drawImage(source, posX, posY, width, height)
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.playPlaneRightInnerEngine = {
    image: document.getElementById("playPlaneEngine"),
    org_width: 80 * game.scale * game.planeScale,
    org_height: 50 * game.scale * game.planeScale,
    description: "Right Inner Engine",
    width: 0,
    height: 0,
    org_posX: 20,
    org_posY: 0,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);

        // Attach Left Side with Buffer
        this.posX = game.playPlaneRightWing.posX + (game.playPlaneRightWing.width / 1.5) - this.width / 2;
        this.posY = (game.playPlaneRightWing.posY + game.playPlaneRightWing.height * 0.375) - this.height / 2;
    },
    draw: function () {
        this.resize();
        // drawImage(source, posX, posY, width, height)
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.playPlaneRightOuterEngine = {
    image: document.getElementById("playPlaneEngine"),
    org_width: 80 * game.scale * game.planeScale,
    org_height: 50 * game.scale * game.planeScale,
    description: "Right Outer Engine",
    width: 0,
    height: 0,
    org_posX: 20,
    org_posY: 0,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);

        // Attach Left Side with Buffer
        this.posX = game.playPlaneRightWing.posX + (game.playPlaneRightWing.width / 2) - this.width / 3;
        this.posY = (game.playPlaneRightWing.posY + game.playPlaneRightWing.height * 0.55) - this.height / 2;
    },
    draw: function () {
        this.resize();
        // drawImage(source, posX, posY, width, height)
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.playPlaneFuselage = {
    image: document.getElementById("playPlaneFuselage"),
    org_width: 401 * game.scale * game.planeScale,
    org_height: 130 * game.scale * game.planeScale,
    description: "Fuselage",
    width: 0,
    height: 0,
    org_posX: 20,
    org_posY: 0,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);

        this.posX = game.playPlaneNose.posX - this.width;
        this.posY = (game.playPlaneNose.posY);
    },
    draw: function () {
        this.resize();
        // drawImage(source, posX, posY, width, height)
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.playPlaneLeftRearWing = {
    image: document.getElementById("playPlaneLeftRearWing"),
    org_width: 186 * game.scale * game.planeScale,
    org_height: 130 * game.scale * game.planeScale,
    description: "Left Rear Wing",
    width: 0,
    height: 0,
    org_posX: 20,
    org_posY: 0,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);

        // Attach Left Side with Buffer
        this.posX = game.playPlaneTail.posX - this.width / 4;
        this.posY = (game.playPlaneTail.posY + game.playPlaneTail.height / 2) - this.height;
    },
    draw: function () {
        this.resize();
        // drawImage(source, posX, posY, width, height)
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.playPlaneLeftWing = {
    image: document.getElementById("playPlaneLeftWing"),
    org_width: 286 * game.scale * game.planeScale,
    org_height: 360 * game.scale * game.planeScale,
    description: "Left Wing",
    width: 0,
    height: 0,
    org_posX: 20,
    org_posY: 0,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);

        // Attach Left Side with Buffer
        this.posX = game.playPlaneFuselage.posX + (game.playPlaneFuselage.width * 0.2);
        this.posY = (game.playPlaneFuselage.posY + game.playPlaneFuselage.height / 2) - this.height;
    },
    draw: function () {
        this.resize();
        // drawImage(source, posX, posY, width, height)
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.playPlaneNose = {
    image: document.getElementById("playPlaneNose"),
    org_width: 160 * game.scale * game.planeScale,
    org_height: 130 * game.scale * game.planeScale,
    description: "Nose",
    width: 0,
    height: 0,
    org_posX: 20,
    org_posY: 0,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);

        // Attach Left Side with Buffer
        this.posX = game.planeCanvasBG.posX + game.planeCanvasBG.width - 20 - this.width;
        this.posY = (game.planeCanvasBG.posY + game.planeCanvasBG.height) / 2;
    },
    draw: function () {
        this.resize();
        // drawImage(source, posX, posY, width, height)
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.playPlaneRightRearWing = {
    image: document.getElementById("playPlaneRightRearWing"),
    org_width: 186 * game.scale * game.planeScale,
    org_height: 130 * game.scale * game.planeScale,
    description: "Right Rear Wing",
    width: 0,
    height: 0,
    org_posX: 20,
    org_posY: 0,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);

        // Attach Left Side with Buffer
        this.posX = game.playPlaneTail.posX - this.width / 4;
        this.posY = (game.playPlaneTail.posY + game.playPlaneTail.height / 2);
    },
    draw: function () {
        this.resize();
        // drawImage(source, posX, posY, width, height)
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.playPlaneRightWing = {
    image: document.getElementById("playPlaneRightWing"),
    org_width: 289 * game.scale * game.planeScale,
    org_height: 360 * game.scale * game.planeScale,
    description: "Right Wing",
    width: 0,
    height: 0,
    org_posX: 20,
    org_posY: 0,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);

        // Attach Left Side with Buffer
        this.posX = game.playPlaneFuselage.posX + (game.playPlaneFuselage.width * 0.2);
        this.posY = (game.playPlaneFuselage.posY + game.playPlaneFuselage.height / 2);
    },
    draw: function () {
        this.resize();
        // drawImage(source, posX, posY, width, height)
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.playPlaneTail = {
    image: document.getElementById("playPlaneTail"),
    org_width: 138 * game.scale * game.planeScale,
    org_height: 130 * game.scale * game.planeScale,
    description: "Tail",
    width: 0,
    height: 0,
    org_posX: 20,
    org_posY: 0,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);

        // Attach Left Side with Buffer
        this.posX = game.playPlaneFuselage.posX - this.width;
        this.posY = (game.playPlaneFuselage.posY);
    },
    draw: function () {
        this.resize();
        // drawImage(source, posX, posY, width, height)
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

//   - Plane Manager
game.planeManager = {
    initialized: false,
    planeParts: [],
    partsDisplayed: 0,
    animVelocity: 0.0,
    animAcceleration: 0.01,
    animNewX: 0.0,
    initialize: function () {
        if (!this.initialized) {
            this.planeParts.push(game.playPlaneLeftInnerEngine);
            this.planeParts.push(game.playPlaneLeftOuterEngine);
            this.planeParts.push(game.playPlaneRightInnerEngine);
            this.planeParts.push(game.playPlaneRightOuterEngine);
            this.planeParts.push(game.playPlaneLeftRearWing);
            this.planeParts.push(game.playPlaneRightRearWing);
            this.planeParts.push(game.playPlaneLeftWing);
            this.planeParts.push(game.playPlaneRightWing);
            this.planeParts.push(game.playPlaneNose);
            this.planeParts.push(game.playPlaneFuselage);
            this.planeParts.push(game.playPlaneTail);
            this.planeParts.push(game.playPlaneDorsalFin);
            this.initialized = true;
        }
    },
    draw: function () {

        // Redraw background images
        game.playBackground.draw();
        game.playTitle.draw();
        game.playSponsor.draw();
        game.playSponsorLogo.draw();
        game.playTimer.draw();
        game.playLetterSpace.draw();
        game.planeCanvasBG.draw();

        // Get the number of parts to render
        var parts = Math.round((game.playLetterSpaces.lettersFound / game.playLetterSpaces.keyArray.length) * this.planeParts.length);

        // Draw all necessary parts
        for (var i = 0; i < parts; i++) {
            if (i < this.planeParts.length) {
                this.planeParts[i].draw();
            }
        }
    },
    animate: function (dt) {
        var deltaTime = dt;

        // Increase acceleration every frame
        this.animAcceleration += 0.1 + Math.min(dt * this.animAcceleration, 0.9);
        // Increase velocity every frame based on acceleration * time
        this.animVelocity += this.animAcceleration * deltaTime;
        // Increase position every fame based on velocity * time
        this.animNewX += this.animVelocity * deltaTime;

        // Animate each plane part every frame
        game.planeCanvasBG.animPosX += this.animNewX;

        this.draw();
        if (game.playPlaneTail.posX > engine.width + 100) {
            return true;
        } else {
            return false;
        }
    },
    resetElements: function () {
        // Reset plane manager
        this.initialized = false;
        this.planeParts = [];
        this.animAcceleration = 0.01;
        this.animVelocity = 0.0;
        this.animNewX = 0.0;

        // Reset plane canvas
        game.planeCanvasBG.posX = 0;
        game.planeCanvasBG.posY = 0;
        game.planeCanvasBG.animPosX = 0;
        game.planeCanvasBG.animPosY = 0;

        // Reset all plane parts
        game.planeManager.planeParts.forEach(function (item, index) {

            item.posX = 0.0;
        })
    }
};

game.playTimerBox = {
    div: document.getElementById("timerBox"),
    org_width: 200 * game.scale,
    org_height: 95 * game.scale,
    width: 0,
    height: 0,
    org_posX: 150,
    org_posY: 82,
    posX: 0,
    posY: 0,
    org_font_size: 74,
    font_size: 0,
    timeStart: null,
    timeEnd: null,
    timeSeconds: null,
    timerStarted: false,
    timerExpired: false,
    timerDisplay: '',
    resize: function () {

        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);

        // Attach Left Side
        this.posX = game.playTimer.posX + this.org_posX * (1 - engine.widthProportion);
        this.posY = game.playTimer.posY + this.org_posY * (1 - engine.widthProportion);

        // Adjust font size
        this.font_size = this.org_font_size * (1 - engine.widthProportion);
    },
    draw: function () {
        this.adjustStyle();
    },
    adjustStyle: function () {
        this.resize();
        this.div.style.position = "absolute";
        this.div.style.display = "block";
        this.div.style.left = this.posX.toString() + "px";
        this.div.style.top = this.posY.toString() + "px";
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
        this.div.style.fontSize = this.font_size + "pt";
        this.div.style.zIndex = 4;
    },
    update: function () {
        // Handle timer events
        if (!this.timerStarted) {
            // Start the timer if it hasn't been started yet
            this.startTimer();
        } else {
            // Update the time
            this.updateTime();
            // Display the timer
            this.displayTimer();
            // Expire the timer if less than 0 seconds remain
            if ((this.timeSeconds) <= 0) {
                this.expireTimer();
            }
        }
    },
    startTimer: function () {
        // Flag timer as started
        this.timerStarted = true;
        // Set the start time
        this.timeStart = Date.now();
        // Set the end time
        this.timeEnd = Date.now() + game.playTime;
    },
    displayTimer: function () {
        // Display time in MM:SS format
        if ((this.timeSeconds) >= 0) {
            this.timerDisplay = "0" + Math.floor(this.timeSeconds / 60) + ":" + ((this.timeSeconds % 60) < 10 ? "0" : "") + (this.timeSeconds % 60);
        } else {
            this.timerDisplay = "00:00";
        }
        // Display the time
        this.div.innerHTML = this.timerDisplay;

        // Flash the timer when less than 10 seconds are left
        if ((this.timeSeconds) <= 10) {
            this.div.classList.remove("pulse");
            this.div.classList.add("glow");
        } else if (this.div.getAttribute("class") === 'glow') {
            this.div.classList.remove("glow");
        }
    },
    updateTime: function () {
        // Set the countdown in seconds
        this.timeSeconds = Math.round((this.timeEnd - Date.now()) / 1000);
    },
    resetTimer: function () {
        // Reset all timer variables
        this.timeStart = null;
        this.timeEnd = null;
        this.timeSeconds = null;
        this.timerStarted = false;
        this.timerExpired = false;
        this.timerDisplay = '';
    },
    expireTimer: function () {
        // Flag the timer as expired
        this.timerExpired = true;
    }
};

game.playScore = {
    div: document.getElementById("scoreBox"),
    org_width: 325 * game.scale,
    org_height: 95 * game.scale,
    width: 0,
    height: 0,
    org_posX: 450,
    org_posY: 82,
    posX: 0,
    posY: 0,
    org_font_size: 74,
    font_size: 0,
    score: 0,
    resize: function () {

        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);

        // Attach Left Side
        this.posX = game.playTimer.posX + this.org_posX * (1 - engine.widthProportion);
        this.posY = game.playTimer.posY + this.org_posY * (1 - engine.widthProportion);

        // Adjust font size
        this.font_size = this.org_font_size * (1 - engine.widthProportion);
    },
    draw: function () {
        this.updateScore();
        this.adjustStyle();
    },
    adjustStyle: function () {
        this.resize();
        this.div.style.position = "absolute";
        this.div.style.display = "block";
        this.div.style.left = this.posX.toString() + "px";
        this.div.style.top = this.posY.toString() + "px";
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
        this.div.style.fontSize = this.font_size + "pt";
        this.div.style.zIndex = 4;
    },
    updateScore: function () {
        this.score = Math.max(0, game.score);
        this.div.innerHTML = this.score;
        game.player.score = this.score;
    }
};

game.playScoreBox = {
    div: document.getElementById("newScore"),
    org_width: 325 * game.scale,
    org_height: 95 * game.scale,
    width: 0,
    height: 0,
    org_posX: 450,
    org_posY: 82,
    posX: 0,
    posY: 0,
    org_destX: 550,
    org_destY: 240,
    org_font_size: 74,
    font_size: 0,
    animSpeed: 0,
    animStartX: 0,
    animStartY: 0,
    animEndX: 0,
    animEndY: 0,
    animActive: false,
    resize: function () {

        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);

        // Attach Left Side
        this.posX = game.playTimer.posX + this.org_posX * (1 - engine.widthProportion);
        this.posY = game.playTimer.posY - this.org_posY * (1 - engine.widthProportion);

        // Adjust font size
        this.font_size = this.org_font_size * (1 - engine.widthProportion);

        // Animation adjustments
        this.animStartX = game.playTimer.posX + this.org_posX * (1 - engine.widthProportion);
        this.animStartY = game.playTimer.posY - this.org_posY * (1 - engine.widthProportion);
        this.animEndX = game.playTimer.posX + this.org_destX * (1 - engine.widthProportion);
        this.animEndY = game.playTimer.posY - this.org_destY * (1 - engine.widthProportion);

    },
    draw: function () {
        this.adjustStyle();
    },
    adjustStyle: function () {
        this.div.style.left = this.posX.toString() + "px";
        this.div.style.top = this.posY.toString() + "px";
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
        this.div.style.fontSize = this.font_size + "pt";
        this.div.style.zIndex = 4;
    },
    updateScore: function (type, value) {
        var displayString = "";
        displayString += type + "<br>";
        if (value > 0) {
            displayString += "+" + value;
        } else {
            displayString += value;
        }
        this.div.innerHTML = displayString;
        this.div.style.display = "block";
        this.animActive = true;
    },
    resetElements: function () {
        this.resize();
        this.animSpeed = 0;
        this.div.style.display = "none";
    },
    animate: function (dt) {
        this.animSpeed += dt / (this.animEndX - this.animStartX);
        this.posX += (this.animEndX - this.animStartX) * this.animSpeed;
        this.posY += (this.animEndY - this.animStartY) * this.animSpeed;

        // Force redraw
        this.draw();
        // Deactivate animation
        if (this.posX > this.animEndX) {
            this.animActive = false;
            this.resetElements();
        }
    }
};

//   - Buttons
game.playMenuButton = {
    image: document.getElementById("wordFlightMenuButton"),
    org_width: 275 * game.scale,
    org_height: 138 * game.scale,
    width: 0,
    height: 0,
    org_posX: 1645,
    org_posY: 942,
    posX: 0,
    posY: 0,
    resize: function () {

        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);

        // Attach Top-Right Side
        this.posX = engine.width - this.width;
        this.posY = Math.max(5, Math.min(5, this.org_posY - engine.heightDifference));
    },
    draw: function () {
        this.adjustStyle();
    },
    adjustStyle: function () {
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

game.playKeyPadSpace = {
    image: document.getElementById("letterButton_"),
    org_width: 94 * game.scale,
    org_height: 102 * game.scale,
    width: 0,
    height: 0,
    org_posX: 60,
    org_posY: 0,
    posX: 0,
    posY: 0,
    resize: function () {

        this.width = this.org_width * (1 - engine.widthProportion); //Math.min(, (this.org_width + 5) * 13);
        this.height = this.org_height * (1 - engine.widthProportion);

        // Attach Left Side with Buffer
        this.posX = Math.max(60, Math.min(60, this.org_posX - engine.widthDifference));
        this.posY = Math.max(game.playLetterSpace.height + game.playLetterSpace.posY + 40, engine.height - this.height * 2.2);
    },
    draw: function () {
        this.resize();
    },
    adjustStyle: function () {
        this.resize();
    }
};

game.inputKeypad = {
    div: document.getElementById("inputKeypad"),
    initials: document.getElementById("endPlayerInitials"),
    org_width: 0,
    org_height: 0,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    divArray: [],
    keyArray: [],
    btnMargin: 5,
    btnWidth: 0,
    btnHeight: 0,
    btnPerRow: 0,
    resize: function () {
        switch (game.currState) {
            case 'play':
                this.width = game.playSponsor.posX - 40;
                this.height = (game.playKeyPadSpace.org_height * (1 - engine.widthProportion) + this.btnMargin) * 2;

                // Attach Left Side with Buffer
                this.posX = Math.max(10, (game.playSponsor.posX - this.width) / 2);
                this.posY = Math.min(game.playLetterSpace.height + game.playLetterSpace.posY + 40, engine.height - this.height - 40);

                this.btnWidth = this.width / 13;

                for (var i = 0; i < this.keyArray.length; i++) {
                    var domElement = document.getElementById(this.keyArray[i]);
                    domElement.style.width = this.btnWidth + "px";
                    domElement.style.height = domElement.childNodes[1].style.getPropertyValue('height') + "px";
                    domElement.childNodes[1].style.fontSize = this.btnWidth * 0.50 + "px";
                }
                break;
            case 'end':
                this.width = game.endKeyboardBackground.width - 40 - game.endSubmitButton.width;
                this.height = engine.height - game.endKeyboardBackground.posY - 15;

                // Attach to Top-Left of Keyboard Background
                this.posX = game.endKeyboardBackground.posX + 10;
                this.posY = game.endKeyboardBackground.posY + 10;

                this.btnWidth = this.width / 13;

                for (var i = 0; i < this.keyArray.length; i++) {
                    var domElement = document.getElementById(this.keyArray[i]);
                    domElement.style.width = this.btnWidth + "px";
                    domElement.style.height = domElement.childNodes[1].style.getPropertyValue('height') + "px";
                    domElement.childNodes[1].style.fontSize = this.btnWidth * 0.50 + "px";
                }
                break;
            default:
                break;
        }
    },
    adjustStyle: function () {
        if (this.keyArray.length == 0) this.buildKeypad();
        this.resize();
        this.div.style.position = "absolute";
        this.div.style.display = "inline-block";
        this.div.style.left = this.posX.toString() + "px";
        this.div.style.top = this.posY.toString() + "px";
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
        this.div.style.zIndex = 1;
    },
    hideKeypad: function () {
        this.divArray = [];
        this.keyArray = [];
    },
    buildKeypad: function () {
        var letter = "";

        var divPrefix = '<div id="containerDiv_';
        var btnPrefix = '<img id="letterButton_';
        var innerDivPrefix = '<div id="letterDiv_';
        var buttonBuilder = '';

        for (var i = 0; i < 26; i++) {

            letter = String.fromCharCode(65 + i);

            // Open outer div
            switch (game.currState) {
                case 'play':
                    buttonBuilder += divPrefix + letter + '" class="keypad-container" style="width:' + (this.width / 13) + 'px">';
                    break;
                case 'end':
                    buttonBuilder += divPrefix + letter + '" class="keypad-container" style="width:' + (this.width / 13) + 'px">';
                    break;
            }

            // Inner Image
            buttonBuilder += btnPrefix + letter + '" class="keypad-image" src="images/key_blank.png">';

            // Open inner div
            buttonBuilder += innerDivPrefix + letter + '" class="keypad-center-letter">';

            // Write letter
            buttonBuilder += letter;

            // Close inner div
            buttonBuilder += "</div>";

            // Close outer div
            buttonBuilder += "</div>";

            if (i == 12) {
                buttonBuilder += "<br>";
            }

            this.keyArray.push("containerDiv_" + String.fromCharCode(65 + i));
        }
        this.btnPerRow = Math.ceil(this.keyArray.length / 2);

        this.div.innerHTML = buttonBuilder;

        var imgElement = this.div.getElementsByTagName("img");
        for (var i = 0; i < imgElement.length; i++) {
            if (imgElement[i].id.substring(0, 13) == "letterButton_") {
                for (var j = 0; j < 26; j++) {
                    var letter = "letterButton_" + String.fromCharCode(65 + j);
                    if (imgElement[i].id == letter) {
                        imgElement[i].name = String.fromCharCode(65 + j);
                        imgElement[i].addEventListener("click", function (e) {

                            // Reset timeout overlay timer
                            game.timeoutOverlay.refreshTimer();

                            switch (game.currState) {
                                case 'play':
                                    if (e.srcElement.parentNode.childNodes[1].getAttribute("class") === 'keypad-center-letter') {

                                        // Set key letter to inactve
                                        e.srcElement.parentNode.childNodes[1].classList.remove("keypad-center-letter");
                                        e.srcElement.parentNode.childNodes[1].classList.add("keypad-center-letter-inactive");

                                        // Set key image to inactive
                                        e.srcElement.classList.remove("keypad-image");
                                        e.srcElement.classList.add("keypad-image-inactive");

                                        // Test letter with chosen word
                                        game.playLetterSpaces.testLetter(e.srcElement.name);
                                    }
                                    break;
                                case 'end':
                                    game.endPlayerInitials.updateInitials(e.srcElement.parentNode.childNodes[1].name);
                                    break;
                            }
                        });
                        continue;
                    }
                }
            }
        }

        var divElement = this.div.getElementsByTagName("div");
        for (var i = 0; i < divElement.length; i++) {
            if (divElement[i].id.substring(0, 10) == "letterDiv_") {
                for (var j = 0; j < 26; j++) {
                    var letter = "letterDiv_" + String.fromCharCode(65 + j);
                    if (divElement[i].id == letter) {
                        divElement[i].name = String.fromCharCode(65 + j);
                        divElement[i].addEventListener("click", function (e) {

                            // Reset timeout overlay timer
                            game.timeoutOverlay.refreshTimer();

                            switch (game.currState) {
                                case 'play':
                                    if (e.srcElement.getAttribute("class") === 'keypad-center-letter') {

                                        // Set key letter to inactve
                                        e.srcElement.classList.remove("keypad-center-letter");
                                        e.srcElement.classList.add("keypad-center-letter-inactive");

                                        // Set key image to inactive
                                        e.srcElement.parentNode.childNodes[0].classList.remove("keypad-image");
                                        e.srcElement.parentNode.childNodes[0].classList.add("keypad-image-inactive");

                                        // Test letter with chosen word
                                        game.playLetterSpaces.testLetter(e.srcElement.name);
                                    }
                                    break;
                                case 'end':
                                    game.endPlayerInitials.updateInitials(e.srcElement.parentNode.childNodes[0].name);
                                    break;
                            }
                        });
                        continue;
                    }
                }
            }
        }
    }
};

// - End Scene
//   - Images
game.wordFlightTitleSmall = {
    image: document.getElementById("wordFlightTitleSmall"),
    org_width: 488 * game.scale,
    org_height: 118 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);
        this.posX = 10 * (1 - engine.widthProportion);
        this.posY = 10 * (1 - engine.widthProportion);
    },
    draw: function () {
        this.resize();
        // drawImage(source, posX, posY, width, height)
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.endBackground = {
    image: document.getElementById("endBackground"),
    org_width: 1920 * game.scale,
    org_height: 1080 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = engine.width;
        this.height = engine.height;
    },
    draw: function () {
        this.resize();
        //drawImage(source, posX, posY, width, height)
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.endGameOver = {
    image: document.getElementById("endGameOver"),
    org_width: 750 * game.scale,
    org_height: 205 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    poxY: 0,
    resize: function () {

        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);

        this.posX = engine.width / 2 - this.width / 2;
        this.posY = game.endGamePoints.posY / 3;
    },
    draw: function () {
        this.resize();
        //drawImage(source, posX, posY, width, height)
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.endGamePoints = {
    image: document.getElementById("endGamePoints"),
    org_width: 613 * game.scale,
    org_height: 342 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);
        this.posX = engine.width / 2 - this.width / 2;
        this.posY = (game.endKeyboardBackground.posY * .6) - this.height / 2;
    },
    draw: function () {
        this.resize();
        //drawImage(source, posX, posY, width, height)
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.endInitials = {
    image: document.getElementById("endInitials"),
    org_width: 811 * game.scale,
    org_height: 103 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    poxY: 0,
    resize: function () {
        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);
        this.posX = engine.width / 2 - this.width / 2;
        this.posY = game.endKeyboardBackground.posY - (game.endKeyboardBackground.posY - (game.endGamePoints.posY + game.endGamePoints.height));
    },
    draw: function () {
        this.resize();
        //drawImage(source, posX, posY, width, height)
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.endKeyboardBackground = {
    image: document.getElementById("endKeyboardBackground"),
    org_width: 1557 * game.scale,
    org_height: 283 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);
        this.posX = engine.width / 2 - this.width / 2;
        this.posY = engine.height - this.height;
    },
    draw: function () {
        this.resize();
        //drawImage(source, posX, poxY, width, height)
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.endKeyboardKeys = {
    image: document.getElementById("endKeyboardKeys"),
    org_width: 1222 * game.scale,
    org_height: 221 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);
        this.posX = game.endKeyboardBackground.posX + 10;
        this.posY = game.endKeyboardBackground.posY + 10;
    },
    draw: function () {
        this.resize();
        //drawImage(source, posX, posY, width, height)
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.endPlayerScore = {
    div: document.getElementById("endPlayerScore"),
    org_width: 150 * game.scale,
    org_height: 95 * game.scale,
    width: 0,
    height: 0,
    org_posX: 325,
    org_posY: 82,
    posX: 0,
    posY: 0,
    org_font_size: 74,
    font_size: 0,
    score: 0,
    resize: function () {

        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);

        // Attach Left Side
        this.posX = game.endGamePoints.posX + game.endGamePoints.width / 2 - this.width / 2;
        this.posY = game.endGamePoints.posY + game.endGamePoints.height / 2 - this.height / 2;

        // Adjust font size
        this.font_size = this.org_font_size * (1 - engine.widthProportion);
    },
    draw: function () {
        this.updateScore();
        this.adjustStyle();
    },
    adjustStyle: function () {
        this.resize();
        this.div.style.position = "absolute";
        this.div.style.display = "block";
        this.div.style.left = this.posX.toString() + "px";
        this.div.style.top = this.posY.toString() + "px";
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
        this.div.style.fontSize = this.font_size + "pt";
        this.div.style.zIndex = 4;
    },
    updateScore: function () {
        this.score = Math.max(0, game.player.score);
        this.div.innerHTML = this.score;
    }
};

game.endPlayerInitials = {
    div: document.getElementById("endPlayerInitials"),
    org_width: 150 * game.scale,
    org_height: 95 * game.scale,
    width: 0,
    height: 0,
    org_posX: 325,
    org_posY: 82,
    posX: 0,
    posY: 0,
    org_font_size: 48,
    font_size: 0,
    score: 0,
    initials: "",
    resize: function () {

        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);

        // Attach Left Side
        this.posX = game.endInitials.posX + (game.endInitials.width * .7);
        this.posY = game.endInitials.posY + (game.endInitials.height * .15);

        // Adjust font size
        this.font_size = this.org_font_size * (1 - engine.widthProportion);
    },
    draw: function () {
        // this.updateInitials();
        this.adjustStyle();
    },
    adjustStyle: function () {
        this.resize();
        this.div.style.position = "absolute";
        this.div.style.display = "block";
        this.div.style.left = this.posX.toString() + "px";
        this.div.style.top = this.posY.toString() + "px";
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
        this.div.style.fontSize = this.font_size + "pt";
        this.div.style.zIndex = 4;
    },
    updateInitials: function (letter) {
        if (this.initials.length < 2 && this.initials != "") {
            this.initials += letter;
        } else {
            this.initials = letter;
        }
        this.div.innerHTML = this.initials;
        game.player.initials = this.initials;
    },
    clearInitials: function () {
        this.initials = "";
        this.div.innerHTML = this.initials;
    }
};

//   - Buttons
game.endMenuButton = {
    image: document.getElementById("wordFlightMenuButton"),
    org_width: 275 * game.scale,
    org_height: 138 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = this.org_width * (1 - engine.dimensionProportion);
        this.height = this.org_height * (1 - engine.dimensionProportion);
        this.posX = engine.width - this.width; // this.org_posX - engine.widthDifference;
        this.posY = 50 * (1 - engine.dimensionProportion);
    },
    draw: function () {
        this.adjustStyle();
    },
    adjustStyle: function () {
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

game.endSubmitButton = {
    image: document.getElementById("submitButton"),
    org_width: 265 * game.scale,
    org_height: 107 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
	init: function () {
        // Add event listener to the button
        this.image.addEventListener("click", game.endSubmitButton.clickMe);
    },
    resize: function () {
        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);
        this.posX = game.endKeyboardBackground.posX + (game.endKeyboardBackground.width - this.width) - 10;
        this.posY = game.endKeyboardBackground.posY + (game.endKeyboardBackground.height - this.height) / 2;
    },
    draw: function () {
        this.adjustStyle();
    },
    adjustStyle: function () {
        this.resize();
        this.image.style.position = "absolute";
        this.image.style.display = "block";
        this.image.style.left = this.posX.toString() + "px";
        this.image.style.top = this.posY.toString() + "px";
        this.image.style.width = this.width + "px";
        this.image.style.height = this.height + "px";
        this.image.style.zIndex = 1;
    },
	clickMe: function () {
        console.log("User: " + game.player.initials);
        console.log("Score: " + game.player.score);
        //AJAX
        var ajax = new XMLHttpRequest();
        ajax.open("GET", "scripts/insert_score.php?u="+game.player.initials+"&s="+game.player.score, true);
        ajax.send();

        ajax.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
            }
        }

		game.google.finish();
	}
};
game.endSubmitButton.init();

// - Leaderboard Scene
//   - Images
game.leaderboardBackground = {
    image: document.getElementById("leaderboardBackground"),
    org_width: 1923,
    org_height: 1093,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = engine.width;
        this.height = engine.height;
    },
    draw: function () {
        this.resize();
        // drawImage(source, posX, posY, width, height)
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.leaderboardPlane = {
    image: document.getElementById("leaderboardPlane"),
    org_width: 1096,
    org_heigth: 456,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = 876 * (1 - engine.widthProportion);
        this.height = 364 * (1 - engine.widthProportion);
        this.posX = engine.width - (2300 * (1 - engine.widthProportion));
        this.posY = engine.height - (550 * (1 - engine.heightProportion));
    },
    draw: function () {
        this.resize();
        // drawImage(source, posX, posY, width, height)
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.leaderboardTitle = {
    image: document.getElementById("wordFlightTitleSmall"),
    org_width: 488 * game.scale,
    org_height: 118 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);
        this.posX = 10 * (1 - engine.widthProportion);
        this.posY = 10 * (1 - engine.widthProportion);
    },
    draw: function () {
        this.resize();
        // drawImage(source, posX, posY, width, height)
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.leaderboardClipboard = {
    image: document.getElementById("leaderboardClipboard"),
    org_width: 845 * game.scale,
    org_height: 1018 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = this.org_width * .90 * (1 - engine.widthProportion);
        this.height = this.org_height * .90 * (1 - engine.widthProportion);
        this.posX = engine.width - this.width - (375 * (1 - engine.widthProportion));
        this.posY = 25;
    },
    draw: function () {
        this.resize();
        //drawImage(source, posX, posY, width, height)
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.leaderboardPlayerScore = {
    image: document.getElementById("leaderboardScore"),
    org_width: 613 * game.scale,
    org_height: 342 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);
        this.posX = 10 * (1 - engine.widthProportion);
        this.posY = 230 * (1 - engine.widthProportion);
    },
    draw: function () {
        this.resize();
        //drawImage(source, posX, posY, width, height)
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.leaderboardSponsor = {
    image: document.getElementById("wordFlightSponsor"),
    org_width: 290 * game.scale,
    org_height: 295 * game.scale,
    width: 0,
    height: 0,
    org_posX: 1550,
    org_posY: 825,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = this.org_width * (1 - engine.dimensionProportion);
        this.height = this.org_height * (1 - engine.dimensionProportion);
        this.posX = engine.width - this.width - (50 * (1 - engine.widthProportion));
        this.posY = engine.height - this.height;
    },
    draw: function () {
        this.resize();
        // drawImage(source, posX, posY, width, height)
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.LeadboardSponsorLogo = {
    image: function () {
        return document.getElementById(game.getSponsor());
    },
    org_width: 200 * game.scale,
    org_height: 200 * game.scale,
    width: 0,
    height: 0,
    org_posX: 1590,
    org_posY: 785,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = game.leaderboardSponsor.width * (1 - engine.widthProportion);
        this.height = this.width;

        // Attach Bottom Side
        this.posX = game.leaderboardSponsor.posX + (game.leaderboardSponsor.width - this.width) / 2;
        this.posY = game.leaderboardSponsor.posY + game.leaderboardSponsor.height / 2 - this.height / 3;
    },
    draw: function () {
        this.resize();
        // drawImage(source, posX, posY, width, height)
        engine.context.drawImage(this.image(), this.posX, this.posY, this.width, this.height);
    }
};

game.finalPlayerScore = {
    div: document.getElementById("finalPlayerScore"),
    org_width: 150 * game.scale,
    org_height: 95 * game.scale,
    width: 0,
    height: 0,
    org_posX: 325,
    org_posY: 82,
    posX: 0,
    posY: 0,
    org_font_size: 74,
    font_size: 0,
    score: 0,
    resize: function () {

        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);

        // Attach Left Side
        this.posX = game.leaderboardPlayerScore.posX + game.leaderboardPlayerScore.width / 2 - this.width / 2;
        this.posY = game.leaderboardPlayerScore.posY + game.leaderboardPlayerScore.height / 2 - this.height / 2;

        // Adjust font size
        this.font_size = this.org_font_size * (1 - engine.widthProportion);
    },
    draw: function () {
        this.updateScore();
        this.adjustStyle();
    },
    adjustStyle: function () {
        this.resize();
        this.div.style.position = "absolute";
        this.div.style.display = "block";
        this.div.style.left = this.posX.toString() + "px";
        this.div.style.top = this.posY.toString() + "px";
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
        this.div.style.fontSize = this.font_size + "pt";
        this.div.style.zIndex = 4;
    },
    updateScore: function () {
        this.score = Math.max(0, game.player.score);
        this.div.innerHTML = this.score;
    }
};

//Leaderboard Table

game.top10players = {
    div: document.getElementById("top10table"),
    org_width: 0,
    org_height: 0,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    divArray: [],
    resize: function () {
        this.width = game.leaderboardClipboard.width * .80;
        this.height = game.leaderboardClipboard.height * .75;

        // Attach Left Side with Buffer
        this.posX = game.leaderboardClipboard.posX + (game.leaderboardClipboard.width - this.width) / 2;
        this.posY = game.leaderboardClipboard.posY + game.leaderboardClipboard.height / 2 - (this.height * .28);

    },
    adjustStyle: function () {
        this.buildTable();
        this.resize();
        this.div.style.position = "absolute";
        this.div.style.display = "block";
        this.div.style.left = this.posX.toString() + "px";
        this.div.style.top = this.posY.toString() + "px";
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
        this.div.style.zIndex = 1;
    },
    hideTable: function () {
        this.divArray = [];
    },
    buildTable: function () {
        var place = "";
        var divPrefix = '<div id="containerDiv_';
        var tablePrefix = '<table>';
        var rowPrefix = '<tr>';
        var dataPrefix = '<td';
        var tableBuilder = '';
        var placeHolder = '';
        var scoreHolder = '';

        //AJAX query
        var ajax = new XMLHttpRequest();
        ajax.open("GET", "scripts/leaderboard.php", true);
        ajax.send();

        ajax.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var leaders = JSON.parse(this.responseText);

                for (var i = 0; i < leaders.length; i++) {
                    place = i + 1;

                    placeHolder = leaders[i].user.toString();
                    scoreHolder = leaders[i].score.toString();

                    //open div
                    tableBuilder += divPrefix + place + '" class="table-container" style="width:' + (this.width) + 'px">';

                    //build table row


                    tableBuilder += tablePrefix + rowPrefix + dataPrefix + place + "</td>" + dataPrefix + leaders[i].user + "</td>" + dataPrefix + leaders[i].score + "</td></tr>";

                    if (game.player.initials.toString() == placeHolder && game.player.score.toString() == scoreHolder) {
                        tableBuilder += tablePrefix + rowPrefix + dataPrefix + " style='background-color: #f41c63;'>" + place + "</td>" + dataPrefix + " style='background-color: #f41c63;'>" + leaders[i].user + "</td>" + dataPrefix + " style='background-color: #f41c63;'>" + scoreHolder + "</td></tr>";
                    } else {
                        tableBuilder += tablePrefix + rowPrefix + dataPrefix + ">" + place + "</td>" + dataPrefix + ">" + leaders[i].user + "</td>" + dataPrefix + ">" + scoreHolder + "</td></tr>";
                    }

                }
                //close table
                tableBuilder += "</table>"

                //close div
                tableBuilder += "</div>"

                game.top10players.divArray.push("containerDiv_" + place);
                game.top10players.div.innerHTML = tableBuilder;

            }

        }
    }
};

//   - Buttons
game.leaderboardMenuButton = {
    image: document.getElementById("wordFlightMenuButton"),
    org_width: 275 * game.scale,
    org_height: 138 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = this.org_width * (1 - engine.dimensionProportion);
        this.height = this.org_height * (1 - engine.dimensionProportion);
        this.posX = engine.width - this.width; // this.org_posX - engine.widthDifference;
        this.posY = 50 * (1 - engine.dimensionProportion);
    },
    draw: function () {
        this.adjustStyle();
    },
    adjustStyle: function () {
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

game.leaderboardRetryButton = {
    image: document.getElementById("leaderboardRetryButton"),
    org_width: 265 * game.scale,
    org_height: 107 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
	init: function () {
        // Add event listener to the button
        this.image.addEventListener("click", game.leaderboardRetryButton.retry);
    },
    resize: function () {
        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);
        this.posX = 100 * (1 - engine.widthProportion);
        this.posY = engine.height - this.height - (50 * (1 - engine.dimensionProportion));
    },
    draw: function () {
        this.adjustStyle();
    },
    adjustStyle: function () {
        this.resize();
        this.image.style.position = "absolute";
        this.image.style.display = "block";
        this.image.style.left = this.posX.toString() + "px";
        this.image.style.top = this.posY.toString() + "px";
        this.image.style.width = this.width + "px";
        this.image.style.height = this.height + "px";
        this.image.style.zIndex = 1;
    },
    retry: function () {
		game.google.start();
        game.currState = game.gameState[1];
        game.player.reset();
    }
};
game.leaderboardRetryButton.init();

/* Game States and transitions
 ** -- Start Scene
 ** |\ - Play Scene
 ** |  \ - End Scene
 ** \____\ - Leaderboard Scene
 **        \ - Start Scene
 */
game.gameState = ['start', 'play', 'end', 'leaderboard'];
game.currState = game.gameState[0];

// Clear the screen of all elements
game.hideElements = {
    // Hide images
    images: function () {
        var y = document.getElementsByTagName("img");
        for (var i = 0; i < y.length; i++) {
            y[i].style.display = "none";
        }
        var z = document.getElementsByTagName("div");
        for (var i = 0; i < z.length; i++) {
            z[i].style.display = "none";
        }
    },
    // Hide canvas drawings
    canvas: function () {
        engine.context.clearRect(0, 0, engine.width, engine.height);
    },
    // Hide everything
    hideAll: function () {
        this.images();
        this.canvas();
    }
};

// Maintain live game data (timers, scores, etc.)
game.gameController = {
    gsStart: function (dt) {
        // Start Scene

        // Initialize word/sponsor pairs from database
        if (game.word === "") {
            game.updateWords.update();
        }

        // Toggle next state
        for (var i = 0; i < game.controls.length; i++) {
            if (engine.input.pressed(game.controls[i])) {
                game.score = 0;
                game.player.reset();
                game.getSponsor();
                game.currState = game.gameState[1];
                game.hideElements.hideAll();
                game.drawOnce();
            }
        }
    },
    gsPlay: function (dt) {
        // Play Scene

        // Run the timer
        if (!game.playTimerBox.timerExpired) {
            game.playTimerBox.update();
        } else {
            // Update the player object's score
            game.player.score = game.score;

            // Reset Play Scene objects
            game.updateWords.update();
            game.inputKeypad.hideKeypad();
            game.playLetterSpaces.hideKeypad();
            game.readyForNextWord = false;
            game.planeManager.resetElements();
            game.playTimerBox.resetTimer();

            // Clear the initials on the End Scene
            game.endPlayerInitials.clearInitials();

            // Change to the End Scene state
            game.currState = game.gameState[2];

            // Wipe the canvas
            game.hideElements.hideAll();

            // Draw new objects
            game.drawOnce();
        }


        // Check whether a word is complete
        if (game.readyForNextWord) {

            if (game.planeManager.animate(dt)) {

                // Query new word and sponsor
                game.updateWords.update();

                // Hide all elements - prepare for redraw
                game.hideElements.hideAll();

                // Reset keypad
                game.inputKeypad.hideKeypad();
                game.inputKeypad.adjustStyle();

                // Reset letter spaces
                game.playLetterSpaces.hideKeypad();
                game.playLetterSpaces.adjustStyle();

                // Reset plane
                game.planeManager.resetElements();

                // Prepare for the next word
                game.readyForNextWord = false;

                game.drawOnce();
            }
        }

        // Animate score box
        if (game.playScoreBox.animActive) {
            game.playScoreBox.animate(dt);
        }

        // Toggle next state
        for (var i = 0; i < game.controls.length; i++) {
            if (engine.input.pressed(game.controls[i])) {
                game.updateWords.update();
                game.inputKeypad.hideKeypad();
                game.playLetterSpaces.hideKeypad();
                game.readyForNextWord = false;
                game.planeManager.resetElements();
                game.playTimerBox.resetTimer();
                game.endPlayerInitials.clearInitials();
                game.currState = game.gameState[2];
                game.hideElements.hideAll();
                game.drawOnce();
            }
        }

        // Handle mouse clicks
        for (var i = 0; i < game.mouse.length; i++) {
            if (engine.input.pressed(game.mouse[i])) {
                // alert("Event: " + game.mouse[i].toString());
            }
        }
    },
    gsEnd: function (dt) {
        // End Scene

        // Toggle next state
        for (var i = 0; i < game.controls.length; i++) {
            if (engine.input.pressed(game.controls[i])) {
                game.inputKeypad.hideKeypad();
                game.currState = game.gameState[3];
                game.hideElements.hideAll();
                game.drawOnce();
            }
        }

        // Handle mouse clicks
        for (var i = 0; i < game.mouse.length; i++) {
            if (engine.input.pressed(game.mouse[i])) {
                // alert("Event: " + game.mouse[i].toString());
            }
        }
    },
    gsLeaderboard: function (dt) {
        // Leaderboard Scene

        // Toggle next state
        for (var i = 0; i < game.controls.length; i++) {
            if (engine.input.pressed(game.controls[i])) {
                game.player.reset();
                game.currState = game.gameState[0];
                game.hideElements.hideAll();
                game.drawOnce();
            }
        }
    }
};

// Update
game.update = function (dt) {
    // Monitor game states
    switch (game.currState) {
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

    // Montior window sizes
    if (this.oldWidth != engine.width || this.oldHeight != engine.height) {
        this.drawOnce();
        this.oldWidth = engine.width;
        this.oldHeight = engine.height;
    }

    // Maintain Game Timeout
    game.timeoutOverlay.update(dt);

    // Handle mouse clicks
    for (var i = 0; i < game.mouse.length; i++) {
        if (engine.input.pressed(game.mouse[i])) {
            game.timeoutOverlay.refreshTimer();
        }
    }
};

// Draw functions
// - Static
//   - Draw static assets once, if they are active

game.drawOnce = function () {
    // Draw based on the GameState
    switch (this.currState) {
        case 'start':
            // Draw images on the canvas
            this.startRunway.draw();
            this.startHangar.draw();
            this.wordFlightTitle.draw();
            // Display buttons
            this.startButton.adjustStyle();
            this.leaderboardButton.adjustStyle();
            this.quitButton.adjustStyle();
            this.menuButton.adjustStyle();
            break;
        case 'play':
            // Draw images on the canvas
            this.playBackground.draw();
            this.playTitle.draw();
            this.playSponsor.draw();
            this.playSponsorLogo.draw();
            this.playTimer.draw();
            this.playLetterSpace.draw();
            this.playTimerBox.draw();
            this.playScore.draw();
            this.playScoreBox.resize();
            // Display plane parts
            this.planeCanvasBG.draw();
            this.playPlaneNose.resize();
            this.playPlaneFuselage.resize();
            this.playPlaneTail.resize();
            this.playPlaneDorsalFin.resize();
            this.playPlaneLeftRearWing.resize();
            this.playPlaneLeftWing.resize();
            this.playPlaneRightRearWing.resize();
            this.playPlaneRightWing.resize();
            this.playPlaneLeftInnerEngine.resize();
            this.playPlaneLeftOuterEngine.resize();
            this.playPlaneRightInnerEngine.resize();
            this.playPlaneRightOuterEngine.resize();

            // Initialize plane manager
            this.planeManager.initialize();
            this.planeManager.draw();

            // Display buttons
            this.playMenuButton.adjustStyle();
            this.playKeyPadSpace.adjustStyle();
            this.inputKeypad.adjustStyle();
            this.playLetterSpaces.adjustStyle();
            this.inputKeypad.adjustStyle();
            break;
        case 'end':
            // Draw images on the canvas
            this.endBackground.draw();
            this.endKeyboardBackground.draw();
            this.endGamePoints.draw();
            this.endInitials.draw();

            // this.endKeyboardKeys.draw();

            this.wordFlightTitleSmall.draw();

            this.endPlayerScore.draw();
            this.endPlayerInitials.draw();

            this.endGameOver.draw();
            // Display buttons
            this.endSubmitButton.adjustStyle();
            this.endMenuButton.adjustStyle();
            this.inputKeypad.adjustStyle();
            break;
        case 'leaderboard':
            // Draw images on the canvas
            this.leaderboardBackground.draw();
            this.leaderboardTitle.draw();

            this.leaderboardSponsor.draw();
            this.leaderboardClipboard.draw();
            this.leaderboardPlayerScore.draw();
            this.leaderboardPlane.draw();
            this.LeadboardSponsorLogo.draw();
            this.top10players.adjustStyle();
            this.finalPlayerScore.draw();
            // Display buttons
            this.leaderboardMenuButton.adjustStyle();
            this.leaderboardRetryButton.adjustStyle();
            break;
        default:
            break;
    }
    // DEBUG
    console.log("<GAME> Loaded Scene: " + this.currState);
};
//   - First draw event
window.onload = function () {
    game.drawOnce();
}

// - Animation
//   - Draw animations
game.draw = function () {

    // Draw based on the GameState
    switch (this.currState) {
        case 'start':
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
window.onblur = function () {
    return game.stop();
};

// Gain focus
window.onfocus = function () {
    return game.run();
};

// Run Game
game.run();
