'use strict';

/**
 * @ngdoc service
 * @name psJwtApp.auth
 * @description
 * # auth
 * Service in the psJwtApp.
 */
angular.module('psJwtApp')
    .service('auth', function ($http, $q, $state, $window, authToken, API_URL) {
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
            var deferred = $q.defer();
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
                    var code = event.data;
                    popup.close();
                    $http.post(API_URL + 'auth/google', {
                        code: code,
                        clientId: googleClientId,
                        redirectUri: $window.location.origin
                    }).success(function (jwt) {
                        authSuccessful(jwt);
                        deferred.resolve(jwt);
                    });
                }
            });
            return deferred.promise;
        };
    });
