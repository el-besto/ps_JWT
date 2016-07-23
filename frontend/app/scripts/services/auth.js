'use strict';

/**
 * @ngdoc service
 * @name psJwtApp.auth
 * @description
 * # auth
 * Service in the psJwtApp.
 */
angular.module('psJwtApp')
    .service('auth', function ($http, $state, authToken, API_URL) {
        var loginUrl = API_URL + 'login';
        var registerUrl = API_URL + 'register';

        function authSuccessful(res) {
            authToken.setToken(res.token);
            $state.go('main');
        }

        this.login = function (username, password) {
            return $http
                .post(loginUrl, { username: username, password: password })
                .success(authSuccessful);
        };
        this.register = function (username, password) {
            return $http
                .post(registerUrl, { username: username, password: password })
                .success(authSuccessful);
        };
    });
