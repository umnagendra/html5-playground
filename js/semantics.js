/**
 * HTML5 Playground
 * File:	semantics.js
 * Author:	Nagendra U M
 */

function thingsToDoOnload() {

}

function updateProgressBar() {
	$('#progressbar').val($('#progressPercentage').val());
}

function updateMeter() {
	$('#meterbar').val($('#meterInput').val());
}

function clearAutocompleteText() {
	$('#mafiaMember').val('');
}

function putAutocompleteText() {
	if($('#mafiaMember').val() == '') {
		$('#mafiaMember').val('start typing to see auto-complete suggestions...');
	}
}

function updateRange() {
	$('#rangeOutput').text($('#rangeInput').val());
}

function updateColor() {
	$('#colorOutput').css('background-color', $('#colorInput').val());
	$('#colorOutput').text($('#colorInput').val());
}