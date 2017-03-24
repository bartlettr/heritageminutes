(function() {
    'use strict';

    angular
        .module('HmgtApp')
        .controller('MinuteController', MinuteController);

    MinuteController.$inject = ['$scope', '$state', 'Minutes'];

    function MinuteController ($scope, $state, Minutes) {
        var id = $state.params.id;

        if(id) {
            $scope.action = 'Edit';
            Minutes.get({id: id}, function(minute) {
                $scope.minute = minute;
            });
        } else {
            $scope.action = 'Create';
        }

        $scope.save = function() {
            if(id) {
                Minutes.update({id: id}, $scope.minute, function() {
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