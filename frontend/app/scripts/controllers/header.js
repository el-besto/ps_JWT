'use strict';

/**
 * @ngdoc function
 * @name psJwtApp.controller:HeaderController
 * @description
 * # HeaderController
 * Controller of the psJwtApp
 */
angular.module('psJwtApp')
    .controller('HeaderController', function ($scope, authToken) {
        $scope.isAuthenticated = function () {
            return authToken.isAuthenticated();
        };
    });
