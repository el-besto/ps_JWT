'use strict';

/**
 * @ngdoc function
 * @name psJwtApp.controller:RegisterController
 * @description
 * # RegisterController
 * Controller of the psJwtApp
 */
angular.module('psJwtApp')
    .controller('RegisterController', function ($scope, alert, auth) {

        $scope.submit = function () {
            auth.register($scope.username, $scope.password)
                .then(function (res) {
                    var username = res.data.user.username;
                    alert('success', 'Account Created!', 'Welcome ' + username + '!');
                })
                .catch(function (err) {
                    alert('warning', 'Something went wrong', err.data.message);
                });
        };
    });
