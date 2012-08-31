/**
 * HTML5 Playground
 * File:	main.js
 * Author:	Nagendra U M
 */

function showBrowserSupport() {
	$('#supportedHtml5FeaturesList').empty();
	var supportedList = document.getElementById("supportedHtml5FeaturesList");
	if(Modernizr.audio) {
		createList(supportedList, "HTML5 Audio: SUPPORTED");
	} else {
		createList(supportedList, "HTML5 Audio: NOT SUPPORTED");
	}
	if(Modernizr.video) {
		createList(supportedList, "HTML5 Video: SUPPORTED");
	} else {
		createList(supportedList, "HTML5 Video: NOT SUPPORTED");
	}
	if(Modernizr.canvas) {
		createList(supportedList, "HTML5 Canvas: SUPPORTED");
	} else {
		createList(supportedList, "HTML5 Canvas: NOT SUPPORTED");
	}
	if(Modernizr.cssanimations) {
		createList(supportedList, "HTML5 CSS Animations: SUPPORTED");
	} else {
		createList(supportedList, "HTML5 CSS Animations: NOT SUPPORTED");
	}
	if(Modernizr.csstransforms) {
		createList(supportedList, "HTML5 CSS Transforms: SUPPORTED");
	} else {
		createList(supportedList, "HTML5 CSS Transforms: NOT SUPPORTED");
	}
	if(Modernizr.geolocation) {
		createList(supportedList, "HTML5 Geolocation: SUPPORTED");
	} else {
		createList(supportedList, "HTML5 Geolocation: NOT SUPPORTED");
	}
	if(Modernizr.localstorage) {
		createList(supportedList, "HTML5 Local Storage: SUPPORTED");
	} else {
		createList(supportedList, "HTML5 Local Storage: NOT SUPPORTED");
	}
	if(Modernizr.sessionstorage) {
		createList(supportedList, "HTML5 Session Storage: SUPPORTED");
	} else {
		createList(supportedList, "HTML5 Session Storage: NOT SUPPORTED");
	}
	if(Modernizr.websqldatabase) {
		createList(supportedList, "HTML5 Web SQL Database: SUPPORTED");
	} else {
		createList(supportedList, "HTML5 Web SQL Database: NOT SUPPORTED");
	}
	if(Modernizr.websockets) {
		createList(supportedList, "HTML5 Websockets: SUPPORTED");
	} else {
		createList(supportedList, "HTML5 Websockets: NOT SUPPORTED");
	}
	if(Modernizr.draganddrop) {
		createList(supportedList, "HTML5 Drag and Drop: SUPPORTED");
	} else {
		createList(supportedList, "HTML5 Drag and Drop: NOT SUPPORTED");
	}
}

function createList(supportedList, textContent) {
	var liElement = document.createElement("li");
	var textContents = document.createTextNode(textContent);
	liElement.appendChild(textContents);
	supportedList.appendChild(liElement);
}

function showNotification(message) {
	if (window.webkitNotifications.checkPermission() == 0) {
		var notification = window.webkitNotifications.createNotification('http://aux4.iconpedia.net/uploads/868888537436999746.png', 'Nagendra\'s HTML5 Demo', message);
		notification.show();
		setTimeout(function() {
			notification.cancel();
		}, '20000');
	} else {
		window.webkitNotifications.requestPermission(showNotification);
	}
}