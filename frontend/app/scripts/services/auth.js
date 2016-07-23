'use strict';

/**
 * @ngdoc service
 * @name psJwtApp.auth
 * @description
 * # auth
 * Service in the psJwtApp.
 */
angular.module('psJwtApp')
    .service('auth', function ($http, $state, $window, authToken, API_URL) {
        var loginUrl = API_URL + 'login';
        var registerUrl = API_URL + 'register';
        var googleClientId = 'someGoogleClientId';
        var googleUrlBuilder = [];
        googleUrlBuilder.push(
            'response_type=code',
            'client_id=' + googleClientId,
            'redirect_uri=' + $window.location.origin,
            'scope=profile email'
        );

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
        this.googleAuth = function () {
            var googleAuthUrl = 'https://accounts.google.com/o/oauth2/auth?' + googleUrlBuilder.join('&');
            // options below will not be centered on dual-monitors
            // need alternative implementation.
            var options = 'width=500, height=500,' +
                'left=' + ($window.outerWidth - 500) / 2 +
                ',top=' + ($window.outerHeight - 500) / 2.5;

            var popup = $window.open(googleAuthUrl, 'Login with Google', options);
            $window.focus();
            $window.addEventListener('message', function (event) {
                if (event.origin === $window.location.origin) {
                    console.log(event.data);
                    popup.close();
                }
            });
        };
    });
