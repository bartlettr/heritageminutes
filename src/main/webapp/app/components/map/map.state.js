(function() {
    'use strict';

    angular
        .module('HmgtApp')
        .config(mapConfig);

    mapConfig.$inject = ['$stateProvider'];

    function mapConfig($stateProvider) {
        $stateProvider.state('map', {
            parent: 'app',
            url: '/',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/components/map/map.html',
                    controller: 'MapController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();