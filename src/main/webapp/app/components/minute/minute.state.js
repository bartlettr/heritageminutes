(function() {
    'use strict';

    angular
        .module('HmgtApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('minute', {
            parent: 'app',
            url: '/',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/components/minute/minute.html',
                    controller: 'MinuteController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();