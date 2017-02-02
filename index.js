const electron = require('electron');
const url = require('url');
const path = require('path');
const {app, BrowserWindow} = electron;

app.on('ready', () => {
	var mainWindow = new BrowserWindow({
		width: 800,
		height: 600
	});

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'static', 'index.html'),
		slashes: true,
		protocol: 'file:'
	}));
});