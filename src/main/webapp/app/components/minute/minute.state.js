(function() {
    'use strict';

    angular
        .module('HmgtApp')
        .config(minuteConfig);

    minuteConfig.$inject = ['$stateProvider'];

    function minuteConfig($stateProvider) {
        $stateProvider.state('minute', {
            parent: 'app',
            url: '/minute',
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