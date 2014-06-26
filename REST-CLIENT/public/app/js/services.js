'use strict';

/* Services */


// Demonstrate how to register services
angular.module('myApp.services', []).
factory('recycleAPIservice', function ($http) {

    var recycleAPI = {};

    recycleAPI.getCities = function (searchQuery) {
        var urlAPI = 'http://localhost:8080/api/cities';
        if (searchQuery) {
            urlAPI = 'http://localhost:8080/api/cities?searchName=' + searchQuery;
        }
        return $http({
            method: 'GET',
            url: urlAPI,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
    }
    return recycleAPI;
});