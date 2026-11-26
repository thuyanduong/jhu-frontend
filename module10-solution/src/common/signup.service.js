(function () {
    "use strict";

    angular.module('common')
        .service('SignUpService', SignUpService);

    function SignUpService() {
        var service = this;
        var userInfo = {};

        service.saveUserInfo = function (info) {
            userInfo = info;
        };

        service.getUserInfo = function () {
            return userInfo;
        };
    }

})();