const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		minWidth:640,
		minHeight:480,
		titleBarStyle: 'hidden',
		nodeIntegration: true,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js')
		}
	});

	win.loadFile('main.html');
  
	ipcMain.on('winClose', () => {
		win.close();
	});
	
	ipcMain.on('winMinimize', () => {
		win.minimize();
	});
	
	ipcMain.on('winMaximize', () => {
	   if (!win.isMaximized()) {
		   win.maximize();
	   } else {
		   win.unmaximize();
	   };
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