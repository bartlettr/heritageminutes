(function() {
    'use strict';

    angular
        .module('HmgtApp')
        .controller('LocationController', LocationController);

    LocationController.$inject = ['$scope', '$state', 'Location'];

    function LocationController ($scope, $state, Location) {
        var minuteId = $state.params.minuteId;
        var locationId = $state.params.locationId;

        $scope.groups = [{name: 'default'}, {name: 'stretch'}];

        if(locationId) {
            $scope.action = 'Edit';
            Location.get({id: locationId}, function(location) {
                $scope.location = location;
            });
        } else {
            $scope.action = 'Create';
        }

        $scope.save = function() {
            if(locationId) {
                Location.update({id: locationId}, $scope.location, function() {
                    $state.go("^");
                });
            } else {
                Locations.save({minuteId: minuteId}, $scope.location, function() {
                    $state.go("^");
                });
            }
        };

        $scope.cancel = function() {
            $state.go("^");
        }
    }
})();