(function() {
    'use strict';

    angular
        .module('HmgtApp')
        .config(blogConfig);

    blogConfig.$inject = ['$stateProvider'];

    function blogConfig($stateProvider) {
        $stateProvider.state('blog', {
            parent: 'app',
            url: '/blog',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/components/blog/blog.html',
                    controller: 'BlogController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();