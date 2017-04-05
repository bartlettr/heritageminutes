(function() {
    'use strict';

    angular
        .module('HmgtApp')
        .controller('MapController', MapController);

    MapController.$inject = ['$scope', '$compile', '$http', '$mdSidenav', 'localStorageService'];

    function MapController($scope, $compile, $http, $mdSidenav, localStorageService) {
        var vm = this;

        vm.message = {};
        vm.message.hidden = localStorageService.get('messageHidden');

        vm.info = {};
        vm.info.visible = false;

        vm.map =  L.map('map', {zoomControl: false}).setView([57, -93], 4);
        L.control.zoom({position: 'bottomleft'}).addTo(vm.map);

        L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, ' +
                '&copy; <a href="https://carto.com/attribution">CARTO</a>',
            maxZoom: 18,
        }).addTo(vm.map);

        var resetZoomControl = new L.control({ position: 'bottomleft' });
        resetZoomControl.onAdd = function (map) {
            return createControl(resetZoomControl,
                'app/components/map/reset-zoom.html');
        };
        resetZoomControl.addTo(vm.map);

        var messageControl = new L.control({ position: 'topleft' });
        messageControl.onAdd = function (map) {
            return createControl(messageControl,
                'app/components/map/message.html');
        };
        messageControl.addTo(vm.map);

        var infoControl = new L.control({ position: 'topleft' });
        infoControl.onAdd = function (map) {
            return createControl(infoControl,
                'app/components/map/info.html');
        };
        infoControl.addTo(vm.map);

        var sideControl = new L.control({ position: 'topright' });
        sideControl.onAdd = function (map) {
            return createControl(sideControl,
                'app/components/map/toggle.html');
        };
        sideControl.addTo(vm.map);

        vm.markers = [];
        vm.markerClusterGroup = L.markerClusterGroup({showCoverageOnHover: false, maxClusterRadius: 20});
        vm.map.addLayer(vm.markerClusterGroup);

        $http.get('/api/minutes').then(function(minutes) {
            vm.minutes = minutes.data.data;
            $http.get('/api/locations?group=default').then(function(locations) {
                vm.locations = locations.data;
                for(var x = 0; x < vm.locations.length; x++) {
                    addLocation(vm.locations[x]);
                }
            });
        });

        function getMarker(id) {
            return vm.markers.find(function(marker) {
                return marker.minute.id === id;
            });
        }

        function getMinute(id) {
            return vm.minutes.find(function(minute) {
                return minute.id === id;
            });
        }

        function addLocation(location) {
            var markerColour = location.dateCompleted ? 'green-light' : 'blue';
            var markerIcon = L.ExtraMarkers.icon({
                markerColor: markerColour,
                shape: 'circle'
            });

            var marker = new L.marker([location.lat, location.lng], {icon: markerIcon});
            vm.markerClusterGroup.addLayer(marker);
            vm.markers.push(marker);

            marker.on('click', function() {
                var marker = this;
                $scope.$apply(function() {
                    showMinuteInfo(marker);
                });
            });

            var minute = getMinute(location.minuteId);

            marker.location = location;
            marker.minute = minute;
            addTooltip(marker, false);
        }

        function toggleTooltip(marker, permanent) {
            if(marker) {
                marker.unbindTooltip();
                addTooltip(marker, permanent)
            }
        }

        function showMinuteInfo(marker) {
            vm.markerClusterGroup.zoomToShowLayer(marker, function() {
                toggleTooltip(vm.marker, false);
                vm.marker = marker;
                toggleTooltip(vm.marker, true);

                var minute = marker.minute;
                var location = marker.location;

                vm.message.hidden = true;
                vm.info.minute = minute;
                vm.info.location = location;
                vm.info.visible = true;
            });
        }

        function addTooltip(marker, permanent) {
            var tooltip = L.tooltip({offset: [1, -20], permanent: permanent})
                .setContent('<div class="tooltip"><div class="tooltip-row"><span>Minute</span><span>' + marker.minute.name +
                    '</span></div><div class="tooltip-row"><span>Location</span><span>' + marker.location.name + "</span></div></div>");
            marker.bindTooltip(tooltip);
        }

        function createControl(control, template) {
            control._container = L.DomUtil.create('div');
            angular.element(document).ready(function() {
                var element = angular.element(control._container);
                element.html("<ng-include src=\"'" + template + "'\"></ng-include>");
                $compile(element)($scope);
                $scope.$apply();
            });
            return control._container;
        }

        vm.closeMessage = function() {
            localStorageService.set('messageHidden', true);
            vm.message.hidden = true;
        }

        vm.closeInfo = function() {
            toggleTooltip(vm.marker, false);
            vm.marker = null;
            vm.info.visible = false;
        }

        vm.toggleSidenav = function() {
            $mdSidenav('sidenav').toggle();
        }

        vm.showInfo = function(id) {
            var marker = getMarker(id);
            showMinuteInfo(marker);
        }

        vm.resetZoom = function(id) {
            vm.map.setView([57, -93], 4);
        }
    }
})();