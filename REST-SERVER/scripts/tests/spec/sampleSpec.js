'use strict';

var request = require('request');

describe("recyclecalendarapi", function() {
    it("should respond with hello world json", function(done) {
        request("http://localhost:8080/api/helloAPI", function(error, response, body) {
            expect(body).toEqual('{"Hello":"API"}');
            done();
        });
    });
    it("should respond with an error json", function(done) {
        request("http://localhost:8080/api/error", function(error, response, body) {
            expect(body).toEqual('{"error":{"errorType":"just an example error"}}');
            done();
        });
    });
});