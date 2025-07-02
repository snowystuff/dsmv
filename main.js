const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

var windowMain;
var windowEditor;

function senderFromEvent(event) {
	return BrowserWindow.fromWebContents(event.sender);
}

function newWindow(preload,w,h,resizable) {
	if (!(resizable === false || resizable === true)) {
		resizable = true;
	}
	w = w || 800
	h = h || 600
	var p = {}
	if (preload === true) {
		p = {preload: path.join(__dirname, 'preload.js')}
	}
	return new BrowserWindow({
		width: w,
		height: h,
		minWidth:640,
		minHeight:480,
		titleBarStyle: 'hidden',
		nodeIntegration: true,
		webPreferences: p,
		resizable: resizable,
		maximizable: resizable
	});
}

const createWindow = () => {
	const win = newWindow(true);
	win.loadFile('main.html');
	
	ipcMain.on('winClose', (e) => {
		senderFromEvent(e).close();
	});
	
	ipcMain.on('winMinimize', (e) => {
		senderFromEvent(e).minimize();
	});
	
	ipcMain.on('winMaximize', (e) => {
	   if (!win.isMaximized()) {
		   senderFromEvent(e).maximize();
	   } else {
		   senderFromEvent(e).unmaximize();
	   };
	});
	
	ipcMain.on('debug-spawn-editor', () => {
		var win2 = newWindow(true,640,480,false);
		win2.loadFile('settings.html');
	});
}

app.whenReady().then(() => {
	createWindow();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});