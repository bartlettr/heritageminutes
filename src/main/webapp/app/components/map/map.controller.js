(function() {
    'use strict';

    angular
        .module('HmgtApp')
        .controller('MapController', MapController);

    MapController.$inject = ['$scope', '$http'];

    function MapController($scope, $http) {
        var vm = this;

        vm.map =  L.map('map', {scrollWheelZoom: false, zoomControl: false}).setView([60, -96], 4);

        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            maxZoom: 18
        }).addTo(vm.map);

        $http.get('/api/minutes').then(
            function successCallback(response) {
                var minutes = response.data.data;
                for(var x = 0; x < minutes.length; x++) {
                    var minute = minutes[x];
                    $http.get('/api/minutes/' + minute.id + '/locations/default').then(
                        function successCallback(response) {
                            var location = response.data;
                            if(location) {
                                L.marker([location.lat, location.lng]).addTo(vm.map);
                            }
                         },
                         function errorCallback(response) {}
                     );
                }
             }
         );
    }
})();