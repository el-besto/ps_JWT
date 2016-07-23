'use strict';

/**
 * @ngdoc function
 * @name psJwtApp.controller:RegisterController
 * @description
 * # RegisterController
 * Controller of the psJwtApp
 */
angular.module('psJwtApp')
    .controller('RegisterController', function ($scope, $http, alert, authToken) {

        $scope.submit = function () {
            var url = 'http://localhost:3000/register';
            var user = {
                username: $scope.username,
                password: $scope.password
            };

            $http.post(url, user)
                .then(function (res) {
                    alert('success', 'Account Created!', 'Welcome ' + res.data.user.username + '!');
                    authToken.setToken(res.data.token);
                })
                .catch(function (err) {
                    alert('warning', 'Oops', 'Could not register.');
                });
        };
    });
