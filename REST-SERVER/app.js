/**
 * Module dependencies.
 */

var rest_root = __dirname,
    express = require("express"),
    path = require("path"),
    http = require('http');

//var express = require('express');
//var http = require('http');
//var path = require('path');
//var logger = require('logger').getLogger('server', 'info');
//var socketio = require('socket.io');
//var restapi = require('pokerrestapi');

var app = express();

// Config


/* app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(application_root, "public")));
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
}); */

// Routes

app.get('/api', function(req, res) {
    res.send('Ecomm API is running');
});

// Launch server 
// var port = process.env.PORT || 8080;
app.listen(8080, function() {
    console.log("Listening on " + port);
});