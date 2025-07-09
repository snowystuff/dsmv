var i_ok = document.getElementsByClassName("input_ok")[0];
var i_cancel = document.getElementsByClassName("input_cancel")[0];

var test_new = document.getElementsByClassName("open_input")[0];
var test_settings = document.getElementsByClassName("open_window")[0];
var test_open = document.getElementsByClassName("open_file")[0];
var test_dir = document.getElementsByClassName("input_directory_button")[0];

var bg = document.getElementById("frame_background");

var inpfall = document.getElementsByClassName("input_frame")[0];
var inpfen = false;

var platform = window.electron.platform;

// Load FILETYPE.JSON
var filetype = {};
fetch('./filetype.json')
    .then(response => response.json())
    .then(data => {
		filetype = data;
});

// INPUTFRAME Functions
function updateFrame(bool,send) {
	if (bool === true || bool === false) {
		inpfen = bool;
	} else {
		inpfen = !inpfen;
	}
	
	if (inpfen === false) {
		bg.style.display = "none";
		inpfall.style.display = "none";
	} else {
		bg.style.display = "block";
		inpfall.style.display = "block";
	}
}

i_ok.addEventListener('click', () => {
	updateFrame(false,true);
});

i_cancel.addEventListener('click', () => {
	updateFrame(false,false);
});

test_new.addEventListener('click', () => {
	updateFrame(true);
});

test_settings.addEventListener('click', () => {
	window.electron.send('debug-spawn-editor');
});

test_open.addEventListener('click', () => {
	window.electron.send('openFile',{title: 'Open DSMV Project',files: [filetype.project]});
});

test_dir.addEventListener('click', () => {
	window.electron.send('openFile',{title: 'Open DSMV Project',directory:true});
});

updateFrame(false);