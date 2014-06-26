/*jslint node: true */
/*global describe, expect, it, before, beforeEach, after, afterEach */
'use strict';

var request = require('request'),
    citiesJSON = {
        "cities": [
            {
                "name": "Zürich",
                "zones": [
                    {
                        "description": "Nord"
                },
                    {
                        "description": "Süd"
                }
            ]
        },
            {
                "name": "Zurzach",
                "zones": [
                    {
                        "description": "Nord"
                },
                    {
                        "description": "Süd"
                }
            ]
        },
            {
                "name": "Basel",
                "zones": [
                    {
                        "description": "Nord"
                },
                    {
                        "description": "Süd"
                }
            ]
        }
    ]
    };



describe("recyclecalendarapi", function () {
    it("should respond with hello world json", function (done) {
        request("http://localhost:8080/api/helloAPI", function (error, response, body) {
            expect(body).toEqual('{"Hello":"API"}');
            done();
        });
    });
    it("should respond with an error json", function (done) {
        request("http://localhost:8080/api/error", function (error, response, body) {
            expect(body).toEqual('{"error":{"errorType":"just an example error"}}');
            done();
        });
    });
    it("should respond with two cities", function (done) {
        request("http://localhost:8080/api/cities", function (error, response, body) {
            expect(JSON.parse(body).cities.length).toEqual(3);
            expect(body).toEqual(JSON.stringify(citiesJSON));
            done();
        });
    });
});