(function() {
    'use strict';

    angular
        .module('HmgtApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
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