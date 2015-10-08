function Marker (colour, thickness) {
	this.colour = colour;
	this.thickness = thickness;
}

Marker.prototype.drawLine = function(p1, p2) {
	stroke(this.colour.h, this.colour.s, this.colour.b);
	strokeWeight(this.thickness);
	line(p1.x, p1.y, p2.x, p2.y);
}