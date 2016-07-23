'use strict';

describe('Controller: LogoutController', function () {

    // load the controller's module
    beforeEach(module('psJwtApp'));

    var LogoutController,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        LogoutController = $controller('LogoutController', {
            $scope: scope
            // place here mocked dependencies
        });
    }));
});
