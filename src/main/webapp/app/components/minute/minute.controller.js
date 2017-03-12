(function() {
    'use strict';

    angular
        .module('HmgtApp')
        .controller('MinuteController', MinuteController);

    MinuteController.$inject = ['$scope', '$state', '$stateParams', 'Minutes'];

    function MinuteController ($scope, $state, $stateParams, Minutes) {
        if($stateParams.id) {
            $scope.action = 'Edit';
            Minutes.get({id: $stateParams.id}, function(minute) {
                $scope.minute = minute;
            });
        } else {
            $scope.action = 'Create';
        }

        $scope.save = function() {
            if($stateParams.id) {
                Minutes.update({id: $scope.minute.id}, $scope.minute, function() {
                    $state.go("^");
                });
            } else {
                Minutes.save($scope.minute, function() {
                    $state.go("^");
                });
            }
        };

        $scope.cancel = function() {
            $state.go("^");
        }
    }
})();