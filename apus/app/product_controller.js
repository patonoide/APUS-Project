

angular.module("myApp",[])
.controller("productController",['$scope','$http','$window','$location',productController])




function productController($scope,$http,$window,$location) {
    $scope.product={}
    $scope.categories=[]
    $scope.products=[]
    //category listing
    $scope.category = function(){
        $http.get('http://localhost:3000/category')
        .then(function(result) {
            $scope.categories = result.data;
        });

    }
    //receives a category id and returns the category name attached to it
    $scope.eachCategory= function(category_id){

        for (category of $scope.categories) {

            if(category.id==category_id)
            return category.name;
        }

    }
    //similar to the eachCategory function, but this time it receives a product_id and returns a product
    $scope.oneProduct= function(){

            var id = $window.location.search.replace("?id=" , "")
            $http.get('http://localhost:3000/product/'+id )
            .then(function(result) {
                $scope.product = result.data;
            });


    }
    //product listing
    $scope.listing =  function(){
        $http.get('http://localhost:3000/product' )
        .then(function(result) {
            $scope.products = result.data;
        });
    }
    //receives information for a new product and sends a post request to the database
    $scope.newProduct = function(){

        var id =0

            for (product of $scope.products) {
                if(id==product.id){
                    id++
                }

            }



        $http.post('http://localhost:3000/product',{id: id ,title:$scope.product.title,category_id:$scope.product.category_id,quantity:$scope.product.quantity,price:$scope.product.price,description:$scope.product.description}).then(function(msg){
            if(msg.loginSucceeded==="true"){
                console.log("worked")
            }else{
                console.log("try again");
            }
        });

        $window.location.href = 'listing.html';
    };
    //deletes the product with the specific id provided
    $scope.deleteProduct = function(id) {
        $http.delete('http://localhost:3000/product/'+id )
        $window.location.href='listing.html'
    }
    //updates the specific product
    $scope.updateProduct = function(){

        var id = $window.location.search.replace("?id=","")

        $http.put('http://localhost:3000/product/'+id,{title:$scope.product.title,category_id:$scope.product.category_id,quantity:$scope.product.quantity,price:$scope.product.price,description:$scope.product.description}).then(function(msg){
            if(msg.loginSucceeded==="true"){
                console.log("worked")
            }else{
                console.log("try again");
            }
        })
        $window.location.href='listing.html'


    }


}
