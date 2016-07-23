'use strict';

/**
 * @ngdoc function
 * @name psJwtApp.controller:JobsController
 * @description
 * # JobsController
 * Controller of the psJwtApp
 */
angular.module('psJwtApp')
    .controller('JobsController', function ($scope, $http, alert, API_URL) {
        $http
            .get(API_URL + 'jobs')
            .then(function (res) {
                $scope.jobs = res.data;
            })
            .catch(function (err) {
                alert('warning', 'Unable to get Jobs', err.message);
            });
    });
