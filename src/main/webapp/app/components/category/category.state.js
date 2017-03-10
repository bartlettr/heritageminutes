(function() {
    'use strict';

    angular
        .module('HmgtApp')
        .config(categoryConfig);

    categoryConfig.$inject = ['$stateProvider'];

    function categoryConfig($stateProvider) {
        $stateProvider.state('category', {
            parent: 'app',
            url: '/category',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/components/category/category.html',
                    controller: 'CategoryController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();