'use strict';

/**
 * @ngdoc function
 * @name psJwtApp.controller:JobsController
 * @description
 * # JobsController
 * Controller of the psJwtApp
 */
angular.module('psJwtApp')
    .controller('JobsController', function ($scope) {
        $scope.jobs = ['job 1', 'job 2'];
    });
