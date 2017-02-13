(function() {
    'use strict';

    angular
        .module('HmgtApp')
        .controller('MinuteController', MinuteController);

    MinuteController.$inject = ['$scope'];

    function MinuteController ($scope) {
        $scope.save = function() {
            console.log($scope.minute);
        };
    }
})();