(function() {
    'use strict';

    angular
        .module('HmgtApp')
        .controller('MinutesController', MinutesController);

    MinutesController.$inject = ['$scope', 'MinuteService'];

    function MinutesController($scope, MinuteService) {
      $scope.selected = [];

      $scope.query = {
        limit: 10,
        page: 1
      };

      function success(minutes) {
        $scope.minutes = minutes;
      }

      $scope.getMinutes = function () {
        $scope.promise = MinuteService.get($scope.query, success).$promise;
      };

      $scope.getMinutes();
    }
})();