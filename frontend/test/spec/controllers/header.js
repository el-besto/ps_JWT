'use strict';

describe('Controller: HeaderController', function () {

    // load the controller's module
    beforeEach(module('psJwtApp'));

    var HeaderController,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        HeaderController = $controller('HeaderController', {
            $scope: scope
            // place here mocked dependencies
        });
    }));
    
});
