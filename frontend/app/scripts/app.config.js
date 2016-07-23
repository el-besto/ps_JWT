angular.module('psJwtApp')
    .config(function ($urlRouterProvider, $stateProvider, $httpProvider) {
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
            .state('login', {
                url: '/login',
                templateUrl: '/views/login.html',
                controller: 'LoginController'
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

        $httpProvider.interceptors.push('authInterceptor');
    })
    .constant('API_URL', 'http://localhost:3000/');
