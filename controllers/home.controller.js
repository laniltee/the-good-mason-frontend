app.controller("homeCtrl", function($scope, $http, usersService) {
    $scope.msg = "I love London";
    $scope.doLogIn = doLogIn;
    $scope.postFeedback = postFeedback;
    $scope.logUserIn = logUserIn;
    $scope.logInFailed = false;
    $scope.userLoggedIn = localStorage.getItem('IS_USER_LOGGED');
    $scope.logUserOut = logUserOut;
    console.log($scope.userLoggedIn);

    function doLogIn() {
        alert("Ss");
    }

    function postFeedback() {
        $scope.Feedback.email = usersService.getLoggedUser();
        $scope.Feedback.createdAt = Date.now();

        $http.post(usersService.GET_API_PATH() + "feedback", $scope.Feedback).then(function(response) {
            alert("We will review your feedback soon !");
        })
    }

    function logUserIn() {
        $scope.logInFailed = false;
        $http.post(usersService.GET_API_PATH() + "users/login", $scope.Login).then(function(response) {
            alert("You have successfully logged in !");
            usersService.setLoggedUser($scope.Login.email)
            window.location.reload();
        }, function(response) {
            $scope.logInFailed = true;
        })
    }

    function logUserOut() {
        if(confirm("Are you sure to log out ?") == true){
            usersService.logOutUser();
            window.location.reload();
        }
    }

});