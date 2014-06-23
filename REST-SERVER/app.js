/**
 * Module dependencies.
 */

var express = require("express"),
    path = require("path"),
    http = require('http'),
    restapi = require('recyclecalendarapi'),
    app = express(),
    port = process.env.PORT || 8080;

// http functions
var sendErrorWithCode = function(res, httpStatusCode, err) {
    var errorAsJSON = undefined;
    res.statusCode = httpStatusCode;
    if (err) {
        errorAsJSON = {
            "error": err
        };
    }
    res.json(errorAsJSON);
}

// Config
app.set('Content-Type', 'application/json');

// Routes
app.get('/api/helloAPI', function(req, res) {
    restapi.helloAPI(function(jsonObject, err) {
        if (err) {
            sendErrorWithCode(res, 500, err);
        } else {
            res.json(jsonObject);
        }
    })
});

app.get('/api/error', function(req, res) {
    restapi.error(function(jsonObject, err) {
        if (err) {
            sendErrorWithCode(res, 500, err);
        } else {
            res.json(jsonObject);
        }
    })
});

app.get('/routes', function(req, res) {
    var allRoutes = app._router.stack,
        apiRoutes = [],
        aRoute = {};
    console.log(allRoutes.length);

    for (var i = 0; i < allRoutes.length; i++) {
        aRoute = allRoutes[i];
        console.log("Route:" + aRoute);
        if (aRoute.route) {
            console.log("adding route");
            apiRoutes.push(aRoute);
        }
    }
    res.json(apiRoutes);
});

// Launch server 
app.listen(port, function() {
    console.log("Listening on " + port);
});