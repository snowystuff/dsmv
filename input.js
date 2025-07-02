i_ok = document.getElementById("input_ok");
i_cancel = document.getElementById("input_cancel");

test_new = document.getElementsByClassName("open_input")[0];

bg = document.getElementById("frame_background");

inpfall = document.getElementsByClassName("input_frame")[0];
inpfen = false;

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

updateFrame(false);