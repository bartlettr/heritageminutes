(function() {
    'use strict';

    angular
        .module('HmgtApp')
        .controller('MapController', MapController);

    MapController.$inject = ['$scope', '$http'];

    function MapController ($scope, $http) {
        angular.extend($scope, {
            centreOfCanada: {
                lat: 62.4,
                lng: -96.466667,
                zoom: 3
            }
        });

        $http({
          method: 'GET',
          url: '/api/minutes'
        }).then(function successCallback(response) {
            var minutes = response.data;
            var minute = minutes[0];

            var uuid = minute.id;

            $http({
              method: 'GET',
              url: '/api/minutes/' + uuid + '/locations'
            }).then(function successCallback(response) {
                var locations = response.data;
                var location = locations[0];

                var mainMarker = {
                    lat: location.lat,
                    lng: location.lng,
                    focus: false,
                    message: minute.name + ' - ' + location.name,
                    draggable: false
                };

                angular.extend($scope, {
                    markers: {
                        mainMarker: angular.copy(mainMarker)
                    }
                });
             });

         });
    }
})();