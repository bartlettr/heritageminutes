(function() {
    'use strict';

    angular
        .module('HmgtApp')
        .controller('MapController', MapController);

    MapController.$inject = ['$scope', '$http'];

    function MapController($scope, $http) {
        var vm = this;

        vm.map =  L.map('map', {scrollWheelZoom: false, zoomControl: false}).setView([57, -93], 4);
        L.control.zoom({position: 'bottomright'}).addTo(vm.map);

        L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, ' +
                '&copy; <a href="https://carto.com/attribution">CARTO</a>',
            maxZoom: 18,
        }).addTo(vm.map);

        vm.markers = L.markerClusterGroup({showCoverageOnHover: false, maxClusterRadius: 20});
        vm.map.addLayer(vm.markers);

        $http.get('/api/minutes').then(
            function successCallback(response) {
                vm.minutes = response.data.data;
                for(var x = 0; x < vm.minutes.length; x++) {
                    var minute = vm.minutes[x];
                    var locationUrl = '/api/minutes/' + minute.id + '/locations?group=default';
                    $http.get(locationUrl).then(addLocation);
                }
             }
         );

         function getMinute(id) {
            return vm.minutes.find(function(element) {
                return element.id === id;
            });
         }

         function addLocation(response) {
             var location = response.data;
             if(location) {
                var markerColour = location.dateCompleted ? 'green' : 'blue';
                var markerIcon = L.ExtraMarkers.icon({
                     markerColor: markerColour,
                     shape: 'circle'
                 });

                 var marker = new L.marker([location.lat, location.lng], {icon: markerIcon});
                 vm.markers.addLayer(marker);

                 var minute = getMinute(location.minuteId);

                 var tooltip = L.tooltip().setContent("<b>Minute:</b> " + minute.name +
                    "<br/><b>Location:</b> " + location.name);
                 marker.bindTooltip(tooltip);
             }
         }
    }
})();