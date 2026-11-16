(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com")
        .directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            restrict: 'E',
            scope: {
                foundItems: '<',
                onRemove: '&'
            }
        };

        return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var controller = this;
        controller.userInput = "";

        controller.search = function () {
            var searchTerm = controller.userInput.toLowerCase().trim();
            var foundPromise = MenuSearchService.getMatchedMenuItems(searchTerm);
            foundPromise.then(function (result) {
                controller.found = result;
            }).catch(function (error) {
                console.log("Error fetching from the server or processing data. " + error);
            });
        }

        controller.removeItem = function (itemIndex) {
            controller.found.splice(itemIndex, 1);
        };
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {

            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json"),
            }).then(function (result) {

                if (searchTerm === "") {
                    return [];
                }

                // process result and only keep items that match
                var foundItems = [];

                for (var key in result.data) {
                    var menuItems = result.data[key]["menu_items"];
                    for (var item of menuItems) {
                        if (item.description.indexOf(searchTerm) !== -1) {
                            foundItems.push(item);
                        }
                    }
                }

                // return processed items
                return foundItems;
            });
        }
    }

})();