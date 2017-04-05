(function() {
    'use strict';

    angular
        .module('HmgtApp')
        .controller('MapController', MapController);

    MapController.$inject = ['$scope', '$compile', '$http', '$mdSidenav', 'localStorageService'];

    function MapController($scope, $compile, $http, $mdSidenav, localStorageService) {
        var vm = this;

        vm.message = {};
        vm.message.hidden = false; //localStorageService.get('messageHidden');

        vm.info = {};
        vm.info.visible = false;

        vm.map =  L.map('map', {zoomControl: false}).setView([57, -93], 4);
        L.control.zoom({position: 'bottomleft'}).addTo(vm.map);

        L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, ' +
                '&copy; <a href="https://carto.com/attribution">CARTO</a>',
            maxZoom: 18,
        }).addTo(vm.map);

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

        vm.markers = L.markerClusterGroup({showCoverageOnHover: false, maxClusterRadius: 20});
        vm.map.addLayer(vm.markers);

        $http.get('/api/minutes').then(function(minutes) {
            vm.minutes = minutes.data.data;
            $http.get('/api/locations?group=default').then(function(locations) {
                vm.locations = locations.data;
                for(var x = 0; x < vm.locations.length; x++) {
                    addLocation(vm.locations[x]);
                }
            });
        });

        function getMinute(id) {
            return vm.minutes.find(function(minute) {
                return minute.id === id;
            });
        }

        function getLocationForMinute(minuteId) {
            return vm.locations.find(function(location) {
                return location.minuteId === minuteId;
            });
        }

        function addLocation(location) {
            var markerColour = location.dateCompleted ? 'green-light' : 'blue';
            var markerIcon = L.ExtraMarkers.icon({
                markerColor: markerColour,
                shape: 'circle'
            });

            var marker = new L.marker([location.lat, location.lng], {icon: markerIcon});
            vm.markers.addLayer(marker);

            marker.on('click', function() {
                var minute = this.minute;
                var location = this.location;
                $scope.$apply(function() {
                    showMinuteInfo(minute, location);
                });
            });

            var minute = getMinute(location.minuteId);

            marker.location = location;
            marker.minute = minute;

            addTooltip(marker, location, minute);
        }

        function showMinuteInfo(minute, location) {
            vm.message.hidden = true;
            vm.info.minute = minute;
            vm.info.location = location;
            vm.info.visible = true;
        }

        function addTooltip(marker, location, minute) {
            var tooltip = L.tooltip({offset: [1, -20], direction: 'top'})
                .setContent('<div class="tooltip"><div class="tooltip-row"><span>Minute</span><span>' + minute.name +
                    '</span></div><div class="tooltip-row"><span>Location</span><span>' + location.name + "</span></div></div>");
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
            //localStorageService.set('messageHidden', true);
            vm.message.hidden = true;
        }

        vm.closeInfo = function() {
            vm.info.visible = false;
        }

        vm.toggleSidenav = function() {
            $mdSidenav('sidenav').toggle();
        }

        vm.showInfo = function(id) {
            var minute = getMinute(id);
            var location = getLocationForMinute(id);
            showMinuteInfo(minute, location);
        }
    }
})();