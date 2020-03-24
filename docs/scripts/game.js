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
for (var i = 0; i < game.keys.length; i++) {
    engine.input.bind(engine.key[game.keys[i]], game.keys[i]);
}

// Image hooks
game.startButton = {
    image: document.getElementById("startButton"),
    org_width: 644,
    org_height: 156,
    width: 0,
    height: 0,
    resize: function() {
        this.width = this.org_width * engine.widthProportion;
        this.height = this.org_height * engine.heightProportion;
    }
};
game.startButton.resize();
// drawImage(source, posX, posY, width, height)
engine.context.drawImage(game.startButton.image, engine.width/2, engine.height/2, game.startButton.width, game.startButton.height); // 644x156



// Update
game.update = function(dt) {

};

// Draw
game.draw = function() {

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
//game.run();