(function() {
    'use strict';

    angular
        .module('HmgtApp')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['localStorageService'];

    function NavbarController(localStorageService) {
        var vm = this;
        vm.showMessage = function() {
            localStorageService.set('messageHidden', false);
        }
    }
})();