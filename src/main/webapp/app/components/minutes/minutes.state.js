(function() {
    'use strict';

    angular
        .module('HmgtApp')
        .config(minutesConfig);

    minutesConfig.$inject = ['$stateProvider'];

    function minutesConfig($stateProvider) {
        $stateProvider.state('minutes', {
            parent: 'app',
            url: '/minutes',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/components/minutes/minutes.html',
                    controller: 'MinutesController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();