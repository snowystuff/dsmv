var b_close = document.getElementById('window_close');
var b_max = document.getElementById('window_maximize');
var b_min = document.getElementById('window_minimize');

var platform = window.electron.platform

b_close.addEventListener('click', () => {
	window.electron.send('winClose');
});

b_min.addEventListener('click', () => {
	window.electron.send('winMinimize');
});

b_max.addEventListener('click', () => {
	window.electron.send('winMaximize');
});

if (platform === 'darwin') {
	b_close.style.display = 'none';
	b_max.style.display = 'none';
	b_min.style.display = 'none';
}