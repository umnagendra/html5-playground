/**
 * HTML5 Playground
 * File:	hardware.js
 * Author:	Nagendra U M
 */

function getLocation() {
	if(Modernizr.geolocation) {
		navigator.geolocation.getCurrentPosition(showLocationOnMap, geolocationErrorHandler, {maximumAge:60000, timeout:10000, enableHighAccuracy:true});
	} else {
		alert("TOO BAD. This browser does not support Geolocation.");
	}
}

function showLocationOnMap(position) {
	$('#textinfo').show();
	$('#maparea').show();
	$('#latitude').text(position.coords.latitude);
	$('#longitude').text(position.coords.longitude);
	if (position.coords.altitude) {
		$('#altitude').text(position.coords.altitude);
	} else {
		$('#altitude').hide();
	}
	if (position.coords.accuracy) {
		$('#accuracy').text(position.coords.accuracy);
	} else {
		$('#accuracy').hide();
	}
	var point = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

	// Settings for the map
	myOptions = {
			zoom : 16,
			center : point,
			mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	
	map = new google.maps.Map(document.getElementById("maparea"), myOptions);
	marker = new google.maps.Marker({
		position : point,
		map : map,
		title : "You are here"
	});
}

function geolocationErrorHandler(error) {
	switch (error.code) {
	case error.TIMEOUT:
		alert("ERROR: Request Timeout. Please try again.");
		break;
	case error.POSITION_UNAVAILABLE:
		alert("ERROR: Position unavailable. Please try again.");
		break;
	case error.PERMISSION_DENIED:
		alert("ERROR: Permission denied. Please try again.");
		break;
	case error.UNKNOWN_ERROR:
		alert("ERROR: Unknown error. Please try again.");
		break;
	}
}

function requestAppQuota() {
	var quotaSuccessMsg = "Persistent filesystem quota created successfully.";
	var quotaFailureMsg = "Failed to create persistent filesystem quota.";
	window.webkitStorageInfo.requestQuota(PERSISTENT, $('#fileSystemSize').val() * 1024*1024, showNotification(quotaSuccessMsg), function(e) {showNotification(quotaFailureMsg);});
}

window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
var fs = null;	// global var to store filesystem reference

function createFileSystem() {
	window.requestFileSystem(window.TEMPORARY, $('#fileSystemSize').val() * 1024*1024, 
							function(filesystem) {
	    						fs = filesystem;
	    						showNotification('Filesystem created !!');
	  						}, 
	  						fileSystemErrorHandler);
}

function fileSystemErrorHandler(e) {
	var msg = '';
	switch (e.code) {
	case FileError.QUOTA_EXCEEDED_ERR:
		msg = 'ERROR: File System Quota Exceeded';
		break;
	case FileError.NOT_FOUND_ERR:
		msg = 'ERROR: File System Not Found';
		break;
	case FileError.SECURITY_ERR:
		msg = 'ERROR: File System Security Error';
		break;
	case FileError.INVALID_MODIFICATION_ERR:
		msg = 'ERROR: Invalid Modification of File System';
		break;
	case FileError.INVALID_STATE_ERR:
		msg = 'ERROR: File System is in Invalid State';
		break;
	default:
		msg = 'ERROR: Unknown Error';
		break;
	};
	showNotification(msg);
}

function handleFileDrop(e) {
    e.stopPropagation();
    e.preventDefault();
    $('#dropzone').css('background','white');
    var file = e.dataTransfer.files[0];
    
    var reader = new FileReader();
    
 // Closure to capture the file information.
    reader.onload = (function(theFile) {
    	return function(e) {
    		console.log("Reading file " + theFile.name);
    		console.log("Contents are: " + e.target.result);
    		$('#popUpDiv').append("<span id = 'fileName' class = 'popup-title'>" + theFile.name + "</span><br/>");
    		
    		$('#popUpDiv').append("<textarea id = 'fileContent' cols = '94' rows = '28' style = 'overflow: scroll'>" + e.target.result + "</textarea><br/>");
    		
    		$('#popUpDiv').append('<input type="button" onclick="saveFileChanges()" value="Save Changes" class = "styled-button"/>');
    		popup('popUpDiv');
    	};
    })(file);
    
    reader.readAsText(file);
}


function saveFileChanges() {
	var fileName = $('#fileName').text();
	console.log('Saving modifications to ' + fileName);
	fs.root.getFile(fileName, {create: true}, function(fileEntry) {
		// Create a FileWriter object for our FileEntry (log.txt).
	    fileEntry.createWriter(function(fileWriter) {

	      fileWriter.onwriteend = function(e) {
	        console.log('Write completed');
	      };

	      fileWriter.onerror = function(e) {
	        console.log('Write failed: ' + e.toString());
	      };

	      // Create a new Blob and write it to log.txt.
	      var bb = new window.WebKitBlobBuilder();
	      bb.append($('#fileContent').val());
	      fileWriter.write(bb.getBlob('text/plain'));
	      $('#popUpDiv').hide();
	      $('#blanket').hide();
	      showNotification('Your changes to ' + fileName + ' are saved successfully.');
	    }, fileSystemErrorHandler);

	  }, fileSystemErrorHandler);
}

function handleFileDragEnter(e) {
	e.stopPropagation();
    e.preventDefault();
    $('#dropzone').css('background','yellow');
}

function handleDragLeave(e) {
	e.stopPropagation();
    e.preventDefault();
    $('#dropzone').css('background','white');
}

function populateDirectoryListing() {
	var dirReader = fs.root.createReader();
	var entries = [];

	// Call the reader.readEntries() until no more results are returned.
	var readEntries = function() {
		dirReader.readEntries(function(results) {
			if (!results.length) {
				listResults(entries.sort());
			} else {
				entries = entries.concat(toArray(results));
				readEntries();
			}
		}, fileSystemErrorHandler);
	};

	readEntries(); // Start reading dirs.
}

function listResults(entries) {
	if($('#fileListUl')) {
		$('#fileListUl').remove();
	}
	var ul = document.createElement('ul');
	ul.setAttribute("id", "fileListUl");
	var fragment = document.createDocumentFragment();
	entries.forEach(function(entry, i) {
		var li = document.createElement('li');
		li.innerHTML = entry.name;
		fragment.appendChild(li);
	});
	ul.appendChild(fragment);
	$('#fileListDiv').append(ul);
	$('#fileListDiv').show();
}

function toArray(list) {
	return Array.prototype.slice.call(list || [], 0);
}

// Code for popup div

function toggle(div_id) {
	var el = document.getElementById(div_id);
	if ( el.style.display == 'none' ) {	
		el.style.display = 'block';
	}
	else {
		el.style.display = 'none';
	}
}

function blanket_size(popUpDivVar) {
	if (typeof window.innerWidth != 'undefined') {
		viewportheight = window.innerHeight;
	} else {
		viewportheight = document.documentElement.clientHeight;
	}
	if ((viewportheight > document.body.parentNode.scrollHeight) && (viewportheight > document.body.parentNode.clientHeight)) {
		blanket_height = viewportheight;
	} else {
		if (document.body.parentNode.clientHeight > document.body.parentNode.scrollHeight) {
			blanket_height = document.body.parentNode.clientHeight;
		} else {
			blanket_height = document.body.parentNode.scrollHeight;
		}
	}
	var blanket = document.getElementById('blanket');
	blanket.style.height = blanket_height + 'px';
	var popUpDiv = document.getElementById(popUpDivVar);
	popUpDiv_height=blanket_height/2-300;// 150 is half popup's height
	popUpDiv.style.top = popUpDiv_height + 'px';
}

function window_pos(popUpDivVar) {
	if (typeof window.innerWidth != 'undefined') {
		viewportwidth = window.innerHeight;
	} else {
		viewportwidth = document.documentElement.clientHeight;
	}
	if ((viewportwidth > document.body.parentNode.scrollWidth) && (viewportwidth > document.body.parentNode.clientWidth)) {
		window_width = viewportwidth;
	} else {
		if (document.body.parentNode.clientWidth > document.body.parentNode.scrollWidth) {
			window_width = document.body.parentNode.clientWidth;
		} else {
			window_width = document.body.parentNode.scrollWidth;
		}
	}
	var popUpDiv = document.getElementById(popUpDivVar);
	window_width=window_width/2-400;// 150 is half popup's width
	popUpDiv.style.left = window_width + 'px';
}

function popup(windowname) {
	blanket_size(windowname);
	window_pos(windowname);
	toggle('blanket');
	toggle(windowname);		
}

// global var to hold mediaStream
var mediaStream = null;

function hasGetUserMedia() {
	return !!(navigator.getUserMedia || navigator.webkitGetUserMedia
			|| navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

function userMediaErrorHandler(e) {
	showNotification('ERROR streaming webcam capture content. Check console logs for more details.');
	console.log('ERROR while streaming webcam capture content: ', e);
	$('#webcamStream').hide();
	$('#cameraStreamButton').show();
	$('#cameraSnapshotButton').hide();
}

function streamWebcam() {
	if(!hasGetUserMedia()) {
		alert('ERROR: This browser version does not support getUserMedia API');
		return;
	}
	$('#webcamStream').show();
	$('#cameraStreamButton').hide();
	$('#cameraSnapshotButton').show();
	navigator.webkitGetUserMedia({video: true, audio: true}, getMediaFromCamera, userMediaErrorHandler);
}

function getMediaFromCamera(localMediaStream) {
	var video = document.querySelector('video');
	video.src = window.webkitURL.createObjectURL(localMediaStream);
	mediaStream = localMediaStream;
}

function exportSnapshot() {
	var video = document.querySelector('video');
	var canvas = document.querySelector('canvas');

	canvas.width = video.width;
	canvas.height = video.height;

	var ctx = canvas.getContext('2d');

	if (mediaStream) {
		ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
		window.open(canvas.toDataURL("image/png"));
	}
}