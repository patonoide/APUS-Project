angular.module("myApp", [])
.controller("categoryController", ['$scope', '$http', '$window', '$location', categoryController])




function categoryController($scope, $http, $window, $location) {
    $scope.category={}
    $scope.categories = []

    $scope.listing = function() {
        $http.get('http://localhost:3000/category')
        .then(function(result) {
            $scope.categories = result.data;
        });
        return $scope.categories
    }


    $scope.newCategory = function() {
        var id = 0

        for (category of $scope.categories) {
            if (id == category.id) {
                id++
            }

        }


        $http.post('http://localhost:3000/category', {
            id: id,
            name: $scope.category.name
        }).then(function(msg) {
            if (msg.loginSucceeded === "true") {
                console.log("worked")
            } else {
                console.log("try again");
            }
        });

        $window.location.href = 'listing.html';
    };


    
    $scope.oneCategory= function(){

        var id = $window.location.search.replace("?id=" , "")
        $http.get('http://localhost:3000/category/'+id )
        .then(function(result) {
            $scope.category = result.data;
        });


    }

    $scope.deleteCategory = function(id) {
        $http.delete('http://localhost:3000/category/' + id)
        $window.location.href = 'listing.html'
    }

    $scope.updateCategory = function() {

        var id = $window.location.search.replace("?id=", "")

        $http.put('http://localhost:3000/category/' + id, {
            name: $scope.category.name
        }).then(function(msg) {
            if (msg.loginSucceeded === "true") {
                console.log("worked")
            } else {
                console.log("try again");
            }
        })
        $window.location.href = 'listing.html'


    }


}
