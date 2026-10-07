(function () {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.userInput = "";
        $scope.message = ""
        $scope.color = "";

        $scope.displayMessage = function () {
            var message = "";
            var color = "";
            if ($scope.userInput === "") {
                message = "Please enter data first";
                color = "danger";
            } else {
                var itemCount = checkItemCount($scope.userInput);

                if (itemCount <= 3) {
                    message = "Enjoy!"
                } else {
                    message = "Too much!"
                }
                color = "success";
            }
            $scope.color = color;
            $scope.message = message;
        };

        function checkItemCount(input) {
            var count = 0;
            var items = input.split(",");
            for (var x = 0; x < items.length; x++) {
                if (items[x].trim() !== "") {
                    count++;
                }
            }
            return count;
        }
    }

})();
