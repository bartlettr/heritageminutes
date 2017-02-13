(function() {
    'use strict';

    angular
        .module('HmgtApp')
        .controller('LocationController', LocationController);

    LocationController.$inject = ['$scope'];

    function LocationController ($scope) {
        $scope.save = function() {

        };
    }
})();