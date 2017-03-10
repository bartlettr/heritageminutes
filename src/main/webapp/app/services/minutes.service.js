(function () {
    'use strict';

    angular
        .module('HmgtApp')
        .factory('Minutes', Minutes);

    Minutes.$inject = ['$resource'];

    function Minutes ($resource) {
        return $resource('/api/minutes/:id', {});
    }
})();