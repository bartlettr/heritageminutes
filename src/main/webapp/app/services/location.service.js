(function () {
    'use strict';

    angular
        .module('HmgtApp')
        .factory('Location', Location);

    Location.$inject = ['$resource'];

    function Location($resource) {
        return $resource('/api/locations/:id', null,
            { 'update': { method:'PUT' } }
        );
    }
})();