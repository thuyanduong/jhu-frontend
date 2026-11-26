(function () {
    "use strict";

    angular.module('public')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['menuItems', 'SignUpService'];
    function SignUpController(menuItems, SignUpService) {
        var signup = this;

        let allShortNames = [];
        for (var category in menuItems) {
            for (var item of menuItems[category].menu_items) {
                allShortNames.push(item.short_name);
            }
        }
        signup.allShortNames = allShortNames;

        signup.submit = function () {
            var favoriteDishShortName = signup.favoriteDish.toUpperCase();
            var favoriteDishName = '';
            var favoriteDishDescription = '';

            for (var category in menuItems) {
                for (var item of menuItems[category].menu_items) {
                    if (item.short_name === favoriteDishShortName) {
                        favoriteDishName = item.name;
                        favoriteDishDescription = item.description;
                    }
                }
            }

            var parts = favoriteDishShortName.match(/^([A-Za-z]+)(\d+)$/);
            var favoriteDishCategory = parts[1];

            var userInfo = {
                firstName: signup.firstName,
                lastName: signup.lastName,
                emailAddress: signup.emailAddress,
                phoneNumber: signup.phoneNumber,
                favoriteDish: favoriteDishShortName,
                favoriteDishName: favoriteDishName,
                favoriteDishDescription: favoriteDishDescription,
                favoriteDishCategory: favoriteDishCategory
            };

            console.log(userInfo)

            SignUpService.saveUserInfo(userInfo);

            signup.submitted = true;
        };
    }

})();
