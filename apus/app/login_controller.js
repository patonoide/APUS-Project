


angular.module("myApp", []).controller("loginController",['login',loginController]);

function loginController(login){
    $scope.message ="";
    $scope.logar = function(username,password){
        if(username=="admin"&&password=="admin"){

        }else{
            $scope.message= "Something went wrong.";
        }

    };


};
