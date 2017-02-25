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

        var markerList = {};
        angular.extend($scope, {
            markers: markerList
        });

        $http({
          method: 'GET',
          url: '/api/minutes'
        }).then(function successCallback(response) {
            var minutes = response.data.data;
            for(var x = 0; x < minutes.length; x++) {
                var minute = minutes[x];
                getLocation(minute);
            }
         });

         var getLocation = function(minute) {
            var uuid = minute.id;
            $http({
              method: 'GET',
              url: '/api/minutes/' + uuid + '/locations'
            }).then(function successCallback(response) {
                var locations = response.data;
                var location = locations[0];
                if(location) {
                    var marker = {
                        lat: location.lat,
                        lng: location.lng,
                        focus: false,
                        message: minute.name + ' - ' + location.name,
                        draggable: false
                    };


                    markerList[minute.number] = marker;
                }
             });
         };
    }
})();