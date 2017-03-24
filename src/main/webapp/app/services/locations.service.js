(function () {
    'use strict';

    angular
        .module('HmgtApp')
        .factory('Locations', Locations);

    Locations.$inject = ['$resource'];

    function Locations ($resource) {
        return $resource('/api/minutes/:minuteId/locations/:locationId');
    }
})();