(function() {
    'use strict';

    angular
        .module('HmgtApp')
        .config(locationConfig);

    locationConfig.$inject = ['$stateProvider'];

    function locationConfig($stateProvider) {
        $stateProvider.state('location', {
            parent: 'app',
            url: '/location',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/components/location/location.html',
                    controller: 'LocationController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();