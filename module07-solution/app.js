(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .filter('customCurrency', CurrencyFilter)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);


    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var toByList = this;

        toByList.items = ShoppingListCheckOffService.getToBuyItems();

        toByList.buy = function (itemindex) {
            ShoppingListCheckOffService.buy(itemindex);
        }
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var boughtList = this;

        boughtList.items = ShoppingListCheckOffService.getBoughtItems();
    }

    function ShoppingListCheckOffService() {
        var service = this;

        var toBuy = [
            { name: "cookies", quantity: 10, pricePerItem: 2 },
            { name: "pies", quantity: 4, pricePerItem: 3.99 },
            { name: "crackers", quantity: 6, pricePerItem: 0.50 },
            { name: "donuts", quantity: 2, pricePerItem: 1.99 },
            { name: "cupcakes", quantity: 8, pricePerItem: 1.50 }
        ];
        var bought = [];

        service.buy = function (index) {
            var item = toBuy[index];
            toBuy.splice(index, 1);
            bought.push(item);
        };

        service.getToBuyItems = function () {
            return toBuy;
        };

        service.getBoughtItems = function () {
            return bought;
        };
    }

    function CurrencyFilter() {
        return function (amount) {
            if (amount === null || amount === undefined || amount === "") {
                return "";
            }

            amount = Number(amount);

            return "$$$" + amount.toFixed(2);
        }
    }

})();