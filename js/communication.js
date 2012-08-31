/**
 * HTML5 Playground
 * File:	communication.js
 * Author:	Nagendra U M
 */

// global variable to count ticks
var tickValue = 0;

function thingsToDoOnload() {
	$('#chatbox').hide();
	$('#newmessage').hide();
	$('#status').hide();
}

function tick() {
	tickValue++;
	if (tickValue % 1000 == 0) {
		var dd = new Date();
		console.log(dd.getHours() + ":" + dd.getMinutes() + ":"
				+ dd.getSeconds() + ":" + dd.getMilliseconds() + " - "
				+ "tick(): Ticking to " + tickValue);
	}
}

function blockingTick() {
	for (var i = 0; i<1000000; i++) {
		setTimeout(tick(), 1000);
	}
}

function webWorkerTick() {
	var worker = new Worker('js/worker.js');
	
	// web worker threads are NOT allowed to manipulate the DOM due to security concerns. 
	// Even console.log() and alert() are not defined.
	// They can only communicate to the parent via post message or error message events.
	worker.addEventListener('message', function(e) {
		console.log(e.data);
	}, false);

	worker.postMessage('bolt');
}

// using this jQuery timer implementation: http://code.google.com/p/jquery-timer/
// below code taken from Jason Chavannes' demo page: http://jchavannes.com/jquery-timer/demo

var startstopTimer, startstopCurrent = 0;

$(document).ready(function() {
	startstopTimer = $.timer(function() {
		var min = parseInt(startstopCurrent / 6000);
		var sec = parseInt(startstopCurrent / 100) - (min * 60);
		var micro = pad(startstopCurrent - (sec * 100) - (min * 6000), 2);
		var output = "00";
		if (min > 0) {
			output = pad(min, 2);
		}
		$('.startstoptime').html(output + ":" + pad(sec, 2) + ":" + micro);
		startstopCurrent += 7;
	}, 70, true);
});

//Padding function
function pad(number, length) {
	var str = '' + number;
	while (str.length < length) {
		str = '0' + str;
	}
	return str;
}

// WebSocket client code
// Inspired by https://gist.github.com/2031681

// Server Hostname/IP
var serverName = "namahesh-lnx";

// Server Port
var serverPort = 3000;

//my name sent to the server
var myName = false;

function initializeWebSocketChat() {
	
    var chatbox = $('#chatbox');
    var newmessage = $('#newmessage');
    var status = $('#status');
    
	// if user is running mozilla then use it's built-in WebSocket
	window.WebSocket = window.WebSocket || window.MozWebSocket;

	// open connection
	var connection = new WebSocket('ws://' + serverName + ':' + serverPort);

	connection.onopen = function() {
		newmessage.removeAttr('disabled');
		status.text('Your name:');
		console.log("Connection opened with WebSocket server on namahesh-lnx");
		chatbox.show();
		newmessage.show();
		status.show();
		$('#launchwebsocketchat').hide();
		showNotification("Connection opened with WebSocket server on namahesh-lnx");
	};

	connection.onerror = function(error) {
		console.log("ERROR connecting to WebSocket server on namahesh-lnx: " + error);
		showNotification("ERROR connecting to WebSocket server on namahesh-lnx");
	};

	// process incoming responses
	connection.onmessage = function(message) {
		try {
			var json = JSON.parse(message.data);
		} catch (e) {
			console.log("ERROR parsing response: This doesn't look like a valid JSON: ", message.data);
			return;
		}
		// handle incoming message
		if (json.type === "message") {
			newmessage.removeAttr('disabled');
			addMessage(json.data.author, json.data.text);
		} else {
			console.log("Hmm..., I've never seen JSON like this: ", json);
		}
	};
	
	// send message when user presses return
	newmessage.keydown(function(e) {
		if (e.keyCode === 13) {
			var msg = $(this).val();
			if (!msg) {
				return;
			}
			// send the message as an ordinary text
			connection.send(msg);
			$(this).val('');
			// disable the input field to make the user wait until server
			// sends back response
			//newmessage.attr('disabled', 'disabled');

			// we know that the first message sent from a user their name
			if (myName === false) {
				myName = msg;
				status.text('Your Message:');
			}
		}
	});
}

//add message into chat window
function addMessage(author, message) {
	if(author == myName) {
		$('#chatbox').append('<p class="myMsg"><span>me</span>' + ': ' + message + '</p>');
	} else {
		$('#chatbox').append('<p class="otherMsg"><span style="font-weight: bold;">' + author + '</span>' + ': ' + message + '</p>');
	}
}
