'use strict';

/**
 * @ngdoc function
 * @name psJwtApp.controller:LoginController
 * @description
 * # LoginController
 * Controller of the psJwtApp
 */
angular.module('psJwtApp')
    .controller('LoginController', function ($scope, $state, $auth, alert) {

        function errorHandler(err) {
            alert('warning', 'Something went wrong', err.data.message);
        }

        $scope.submit = function () {
            var user = {
                username: $scope.username,
                password: $scope.password
            };

            $auth.login(user)
                .then(function (res) {
                    alert('success', 'Welcome!', 'Thanks for coming back ' + res.data.user.username + '!');
                    $state.go('main');
                })
                .catch(errorHandler);
        };

        $scope.authenticate = function (provider) {
            $auth.authenticate(provider)
                .then(function (res) {
                    alert('success', 'Welcome!', 'Thanks for coming back ' + res.data.user.displayName + '!');
                    $state.go('main');
                })
                .catch(errorHandler);
        };
    });
