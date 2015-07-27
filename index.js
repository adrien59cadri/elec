'use strict';
const app = require('app');
const BrowserWindow = require('browser-window');

// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

var ipc = require('ipc');
var fs = require('fs');

var AppDocument = null;

var initDb = function(){
	var DSMongoDBAdapter = require('js-data-mongodb');
	var store = new (require('js-data')).DS();
	var adapter = new DSMongoDBAdapter('mongodb://test:testpwd@ds043358.mongolab.com:43358/test_mongo_db');

	// "store" will now use the MongoDB adapter for all async operations
	store.registerAdapter('mongodb', adapter, { default: true });
	AppDocument = store.defineResource({idAttribute: '_id',  table: 'app_list', name:'app_list'});
}

var processCommand = function(event,command){
	var send_ls_app=function(event){event.sender.send('ls_app_res',AppDocument.getAll());};
	///todo replace with a hash of key?
	var key = command['command'];
	if(key === "log"){
		console.log(command['text']);
	}
	else if (key==="ls"){
		var path = command['path'];
		var res = fs.readdirSync(path);
		console.log(res);
		event.sender.send('ls_res',res);
	}else if(key==="add_app"){
		//for now only github
		AppDocument.create({'app_name':command['app_name'], 'app_github_url':command['app_github_url']})
		.then(function(event){
			send_ls_app(event);
		});
	}else if(key==="ls_app"){
		send_ls_app(event);
	}
};

function createMainWindow () {
	const win = new BrowserWindow({
		width: 1200,
		height: 800,
		resizable: true
	});

	win.loadUrl(`file://${__dirname}/ui/webpage.html`);
	win.on('closed', onClosed);
	
	ipc.on('command',processCommand)
	
	
    // Open the devtools.
 	win.openDevTools();
	 //log app-command calls
	win.on('app-command', function(e, cmd) { console.log("app called app-command: "+cmd);});
	 
	return win;
}


// prevent window being GC'd
let mainWindow;


function onClosed() {
	// deref the window
	// for multiple windows store them in an array
	mainWindow = null;
}


app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate-with-no-open-windows', function () {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});



app.on('ready', function () {
	initDb();
	mainWindow = createMainWindow();

	
});
