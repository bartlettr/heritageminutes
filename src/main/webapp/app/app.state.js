(function() {
    'use strict';

    angular
        .module('HmgtApp')
        .config(stateConfig)
        .config(materialConfig);

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

    materialConfig.$inject = ['$mdThemingProvider'];
    function materialConfig($mdThemingProvider) {
        $mdThemingProvider.theme('default')
          .primaryPalette('blue-grey');
    }

    angular.module('HmgtApp').config(function (localStorageServiceProvider) {
      localStorageServiceProvider
        .setPrefix('hmgtApp');
    });
})();