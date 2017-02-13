(function () {
    'use strict';

    angular
        .module('HmgtApp')
        .factory('MinuteService', MinuteService);

    MinuteService.$inject = ['$resource'];

    function MinuteService ($resource) {
        return $resource('/api/minutes/:minuteId', {});
    }
})();