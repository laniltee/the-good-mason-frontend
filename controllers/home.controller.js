app.controller("homeCtrl", function ($scope) {
    $scope.msg = "I love London";
    $scope.doLogIn = doLogIn;

    function doLogIn(){
    	alert("Ss");
    }

    
});