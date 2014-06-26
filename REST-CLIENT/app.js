/*jslint node: true */
/*jslint nomen: true*/
/*jslint plusplus: true */
'use strict';

/**
 * Module dependencies.
 */

var express = require("express"),
    path = require("path"),
    http = require('http'),
    app = express(),
    port = process.env.PORT || 4242,
    staticPath = path.join(__dirname, 'public/app');

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,JSON');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }
};

//app.use(allowCrossDomain);
app.use('/', express.static(staticPath));

// Launch server 
app.listen(port, function () {
    console.log("Listening on " + port);
    console.log("static on " + staticPath);
});