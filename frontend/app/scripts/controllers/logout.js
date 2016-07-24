'use strict';

/**
 * @ngdoc function
 * @name psJwtApp.controller:LogoutController
 * @description
 * # LogoutController
 * Controller of the psJwtApp
 */
angular.module('psJwtApp')
    .controller('LogoutController', function ($state, $auth) {
        $auth.logout();
        $state.go('main');
    });
