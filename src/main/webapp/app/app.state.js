(function() {
    'use strict';

    angular
        .module('HmgtApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('app', {
            abstract: true,
            views: {
                'navbar@': {
                    templateUrl: 'app/navigation/navbar.html',
                    controller: 'NavbarController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();