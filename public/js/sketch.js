/*

	Client-side Drawing Board

	p5 Hints
	========
	mouseIsPressed, mouseButton, LEFT, RIGHT
	http://p5js.org/reference/#/p5/mouseButton
*/

var socket = io();
var color;
var newMarker;
var eraser;

function setup() {
	createCanvas(windowWidth, windowHeight);
	var backColour = {
		h: 0,
		s: 0,
		b: 0
	};
	background(backColour.h, backColour.s, backColour.b);
	colorMode(HSB, 360, 100, 100, 1);
	strokeCap(ROUND);
	color = {
		h: random(0, 360),
		s: 100,
		b: 100
	};

	newMarker = new Marker(color, 10);
	eraser = new Marker(backColour, 30);
}

function draw() {
	var p1 = {x: pmouseX, y: pmouseY};
	var p2 = {x: mouseX, y: mouseY};

	if (mouseIsPressed) {
		if(mouseButton === LEFT) {
			newMarker.drawLine(p1, p2);
			socket.emit("player has drawn line", p1, p2, newMarker.colour, newMarker.thickness);
			// console.log(newMarker.thickness);
		}
		else if(mouseButton === RIGHT) {
			eraser.drawLine(p1, p2);
		}
	}
}

socket.on("other player has drawn line", function (p1, p2, colour, thickness) {
	var marker = new Marker(colour, thickness);
	marker.drawLine(p1, p2);
	// console.log(colour);
});