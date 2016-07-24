'use strict';

/**
 * @ngdoc function
 * @name psJwtApp.controller:RegisterController
 * @description
 * # RegisterController
 * Controller of the psJwtApp
 */
angular.module('psJwtApp')
    .controller('RegisterController', function ($scope, $auth, alert) {

        $scope.submit = function () {
            var newUser = {
                username: $scope.username,
                password: $scope.password
            };

            $auth.signup(newUser)
                .then(function (res) {
                    var username = res.data.user.username;
                    var message = 'Welcome ' + username + '! Please activate your account in the next couple days.';
                    alert('success', 'Account Created!', message);
                })
                .catch(function (err) {
                    alert('warning', 'Something went wrong', 'Username exists. Please login.');
                });
        };
    });
