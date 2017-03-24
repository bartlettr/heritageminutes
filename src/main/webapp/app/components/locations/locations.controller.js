(function() {
    'use strict';

    angular
        .module('HmgtApp')
        .controller('LocationsController', LocationsController);

    LocationsController.$inject = ['$scope', 'Locations', '$state', '$mdDialog'];

    function LocationsController($scope, Locations, $state, $mdDialog) {
        var minuteId = $state.params.minuteId;

        $scope.selected = [];

        $scope.query = {
            minuteId: minuteId,
            limit: 10,
            page: 1
        };

        function success(locations) {
            $scope.locations = locations;
        }

        $scope.getLocations = function () {
            $scope.promise = Locations.get($scope.query, success).$promise;
        };

        $scope.getLocations();

        $scope.doEdit = function() {
            var selected = $scope.selected[0];
            $state.go('.edit', {minuteId: minuteId, locationId: selected.id});
        };

        $scope.doCreate = function() {
            $state.go('.create');
        };

        $scope.doBack = function() {
            $state.go("^");
        };

        function doDeleteConfirm() {
            var selected = $scope.selected[0];
            /* Locations.delete({id: selected.id}, function() {
                $scope.selected = [];
                $scope.getMinutes();
            }); */
        }

        $scope.doDelete = function(ev) {
            var confirm = $mdDialog.confirm()
                .title('Delete Location?')
                .textContent('You sure you want to delete this location?')
                .targetEvent(ev)
                .ok('Yes')
                .cancel('No');

            $mdDialog.show(confirm).then(function() {
                doDeleteConfirm();
            }, function() {});
        };
    }
})();