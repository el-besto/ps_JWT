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
                    alert('success', 'OK!', 'You are now registered.');
                })
                .catch(function (err) {
                    alert('warning', 'Oops', 'Could not register.');
                });
        };
    });
