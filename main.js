const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('node:path');

var windowMain;
var windowEditor;

function senderFromEvent(event) {
	return BrowserWindow.fromWebContents(event.sender);
}

async function openFile(tags) {
	let filter = []
	var title;
	var files = [];
	if (tags) {
		title = tags.title;
		files = tags.files || [];
	}
	for (let i = 0; i < files.length; i++) {
		filter.push({name:files[i][1],extensions:files[i][0]});
	}
	let file = await dialog.showOpenDialog({
		properties: ['openFile'],
		title: title,
		filters: filter
		})
	if (file.canceled) { return }
	return file.filePaths;
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
	
	ipcMain.on('error', (event,error) => {
		console.log('error: ' + error);
	});
	
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
	
	ipcMain.on('openFile', (event,tags) => {
		openFile(tags).then(
			(result) => {
				console.log(result);
			}
		);
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