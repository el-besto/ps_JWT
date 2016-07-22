'use strict';

/**
 * @ngdoc function
 * @name psJwtApp.controller:RegisterController
 * @description
 * # RegisterController
 * Controller of the psJwtApp
 */
angular.module('psJwtApp')
    .controller('RegisterController', function ($scope, $http, alert) {
        var url = '/';
        var user = {};
        $scope.submit = function () {
            $http.post(url, user)
                .then(function (res) {
                    console.log(res);
                })
                .catch(function (err) {
                    alert('warning', 'Oops', 'Could not register');
                });
        };
    });