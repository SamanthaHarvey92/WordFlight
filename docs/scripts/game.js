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



// Initialize canvas hooks
engine.canvas = document.getElementsByTagName("canvas")[0];
// Set canvas position
engine.canvas.style.position = "absolute";
engine.canvas.style.top = "0";
engine.canvas.style.left = "0";
// Get canvas context
engine.context = engine.canvas.getContext('2d');

var startButton = document.getElementById("startButton");
engine.context.drawImage(startButton, 94 + 1 * 40, 4, 34, 34);





/*

document.onkeydown = atom.input.onkeydown.bind(atom.input);
document.onkeyup = atom.input.onkeyup.bind(atom.input);
document.onmouseup = atom.input.onmouseup.bind(atom.input);
atom.button = {
  LEFT: -1,
  MIDDLE: -2,
  RIGHT: -3,
  WHEELDOWN: -4,
  WHEELUP: -5
};
atom.key = {
  TAB: 9,
  ENTER: 13,
  ESC: 27,
  SPACE: 32,
  LEFT_ARROW: 37,
  UP_ARROW: 38,
  RIGHT_ARROW: 39,
  DOWN_ARROW: 40
};
for (c = 65; c <= 90; c++) {
  atom.key[String.fromCharCode(c)] = c;
}
eventCode = function(e) {
  if (e.type === 'keydown' || e.type === 'keyup') {
    return e.keyCode;
  } else if (e.type === 'mousedown' || e.type === 'mouseup') {
    switch (e.button) {
      case 0:
        return atom.button.LEFT;
      case 1:
        return atom.button.MIDDLE;
      case 2:
        return atom.button.RIGHT;
    }
  } else if (e.type === 'mousewheel') {
    if (e.wheel > 0) {
      return atom.button.WHEELUP;
    } else {
      return atom.button.WHEELDOWN;
    }
  }
};
atom.canvas = document.getElementsByTagName('canvas')[0];
atom.canvas.style.position = "absolute";
atom.canvas.style.top = "0";
atom.canvas.style.left = "0";
atom.context = atom.canvas.getContext('2d');
atom.canvas.onmousemove = atom.input.onmousemove.bind(atom.input);
atom.canvas.onmousedown = atom.input.onmousedown.bind(atom.input);
atom.canvas.onmouseup = atom.input.onmouseup.bind(atom.input);
atom.canvas.onmousewheel = atom.input.onmousewheel.bind(atom.input);
//atom.canvas.oncontextmenu = atom.input.oncontextmenu.bind(atom.input);
window.onresize = function(e) {
  atom.canvas.width = window.innerWidth;
  atom.canvas.height = window.innerHeight;
  atom.width = atom.canvas.width;
  return atom.height = atom.canvas.height;
};
window.onresize();

// Resize canvas when the window is resized
window.onresize = function(e) {
	dvu	.canvas.width = window.innerWidth;
	dvu.canvas.height = window.innerHeight;
	dvu.width = dvu.canvas.height;
	return dvu.height = dvu.canvas.height;
};

// Initialize game
var game = Object.create(GameObject.prototype);

// Initialize images
game.startButton = document.getElementById("startButton");

window.onLoad = function() {
	
	dvu.context.drawImage(game.imgLife, 94 + 1 * 40, 4, 34, 34);
	/*var ctx = c.getContext("2d");
	var img = document.getElementById("scream");
	ctx.drawImage(img, 250, 100);
	img.style.display = "block";
}


/*
atom.canvas = document.getElementsByTagName('canvas')[0];
atom.canvas.style.position = "absolute";
atom.canvas.style.top = "0";
atom.canvas.style.left = "0";
atom.context = atom.canvas.getContext('2d');
atom.canvas.onmousemove = atom.input.onmousemove.bind(atom.input);
atom.canvas.onmousedown = atom.input.onmousedown.bind(atom.input);
atom.canvas.onmouseup = atom.input.onmouseup.bind(atom.input);
atom.canvas.onmousewheel = atom.input.onmousewheel.bind(atom.input);
//atom.canvas.oncontextmenu = atom.input.oncontextmenu.bind(atom.input);
window.onresize = function(e) {
  atom.canvas.width = window.innerWidth;
  atom.canvas.height = window.innerHeight;
  atom.width = atom.canvas.width;
  return atom.height = atom.canvas.height;
};*/