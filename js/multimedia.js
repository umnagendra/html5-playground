/**
 * HTML5 Playground
 * File:	multimedia.js
 * Author:	Nagendra U M
 */

function get2dCanvasContext() {
	return document.getElementById("html5canvas").getContext("2d");
}

function resetCanvas() {
	var context = get2dCanvasContext();
	context.width = context.width;
}

function drawRectangle() {
	resetCanvas();
	var context = get2dCanvasContext();
	var height = $('#rectHeight').val();
	var width = $('#rectWidth').val();
	var color = '#EE' + $('#rectColorSlider').val();
	if($('#rectGradient').is(':checked')) {
		$('#rectColorSlider').prop('disabled', true);
		gradient = context.createLinearGradient(5, 5, width, height);
		gradient.addColorStop(0, "blue");
		gradient.addColorStop(1, "yellow");
		context.fillStyle = gradient;
	} else {
		$('#rectColorSlider').prop('disabled', false);
		context.fillStyle = color;
	}
	context.fillRect(5, 5, width, height);
}

function drawCubicBezierCurve() {
	var context = get2dCanvasContext();
	context.beginPath();
	context.moveTo(20, 20);
	context.bezierCurveTo(20, 190, 200, 20, 200,20);
	context.lineWidth = 2;
	context.stroke();
}

function drawText() {
	var context = get2dCanvasContext();
	var x = document.getElementById("html5canvas").width / 2;
	var y = document.getElementById("html5canvas").height / 2;
	
	context.font = "40pt Consolas";
	context.textAlign = "center";
	context.fillStyle = "blue";
	context.fillText($('#canvasText').val(), x, y);
}

function rotateCanvas() {
	var context = get2dCanvasContext();
	var angle = $('#canvasRotateAngle').val();
	context.rotate(angle * Math.PI / 180);
}

function exportCanvas() {
	var canvas = document.getElementById("html5canvas");
	window.open(canvas.toDataURL("image/png"));
}

function fullscreenVideo() {
	var video = document.getElementById("html5video");
	
	// if browser is mozilla firefox
	if(video.mozRequestFullScreen) {
		video.mozRequestFullScreen();
	} else if(video.webkitRequestFullScreen) {
		// if browser is google chrome
		video.webkitRequestFullScreen();
	}
}