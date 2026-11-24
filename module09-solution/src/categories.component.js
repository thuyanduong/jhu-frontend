(function () {
    'use strict';

    angular.module('MenuApp')
        .component('categoryList', {
            templateUrl: 'src/templates/categories-list.template.html',
            bindings: {
                categories: '<',
            }
        });


})();