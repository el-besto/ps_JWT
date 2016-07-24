'use strict';

/**
 * @ngdoc function
 * @name psJwtApp.controller:HeaderController
 * @description
 * # HeaderController
 * Controller of the psJwtApp
 */
angular.module('psJwtApp')
    .controller('HeaderController', function ($scope, $auth) {
        $scope.isAuthenticated = $auth.isAuthenticated;
    });
