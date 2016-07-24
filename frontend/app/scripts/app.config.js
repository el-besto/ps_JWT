angular.module('psJwtApp')
    .config(function ($urlRouterProvider, $stateProvider, $httpProvider, $authProvider, API_URL) {
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

        // satellizer config
        $authProvider.loginUrl = API_URL + 'login';
        $authProvider.signupUrl = API_URL + 'register';
        $authProvider.facebook({
            clientId: 'FACEBOOK_CLIENT_ID',
            url: API_URL + 'auth/facebook'
        });
        $authProvider.google({
            clientId: 'someGoogleClientId',
            url: API_URL + 'auth/google'
        });

        $httpProvider.interceptors.push('authInterceptor');
    })
    .constant('API_URL', 'http://localhost:3000/')
    .run(function ($window) {
        var code;
        var isOauthPopup;
        var pair;
        var params;
        // ensure that we are in the Oauth popup window
        isOauthPopup = function () {
            params = $window.location.search.substring(1);
            return (params && $window.opener && $window.opener.location.origin === $window.location.origin);
        };
        if (isOauthPopup()) {
            pair = params.split('=');
            code = decodeURIComponent(pair[1]);
            // communicate auth code back to our main window
            $window.opener.postMessage(code, $window.location.origin);
        }
    });
