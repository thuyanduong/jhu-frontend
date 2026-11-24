(function () {
    'use strict';

    angular.module('MenuApp')
        .component('itemList', {
            templateUrl: 'src/templates/items-list.template.html',
            bindings: {
                items: '<',
            }
        });


})();