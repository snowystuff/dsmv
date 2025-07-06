var b_close = document.getElementById('window_close');
var b_max = document.getElementById('window_maximize');
var b_min = document.getElementById('window_minimize');

var platform = window.electron.platform

if (b_close) {
	if (platform === 'darwin') {
		b_close.style.display = 'none';
	}
	b_close.addEventListener('click', () => {
		window.electron.send('winClose');
	});
}

if (b_min) {
	if (platform === 'darwin') {
		b_min.style.display = 'none';
	}
	b_min.addEventListener('click', () => {
		window.electron.send('winMinimize');
	});
}

if (b_max) {
	if (platform === 'darwin') {
		b_min.style.display = 'none';
	}
	b_max.addEventListener('click', () => {
		window.electron.send('winMaximize');
	});
}