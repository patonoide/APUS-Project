

angular.module("myApp",[])
.controller("stockController",['$scope','$http','$window','$location',stockController])




function stockController($scope,$http,$window,$location) {
    $scope.stock={}
    $scope.products=[]
    $scope.stocks=[]
    $scope.product={}


    //sets the navbar option to selected
    document.getElementById('stock').className +=" active";

    //checks for authentication
    if(localStorage.getItem('status')!=="1"){

        $window.location.href="../login/login.html";
    }


    //Product listing, used for creating and updating a stock
    $scope.product = function(){
        $http.get('http://localhost:3000/product')
        .then(function(result) {
            $scope.products = result.data;
        });
        $scope.products
    }
    //Returns title of specific product using it's specific ID
    $scope.eachProduct= function(product_id){

        for (product of $scope.products) {

            if(product.id==product_id)
            return product.title;
        }

    }
    //used in the update stock page, used to return title of the product in stock
    $scope.updateProduct=function(){

        for (prod of $scope.products) {
            if(prod.id==$scope.stock.product_id){
                return prod.title
            }

        }

    }
    //returns the stock that is being updated
    $scope.oneStock= function(){
            var id = $window.location.search.replace("?id=" , "")
            $http.get('http://localhost:3000/stock/'+id )
            .then(function(result) {
                $scope.stock = result.data;
            });


    }
    //lists all the stocks
    $scope.listing =  function(){
        $http.get('http://localhost:3000/stock' )
        .then(function(result) {
            $scope.stocks = result.data;
        });
    }
    //creates a new entry in the stock database
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

    //deletes the stock with the provided ID
    $scope.deleteStock = function(id) {
        $http.delete('http://localhost:3000/stock/'+id )
        $window.location.href='listing.html'
    }
    //updates the specific stock with the new information
    //had a really hard time getting the value from the datetimepicker
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
