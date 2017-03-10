(function() {
    'use strict';

    angular
        .module('HmgtApp')
        .controller('BlogController', BlogController);

    BlogController.$inject = ['$scope', '$http'];

    function BlogController($scope, $http) {
        var vm = this;
    }
})();