'use strict';

describe('Controller: LoginController', function () {

    // load the controller's module
    beforeEach(module('psJwtApp'));

    var LoginController,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        LoginController = $controller('LoginController', {
            $scope: scope
            // place here mocked dependencies
        });
    }));

    it('should attach a list of awesomeThings to the scope', function () {
        expect(LoginController.awesomeThings.length).toBe(3);
    });
});
