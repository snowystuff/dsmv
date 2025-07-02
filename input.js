var i_ok = document.getElementById("input_ok");
var i_cancel = document.getElementById("input_cancel");

var test_new = document.getElementsByClassName("open_input")[0];
var test_settings = document.getElementsByClassName("open_window")[0];

var bg = document.getElementById("frame_background");

var inpfall = document.getElementsByClassName("input_frame")[0];
var inpfen = false;

var platform = window.electron.platform

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

updateFrame(false);