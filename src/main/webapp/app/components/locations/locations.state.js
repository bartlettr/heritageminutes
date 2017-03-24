(function() {
    'use strict';

    angular
        .module('HmgtApp')
        .config(locationsConfig);

    locationsConfig.$inject = ['$stateProvider'];

    function locationsConfig($stateProvider) {
        $stateProvider.state('minutes.locations', {
            url: '/:minuteId/locations',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/components/locations/locations.html',
                    controller: 'LocationsController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();