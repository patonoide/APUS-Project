

angular.module("myApp",[])
.controller("stockController",['$scope','$http','$window','$location',stockController])




function stockController($scope,$http,$window,$location) {
    $scope.stock={}
    $scope.products=[]
    $scope.stocks=[]
    $scope.product={}

    $scope.product = function(){
        $http.get('http://localhost:3000/product')
        .then(function(result) {
            $scope.products = result.data;
        });
        $scope.products
    }

    $scope.eachProduct= function(product_id){

        for (product of $scope.products) {

            if(product.id==product_id)
            return product.title;
        }

    }

    $scope.updateProduct=function(){

        for (prod of $scope.products) {
            if(prod.id==$scope.stock.product_id){
                return prod.title
            }

        }

    }

    $scope.oneStock= function(){
            var id = $window.location.search.replace("?id=" , "")
            $http.get('http://localhost:3000/stock/'+id )
            .then(function(result) {
                $scope.stock = result.data;
            });


    }
    $scope.listing =  function(){
        $http.get('http://localhost:3000/stock' )
        .then(function(result) {
            $scope.stocks = result.data;
        });
    }

    $scope.newStock = function(){

        var id =0
        var date = document.getElementById("date").value;
            for (stock of $scope.stocks) {
                if(id==stock.id){
                    id++
                }

            }



        $http.post('http://localhost:3000/stock',{id: id ,product_id:$scope.stock.product_id,quantity:$scope.stock.quantity,date:date}).then(function(msg){
            if(msg.loginSucceeded==="true"){
                console.log("worked")
            }else{
                console.log("try again");
            }
        });

        $window.location.href = 'listing.html';
    };

    $scope.deleteStock = function(id) {
        $http.delete('http://localhost:3000/stock/'+id )
        $window.location.href='listing.html'
    }

    $scope.updateStock = function(){

        var id = $window.location.search.replace("?id=" , "")
        var date = document.getElementById("date").value;
        $http.put('http://localhost:3000/stock/'+id,{product_id:$scope.stock.product_id,quantity:$scope.stock.quantity,date:date}).then(function(msg){
            if(msg.loginSucceeded==="true"){
                console.log("worked")
            }else{
                console.log("try again");
            }
        })
        $window.location.href='listing.html'


    }


}
