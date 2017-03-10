(function() {
    'use strict';

    angular
        .module('HmgtApp')
        .controller('MinuteController', MinuteController);

    MinuteController.$inject = ['$scope', '$stateParams', 'Minutes'];

    function MinuteController ($scope, $stateParams, Minutes) {
        if($stateParams.id) {
            $scope.action = 'Edit';
            Minutes.get({id: $stateParams.id}, function(minute) {
                $scope.minute = minute;
            });
        } else {
            $scope.action = 'Create';
        }

        $scope.save = function() {
            console.log($scope.minute);
        };
    }
})();