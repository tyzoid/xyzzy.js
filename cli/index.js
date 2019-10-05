"use strict"
const express      = require('express');
const cookieParser = require('cookie-parser')
const commands  = require('./commands.js');

var PYX = express();

PYX.use(express.urlencoded({extended: true}));
PYX.use(cookieParser());
PYX.use(function(req, res, next) {
	var msg = "";

	if (req.body)
		msg += ": " + JSON.stringify(req.body);

	console.log(req.method + " " + req.originalUrl + msg);
	next();
});

// Simple redirect
PYX.get('/', function(req, res) {
	res.redirect('/static');
});

// Legacy command handling
PYX.post('/AjaxServlet', function(req, res) {
	//res.json({op: req.body.o});

	// Set cookie, if not set
	//if (req.cookies.JSESSIONID === undefined)
	//	res.cookie('JSESSIONID', '0F2D447A87DF6C07FE8FB9D1C9C96732', { httpOnly: true });

	// Get command 
	if (typeof commands.legacy[req.body.o] === "function")
		res.json(commands.legacy[req.body.o](req.body));
	else
		res.json({error: "Operation not found"});
});

PYX.post('/LongPollServlet', function(req, res) {
	res.json({error: "Operation not found"});
});

PYX.get('/stats.jsp', function(req, res) {
	res.set('Content-Type', 'text/plain');
	var stats = commands.getStats();

	// Process to plaintext
	var str = "";
	for (let key of Object.keys(stats))
		str += key + " " + stats[key] + "\n";

	res.send(str);
});

PYX.get('/js/cah.config.js', function(req, res) {
	res.set('Content-Type', 'application/javascript');
	var stats = commands.getConfig();

	// Process to plaintext
	var str = "";
	for (let key of Object.keys(stats))
		str += key + " = " + JSON.stringify(stats[key]) + ";\n";

	res.send(str);
});

// Reset, for quickly reloading the server.
PYX.get('/reset', function(req, res) {
	process.exit();
});

PYX.listen(8080, () => console.log("Listening..."));
