(function() {
    'use strict';

    angular
        .module('HmgtApp')
        .config(uploadConfig);

    uploadConfig.$inject = ['$stateProvider'];

    function uploadConfig($stateProvider) {
        $stateProvider.state('upload', {
            parent: 'app',
            url: '/upload',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/components/upload/upload.html',
                    controller: 'UploadController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();