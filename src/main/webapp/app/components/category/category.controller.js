(function() {
    'use strict';

    angular
        .module('HmgtApp')
        .controller('CategoryController', CategoryController);

    CategoryController.$inject = ['$scope', '$http'];

    function CategoryController ($scope, $http) {
        $scope.save = function() {
            var category = $scope.category;
            $http.post("/api/locations/categories", category);
        };
    }
})();