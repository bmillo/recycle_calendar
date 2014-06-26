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
    restapi = require('recyclecalendarapi'),
    app = express(),
    port = process.env.PORT || 8080;



// http functions
var sendErrorWithCode = function (res, httpStatusCode, err) {
    var errorAsJSON;
    res.statusCode = httpStatusCode;
    if (err) {
        errorAsJSON = {
            "error": err
        };
    }
    res.json(errorAsJSON);
};

//CORS middleware
var allowCrossDomain = function (req, res, next) {
    /**
     * Response settings
     * @type {Object}
     */
    var responseSettings = {
        "AccessControlAllowOrigin": req.headers.origin,
        "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
        "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
        "AccessControlAllowCredentials": true
    };

    /**
     * Headers
     */
    res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
    res.header("Access-Control-Allow-Origin", responseSettings.AccessControlAllowOrigin);
    res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
    res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);

    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }
}

/*
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
};*/

//Config
app.use(allowCrossDomain);
app.set('Content-Type', 'application/json');

// Routes
app.get('/api/helloAPI', function (req, res) {
    restapi.helloAPI(function (jsonObject, err) {
        if (err) {
            sendErrorWithCode(res, 500, err);
        } else {
            res.json(jsonObject);
        }
    });
});

app.get('/api/error', function (req, res) {
    restapi.error(function (jsonObject, err) {
        if (err) {
            sendErrorWithCode(res, 500, err);
        } else {
            res.json(jsonObject);
        }
    });
});

app.get('/routes', function (req, res) {
    var allRoutes = app._router.stack,
        apiRoutes = [],
        i,
        aRoute = {};
    console.log(allRoutes.length);

    for (i = 0; i < allRoutes.length; i++) {
        aRoute = allRoutes[i];
        console.log("Route:" + aRoute);
        if (aRoute.route) {
            console.log("adding route");
            apiRoutes.push(aRoute);
        }
    }
    res.json(apiRoutes);
});

app.get('/api/cities', function (req, res) {
    console.log("reached city call");
    if (req.param("searchName")) {
        var searchQuery = req.param("searchName");
        restapi.getCitiesByName(searchQuery, function (jsonObject, err) {
            if (err) {
                sendErrorWithCode(res, 500, err);
            } else {
                res.json(jsonObject);
            }
        });
    } else {
        restapi.getAllCities(function (jsonObject, err) {
            if (err) {
                sendErrorWithCode(res, 500, err);
            } else {
                res.json(jsonObject);
            }
        });
    }
});

// Launch server 
app.listen(port, function () {
    console.log("Listening on " + port);
});