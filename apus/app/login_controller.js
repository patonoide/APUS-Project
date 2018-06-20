


angular.module('myApp', [])
    .service('login', function () {
        var status;

        return {
            getProperty: function () {
                return status;
            },
            setProperty: function(value) {
                status= value;
            }
        };
    });
