/**
 * HTML5 Playground
 * File:	misc.js
 * Author:	Nagendra U M
 */

function thingsToDoOnload() {
	document.addEventListener('webkitvisibilitychange', handleVisibilityChange, false);
	$('#fadeIn').hide();
}

function startPlaying() {
	$('#audioText').css('display', 'block');
}

function handleVisibilityChange() {
	if(document.webkitHidden) {
		$('#pageVisibilityAudio').get(0).pause();
	} else {
		$('#pageVisibilityAudio').get(0).play();
	}
}

function rotateDiv() {
	$('#innerDiv').addClass('rotate');
}

function fadeOut() {
	$('#innerDiv').removeClass('fade-in');
	$('#innerDiv').addClass('fade-out');
	$('#innerDiv').css('opacity','0.0');
	$('#fadeIn').show();
}

function fadeIn() {
	$('#innerDiv').removeClass('fade-out');
	$('#innerDiv').addClass('fade-in');
	$('#innerDiv').css('opacity','1');
}

function applyBoxTransforms() {
	$('#innerDiv').addClass('box-transform');
}