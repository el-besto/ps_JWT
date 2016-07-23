'use strict';

/**
 * @ngdoc service
 * @name psJwtApp.authToken
 * @description
 * # authToken
 * Factory in the psJwtApp.
 */
angular.module('psJwtApp')
    .factory('authToken', function ($window) {
        var cachedToken;
        var storage = $window.localStorage;
        var userToken = 'userToken';

        var authToken = {
            setToken: function (token) {
                cachedToken = token;
                storage.setItem(userToken, token);
            },
            getToken: function () {
                if (!cachedToken) {
                    cachedToken = storage.getItem(userToken);
                }
                return cachedToken;
            },
            isAuthenticated: function () {
                return !!authToken.getToken();
            },
            removeToken: function () {
                cachedToken = null;
                storage.removeItem(userToken);
            }
        };

        return authToken;
    });
