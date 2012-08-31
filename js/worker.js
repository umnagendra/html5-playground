/**
 * HTML5 Playground
 * File:	worker.js
 * Author:	Nagendra U M
 */

// simple js sleep implementation
// http://www.phpied.com/sleep-in-javascript/
function sleep(milliseconds) {
	var start = new Date().getTime();
	for ( var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds) {
			break;
		}
	}
}

self.addEventListener('message', function(e) {
	for ( var i = 0; i < 10000; i++) {
		sleep(500);
		var dd = new Date();
		var log = dd.getHours() + ":" + dd.getMinutes() + ":"
				+ dd.getSeconds() + ":" + dd.getMilliseconds() + " - "
				+ "Web Worker (" + self + ") Ticking to " + i;
		self.postMessage(log);
	}
}, false);