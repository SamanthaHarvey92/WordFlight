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
game.word = "";
game.sponsor = "";
game.sponsorId = "";
// - Browser size monitors
game.oldWidth = 0;
game.oldHeight = 0;

// Game functions

// Database - Pull random word with its sponsor
game.databaseQuery = function () {
    // AJAX query

    // Set word variable
    game.word = "newspaper";

    // Set sponsor variable
    game.sponsor = "bsmooth";
}

game.pullTop10 = function () {

}

// Get the sponsor
game.getSponsor = function () {
    switch (this.sponsor) {
        case "argo":
            this.sponsorId = "sponsorArgo";
            break;
        case "auntieannes":
            this.sponsorId = "sponsorAuntieAnnes";
            break;
        case "brookstone":
            this.sponsorId = "sponsorBrookstone";
            break;
        case "bsmooth":
            this.sponsorId = "sponsorBSmooth";
            break;
        case "burritobeach":
            this.sponsorId = "sponsorBurritoBeach";
            break;
        case "chicagosports":
            this.sponsorId = "sponsorChicagoSports";
            break;
        case "cnn":
            this.sponsorId = "sponsorCNN";
            break;
        case "coach":
            this.sponsorId = "sponsorCoach";
            break;
        case "dunkindonuts":
            this.sponsorId = "sponsorDunkinDonuts";
            break;
        case "dutyfreestore":
            this.sponsorId = "sponsorDutyFreeStore";
            break;
        case "field":
            this.sponsorId = "sponsorField";
            break;
        case "hudson":
            this.sponsorId = "sponsorHudson";
            break;
        case "maccosmetics":
            this.sponsorId = "sponsorMacCosmetics";
            break;
        case "nutsonclark":
            this.sponsorId = "sponsorNutsOnClark";
            break;
        case "rockymountainchocolate":
            this.sponsorId = "sponsorRockyMountainChocolate";
            break;
        case "sarahscandies":
            this.sponsorId = "sponsorSarahsCandies";
            break;
        case "shoehospital":
            this.sponsorId = "sponsorShoeHospital";
            break;
        case "spiritoftheredhorse":
            this.sponsorId = "sponsorSpiritOfTheRedHorse";
            break;
        case "talie":
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
    resize: function () {
        this.width = this.org_width * 2 * (1 - engine.dimensionProportion);
        this.height = this.org_height * 2 * (1 - engine.dimensionProportion);
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
    }
};

game.startButton = {
    image: document.getElementById("startButton"),
    org_width: 450 * game.scale,
    org_height: 120 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);
        this.posX = engine.width / 2 - this.width / 2;
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
    }
};

game.leaderboardButton = {
    image: document.getElementById("leaderboardButton"),
    org_width: 450 * game.scale,
    org_height: 120 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);
        this.posX = engine.width / 2 - this.width / 2;
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
    }
};

game.quitButton = {
    image: document.getElementById("quitButton"),
    org_width: 450 * game.scale,
    org_height: 120 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);
        this.posX = engine.width / 2 - this.width / 2;
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
    }
};

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
    org_width: 290 * (game.scale + 0.4),
    org_height: 295 * (game.scale + 0.4),
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
        this.width = game.playSponsor.width * (1 - engine.widthProportion);
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
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
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
    resize: function () {
        this.height = Math.max(engine.height * 0.5, (game.playSponsor.posY - 20) - (game.menuButton.posY + game.menuButton.height + 20));
        this.width = Math.min(this.height, (engine.width - 20) - (game.playTimer.width + 20));
        this.height = this.width;

        this.posX = engine.width - this.width - 20;
        this.posY = ((game.playSponsor.posY - 20) + (game.menuButton.posY + game.menuButton.height + 20)) / 2 - this.height / 2;
    },
    draw: function () {
        this.resize();
        // drawImage(source, posX, posY, width, height)
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.playPlaneDorsalFin = {
    image: document.getElementById("playPlaneDorsalFin"),
    org_width: 186 * game.scale * 1.4,
    org_height: 30 * game.scale * 1.4,
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
    org_width: 80 * game.scale * 1.4,
    org_height: 50 * game.scale * 1.4,
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
    org_width: 80 * game.scale * 1.4,
    org_height: 50 * game.scale * 1.4,
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
    org_width: 80 * game.scale * 1.4,
    org_height: 50 * game.scale * 1.4,
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
    org_width: 80 * game.scale * 1.4,
    org_height: 50 * game.scale * 1.4,
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
    org_width: 401 * game.scale * 1.4,
    org_height: 130 * game.scale * 1.4,
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
    org_width: 186 * game.scale * 1.4,
    org_height: 130 * game.scale * 1.4,
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
    org_width: 286 * game.scale * 1.4,
    org_height: 360 * game.scale * 1.4,
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
    org_width: 160 * game.scale * 1.4,
    org_height: 130 * game.scale * 1.4,
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
    org_width: 186 * game.scale * 1.4,
    org_height: 130 * game.scale * 1.4,
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
    org_width: 289 * game.scale * 1.4,
    org_height: 360 * game.scale * 1.4,
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
    org_width: 138 * game.scale * 1.4,
    org_height: 130 * game.scale * 1.4,
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
        console.log("Width: " + this.width);
        this.width = game.playSponsor.posX - 20;
        this.height = (engine.height - (game.playLetterSpace.posY + game.playLetterSpace.height)) * 0.8;

        // Attach Left Side with Buffer
        this.posX = Math.max(10, Math.min(40, game.playSponsor.posX / 2 - this.width / 2));
        this.posY = Math.min(game.playLetterSpace.height + game.playLetterSpace.posY + 40, engine.height - this.height - 40);

        this.btnWidth = (this.width - ((2 * this.btnMargin) + ((this.btnPerRow - 1) * (2 * this.btnMargin)))) / (this.btnPerRow);
        this.btnHeight = game.playKeyPadSpace.org_height * (1 - Math.abs(game.playKeyPadSpace.org_width - this.btnWidth) / game.playKeyPadSpace.org_width);

        for (var i = 0; i < this.keyArray.length; i++) {
            var domElement = document.getElementById(this.keyArray[i]);
            domElement.style.width = this.btnWidth + "px";
            domElement.style.height = this.btnHeight + "px";
            domElement.childNodes[1].style.fontSize = this.btnHeight * 0.45 + "px";
        }
    },
    adjustStyle: function () {
        if (this.keyArray.length == 0) this.buildKeypad();
        this.resize();
        this.div.style.position = "absolute";
        this.div.style.display = "block";
        this.div.style.left = this.posX.toString() + "px";
        this.div.style.top = this.posY.toString() + "px";
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
        this.div.style.zIndex = 1;
    },
    hideKeypad: function () {
        //this.div.style.display = "none";
        this.divArray = [];
        this.keyArray = [];
    },
    buildKeypad: function () {
        var letter = "";

        var divPrefix = '<div id="containerDiv_';
        var btnPrefix = '<img id="letterButton_';
        var innerDivPrefix = '<div id="letterDiv_';
        var buttonBuilder = '';

        //console.log("Building keypad: " + this.keyArray.length);
        for (var i = 0; i < 26; i++) {

            letter = String.fromCharCode(65 + i);
            //console.log("Letter: " + letter);

            // Open outer div
            buttonBuilder += divPrefix + letter + '" class="keypad-container" style="width:' + (this.div.width / 13) + 'px">';

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
                        imgElement[i].addEventListener("click", function (e) {
                            console.log("Clicked: " + e.srcElement.id);
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
                        divElement[i].addEventListener("click", function (e) {
                            console.log("Clicked: " + e.srcElement.id);
                        });
                        continue;
                    }
                }
            }
        }
        console.log("Finished keypad: " + this.keyArray.length);
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
        this.posX = engine.width / 2 - this.width / 2;
        this.posY = 20;
    },
    draw: function () {
        this.resize();
        //drawImage(source, posX, posY, width, height) 
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
        this.poxY = 25;
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
    org_heigt: 342 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    poxY: 0,
    resize: function () {
        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);
        this.posX = engine.width / 2 - this.width / 2;
        this.posY = 30;
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
        this.posY = 35;
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
        this.posY = 40;
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
        this.posX = engine.width / 2 - this.width / 2;
        this.posY = 45;
    },
    draw: function () {
        this.resize();
        //drawImage(source, posX, posY, width, height)
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};
//   - Buttons
game.menuButton = {
    image: document.getElementById("menuButton"),
    org_width: 275 * game.scale,
    org_height: 138 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = this.org_width * 2 * (1 - engine.dimensionProportion);
        this.height = this.org_height * 2 * (1 - engine.dimensionProportion);
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
    }
};

game.submitButton = {
    image: document.getElementById("submitButton"),
    org_width: 265 * game.scale,
    org_height: 107 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);
        this.posX = engine.width / 2 - this.width / 2;
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
    }
};

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
    org_width: 1096 * game.scale,
    org_heigth: 456 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    resize: function () {
        this.width = 1000; //this.org_width * (1- engine.widthProportion);
        this.height = 456; //this.org_height * (1- engine.widthProportion);
        this.posX = 500;
        this.posY = 500; //engine.height - (300 * (1 - engine.heightProportion));
        console.log("Display Plane");
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
        this.width = this.org_width * (1 - engine.widthProportion);
        this.height = this.org_height * (1 - engine.widthProportion);
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

        // Toggle next state
        for (var i = 0; i < game.controls.length; i++) {
            if (engine.input.pressed(game.controls[i])) {
                game.databaseQuery();
                game.getSponsor();
                game.currState = game.gameState[1];
                game.hideElements.hideAll();
                game.drawOnce();
            }
        }
    },
    gsPlay: function (dt) {
        // Play Scene

        // Toggle next state
        for (var i = 0; i < game.controls.length; i++) {
            if (engine.input.pressed(game.controls[i])) {
                game.inputKeypad.hideKeypad();
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
                game.currState = game.gameState[0];
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

            this.playPlaneLeftInnerEngine.draw();
            this.playPlaneLeftOuterEngine.draw();
            this.playPlaneRightInnerEngine.draw();
            this.playPlaneRightOuterEngine.draw();

            this.playPlaneLeftRearWing.draw();
            this.playPlaneLeftWing.draw();
            this.playPlaneRightRearWing.draw();
            this.playPlaneRightWing.draw();

            this.playPlaneNose.draw();
            this.playPlaneFuselage.draw();
            this.playPlaneTail.draw();
            this.playPlaneDorsalFin.draw();
            // Display buttons
            this.playMenuButton.adjustStyle();
            this.playKeyPadSpace.adjustStyle();
            this.inputKeypad.adjustStyle();
            break;
        case 'end':
            // Draw images on the canvas
            this.endBackground.draw();
            this.endGameOver.draw();
            this.endGamePoints.draw();
            this.endInitials.draw();
            this.endKeyboardBackground.draw();
            this.endKeyboardKeys.draw();
            this.wordFlightTitleSmall.draw();
            // Display buttons
            this.submitButton.adjustStyle();
            this.menuButton.adjustStyle();
            break;
        case 'leaderboard':
            // Draw images on the canvas
            this.leaderboardBackground.draw();
            this.leaderboardTitle.draw();
            this.leaderboardPlane.draw();
            this.leaderboardSponsor.draw();
            this.leaderboardClipboard.draw();
            this.leaderboardPlayerScore.draw();
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
