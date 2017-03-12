(function() {
    'use strict';

    angular
        .module('HmgtApp')
        .config(minuteConfig);

    minuteConfig.$inject = ['$stateProvider'];

    function minuteConfig($stateProvider) {
        $stateProvider.state('minutes.create',
            {
                url: '/create',
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
        ).state('minutes.edit',
             {
                 url: '/:id',
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