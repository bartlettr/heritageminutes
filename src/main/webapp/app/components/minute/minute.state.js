(function() {
    'use strict';

    angular
        .module('HmgtApp')
        .config(minuteConfig);

    minuteConfig.$inject = ['$stateProvider'];

    function minuteConfig($stateProvider) {
        $stateProvider.state('minute',
            {
                parent: 'app',
                abstract: true
            }
        ).state('create',
            {
                parent: 'minute',
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
             }
        ).state('edit',
             {
                 parent: 'minute',
                 url: '/minute/:id',
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
             }
         );
    }
})();