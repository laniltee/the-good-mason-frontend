app.controller("homeCtrl", function($scope, $http, usersService) {
    $scope.msg = "I love London";
    $scope.doLogIn = doLogIn;
    $scope.postFeedback = postFeedback;
    $scope.logUserIn = logUserIn;

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
        $http.post(usersService.GET_API_PATH() + "users/login", $scope.Login).then(function(response) {
            alert("You have successfully logged in !");
        }, function(response) {
            alert("Email OR Password is not recognized");
        })
    }

});