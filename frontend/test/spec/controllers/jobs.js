'use strict';

describe('Controller: JobsController', function () {

    // load the controller's module
    beforeEach(module('psJwtApp'));

    var JobsController,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        JobsController = $controller('JobsController', {
            $scope: scope
            // place here mocked dependencies
        });
    }));
});
