(function() {
    'use strict';

    angular
        .module('HmgtApp')
        .controller('UploadController', UploadController);

    UploadController.$inject = ['$scope', '$http', '$state', '$mdDialog'];

    function UploadController ($scope, $http, $state, $mdDialog) {
        $scope.upload = function() {
            var formData = new FormData();
            angular.forEach($scope.files, function(obj) {
                if(!obj.isRemote) {
                    formData.append('file', obj.lfFile);
                }
            });

            $scope.files = [];

            $http.post('/api/upload', formData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(function(result) {
                $state.go('^');
            },function(err) {
                $mdDialog.show(
                  $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Upload Failed')
                    .textContent('Upload failed!! Ah crap. Maybe try it again? Or maybe just...give up?')
                    .ariaLabel('Upload Failed Alert')
                    .ok('Dang!')
                );
            });
        };
    }
})();