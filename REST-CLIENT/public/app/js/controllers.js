'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('MyCtrl1', function ($scope, recycleAPIservice) {

        $scope.nameFilter = null;
        $scope.citiesList = [];

        $scope.changeFilter = function () {

            recycleAPIservice.getCities($scope.searchFilter).success(function (response) {
                //Dig into the responde to get the relevant data
                $scope.citiesList = response.cities;
            });
        };

        recycleAPIservice.getCities($scope.searchFilter).success(function (response) {
            //Dig into the responde to get the relevant data
            $scope.citiesList = response.cities;
        });
    })
    .controller('MyCtrl2', ['$scope',
        function ($scope) {

  }]);