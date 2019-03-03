const {app, BrowserWindow} = require('electron');

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 850,
		height: 600,
		show: false,
		autoHideMenuBar: true,
		center: true,
		resizable: false,
		icon: './assets/images/wifi.jpg'
	})

	mainWindow.loadURL(`file://${__dirname}/index.html`);

	mainWindow.once('ready-to-show', () => {
		mainWindow.show()
	})

	mainWindow.on('close', function() {
		mainWindow = null
	})
} 

app.on('ready', createWindow);

app.on('activate', function() {
	if(mainWindow === null) {
		createWindow()
	}		
})