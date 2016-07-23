'use strict';

/**
 * @ngdoc function
 * @name psJwtApp.controller:LoginController
 * @description
 * # LoginController
 * Controller of the psJwtApp
 */
angular.module('psJwtApp')
    .controller('LoginController', function ($scope, $http, alert, authToken, API_URL) {
        $scope.submit = function () {
            var url = API_URL + 'login';
            var user = {
                username: $scope.username,
                password: $scope.password
            };

            $http.post(url, user)
                .then(function (res) {
                    alert('success', 'Welcome!', 'Thanks for coming back ' + res.data.user.username + '!');
                    authToken.setToken(res.data.token);
                })
                .catch(function (err) {
                    alert('warning', 'Something went wrong', err.data.message);
                });
        };
    });
