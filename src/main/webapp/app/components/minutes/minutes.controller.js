(function() {
    'use strict';

    angular
        .module('HmgtApp')
        .controller('MinutesController', MinutesController);

    MinutesController.$inject = ['$scope', 'Minutes', '$state', '$mdDialog'];

    function MinutesController($scope, Minutes, $state, $mdDialog) {
      $scope.selected = [];

      $scope.query = {
        limit: 10,
        page: 1
      };

      function success(minutes) {
        $scope.minutes = minutes;
      }

      $scope.getMinutes = function () {
        $scope.promise = Minutes.get($scope.query, success).$promise;
      };

      $scope.getMinutes();

      $scope.doEdit = function() {
          var selected = $scope.selected[0];
          $state.go('.edit', {id: selected.id});
      };

      $scope.doLocations = function() {
          var selected = $scope.selected[0];
          $state.go('.locations', {minuteId: selected.id});
      };

      $scope.doCreate = function() {
          $state.go('.create');
      };

      function doDeleteConfirm() {
          var selected = $scope.selected[0];
          Minutes.delete({id: selected.id}, function() {
              $scope.selected = [];
              $scope.getMinutes();
          });
      }

      $scope.doDelete = function(ev) {
          var confirm = $mdDialog.confirm()
                .title('Delete Minute?')
                .textContent('You sure you want to delete this minute?')
                .targetEvent(ev)
                .ok('Yes')
                .cancel('No');

          $mdDialog.show(confirm).then(function() {
            doDeleteConfirm();
          }, function() {});
      };
    }
})();