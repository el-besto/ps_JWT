angular.module('psJwtApp')
    .config(function ($urlRouterProvider, $stateProvider) {
        'use strict';

        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: '/views/main.html'
            })
            .state('register', {
                url: '/register',
                templateUrl: '/views/register.html',
                controller: 'RegisterController'
            })
            .state('logout', {
                url: '/logout',
                controller: 'LogoutController'
            })
            .state('jobs', {
                url: '/jobs',
                templateUrl: '/views/jobs.html',
                controller: 'JobsController'
            });
    });
