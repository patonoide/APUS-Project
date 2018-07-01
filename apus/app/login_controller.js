


angular.module("myApp", []).controller("loginController",["$scope","$window","$location",loginController]);

function loginController($scope,$window,$location,loginService){
    $scope.login ={};
    $scope.loguser = function(){
        if($scope.login.username=="admin" && $scope.login.password=="admin"){

            localStorage.setItem('status',"1");


            $window.location.href="../category/listing.html"

        }else{
            alert("Wrong password or username");
        }

    }






}
