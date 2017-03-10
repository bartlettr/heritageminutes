(function() {
    'use strict';

    angular
        .module('HmgtApp')
        .controller('MinutesController', MinutesController);

    MinutesController.$inject = ['$scope', 'Minutes', '$state'];

    function MinutesController($scope, Minutes, $state) {
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

      $scope.edit = function() {
          var selected = $scope.selected[0];
          $state.go('^.minute.edit', {id: selected.id});
      };

      $scope.create = function() {
        $state.go('^.minute.create');
      };
    }
})();