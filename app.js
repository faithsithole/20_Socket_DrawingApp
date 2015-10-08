/*
	Server - the lazy foreman

	The server doesn't do any drawing itself.  It just relays drawing messages
	between all the connected clients.
*/
// Set up Express
var express = require("express");
var app = express();

// Serve public folder
var path = require("path");
var publicPath = path.join(__dirname, "public");
var staticServer = express.static(publicPath);
app.use(staticServer);

// Start server
// Piggyback the socket.io connection over the same server
var envPort = process.env.PORT || 8080;
var server = app.listen(envPort);

var io = require("socket.io")(server);
console.log("new user has connected");

io.on("connection", function (socket) {
	socket.on("player has drawn line", function (p1, p2, colour, thickness) {
	// console.info(p1, p2, colour, thickness);
	socket.broadcast.emit("other player has drawn line", p1, p2, colour, thickness);
	});
});

