'use strict';

/**
 * @ngdoc function
 * @name psJwtApp.controller:LoginController
 * @description
 * # LoginController
 * Controller of the psJwtApp
 */
angular.module('psJwtApp')
    .controller('LoginController', function ($scope, alert, auth) {
        $scope.submit = function () {
            auth.login($scope.username, $scope.password)
                .then(function (res) {
                    alert('success', 'Welcome!', 'Thanks for coming back ' + res.data.user.username + '!');
                })
                .catch(errorHandler);
        };

        $scope.google = function () {
            auth.googleAuth()
                .then(function (res) {
                    alert('success', 'Welcome!', 'Thanks for coming back ' + res.user.displayName + '!');
                })
                .catch(errorHandler);
        };

        function errorHandler (err) {
            alert('warning', 'Something went wrong', err.data.message);
        }
    });
