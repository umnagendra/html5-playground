/**
 * HTML5 Playground
 * File:	node-chat.js
 * Author:	Nagendra U M
 */

// THIS IS THE SIMPLE CHAT SERVER CODE THAT USES WEBSOCKETS
// TO RELAY BASIC TEXT MESSAGES TO CLIENTS WHO ARE CONNECTED

// Inspired by https://gist.github.com/2031681

process.title = 'node-chat';
SERVERNAME = 'namahesh-lnx';

// run the websocket server on port 3000
var serverPort = 3000;

var webSocketServer = require('websocket').server;
var http = require('http');

// global vars
var clients = [ ];	// list of connected clients

// HTTP Server
var server = http.createServer(function(request, response) {
	// Not important for us. We're writing WebSocket server, not HTTP server
});

// start server
server.listen(serverPort, function() {
	console.log((new Date()) + " - " + process.title + " - STARTED");
	console.log((new Date()) + " - " + process.title + " - is listening on port " + serverPort);
});

// WebSocket server
var wsServer = new webSocketServer({
	// WebSocket server is tied to the HTTP server.
	httpServer: server
});

// callback to handle client connection requests
wsServer.on('request', function(request) {
	console.log((new Date()) + " - " + process.title + " - Received connection request from " + request.origin);
	var connection = request.accept(null, request.origin);
	var index = clients.push(connection) - 1;
	
	var userName = false;
	console.log((new Date()) + " - " + process.title + " - Connection request accepted.");

	// callback to handle incoming messages from client
	connection.on('message', function(message) {
		if (message.type === 'utf8') { // accept only text
			if (userName === false) { // first message sent by user is their name
				// remember user name
				userName = message.utf8Data;
				console.log((new Date()) + " - " + process.title + " - User " + userName + " is logged-in and READY");
				// send welcome message
				var welcomeMsg = "*** Welcome to the HTML5 WebSockets demo chat app ***";
				var welcomeJson = {
					text: welcomeMsg,
					author: SERVERNAME
				};
				connection.sendUTF(JSON.stringify( { type: "message", data: welcomeJson} ));
			} else { // log and broadcast the message
				console.log((new Date()) + " - " + process.title + " - User " + userName + "sent Message [" + message.utf8Data + "]");
			
				// create json object for broadcast to other clients
				var obj = {
					text: message.utf8Data,
					author: userName
				};

				// broadcast
				var json = JSON.stringify({ type:'message', data: obj });
				for (var i=0; i < clients.length; i++) {
					clients[i].sendUTF(json);
				}
			}
		}
	});

	// callback to handle client disconnections
	connection.on('close', function(connection) {
		if (userName !== false) {
			console.log((new Date()) + " - " + process.title + " - User " + userName + " disconnected.");
			// remove user from the list of connected clients
			clients.splice(index, 1);
		}
	});
});
