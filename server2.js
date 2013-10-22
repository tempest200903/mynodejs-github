#!/bin/env node

console.log("begin server2.js");

//  OpenShift sample Node application
var http = require('http');

//Get the environment variables we need.
var ipaddr  = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port    = process.env.OPENSHIFT_NODEJS_PORT || 8080;

http.createServer(function (req, res) {
    var addr = "unknown";
    var out = "";
    if (req.headers.hasOwnProperty('x-forwarded-for')) {
	addr = req.headers['x-forwarded-for'];
    } else if (req.headers.hasOwnProperty('remote-addr')){
	addr = req.headers['remote-addr'];
    }
    if (req.headers.hasOwnProperty('accept')) {
	if (req.headers['accept'].toLowerCase() == "application/json") {
	    res.writeHead(200, {'Content-Type': 'application/json'});
	    res.end(JSON.stringify({'ip': addr}, null, 4) + "\n");
	    return ;
	}
    }

    if(req.url == "/index.html"){
	var fs = require('fs');
	var file_location = "./index.html";
	file_location = "f:/goat-pc-data/programming/openshift/mynodejs/index.html";
	var content = fs.readFileSync(file_location);
	console.log("content =: {\n\n" + content + "\n}\n");
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end(content);
    }

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write("Welcome to Node.js on OpenShift! (2013-10-21 15:41)\n\n");
    res.write("server2.js\n\n");
    res.end("Your IP address seems to be " + addr + "\n");
}).listen(port, ipaddr);
console.log("Server running at http://" + ipaddr + ":" + port + "/");

console.log("end server2.js");

