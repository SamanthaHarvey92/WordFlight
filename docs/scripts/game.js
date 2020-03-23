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

window.onLoad = function() {
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  var img = document.getElementById("scream");
  ctx.drawImage(img, 10, 10);
}
