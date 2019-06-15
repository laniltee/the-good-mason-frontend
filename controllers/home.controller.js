app.controller("homeCtrl", function ($scope, $http, usersService) {
    $scope.msg = "I love London";
    $scope.doLogIn = doLogIn;
    $scope.postFeedback = postFeedback;
    $scope.logUserIn = logUserIn;
    $scope.logInFailed = false;
    $scope.userLoggedIn = localStorage.getItem('IS_USER_LOGGED') || false;
    $scope.loggedUserName = localStorage.getItem('loggedUser') || 'false';
    $scope.logUserOut = logUserOut;
    $scope.categories = [];
    $scope.searchByName = searchByName;

    loadCategories();
    animateStats();

    function loadCategories() {
        $http.get(usersService.GET_API_PATH() + "providers/search/categories/").then(function (response) {
            $scope.categories = response.data;
        });
    }

    function doLogIn() {
        alert("Ss");
    }

    function postFeedback() {
        $scope.Feedback.email = usersService.getLoggedUser();
        $scope.Feedback.createdAt = Date.now();

        $http.post(usersService.GET_API_PATH() + "feedback", $scope.Feedback).then(function (response) {
            alert("We will review your feedback soon !");
        })
    }

    function logUserIn() {
        $scope.logInFailed = false;
        $http.post(usersService.GET_API_PATH() + "users/login", $scope.Login).then(function (response) {
            alert("You have successfully logged in !");
            usersService.setLoggedUser($scope.Login.email)
            window.location.reload();
        }, function (response) {
            $scope.logInFailed = true;
        })
    }

    function logUserOut() {
        if (confirm("Are you sure to log out ?") == true) {
            usersService.logOutUser();
            window.location.reload();
        }
    }

    function searchByName() {
        setTimeout(function () {
            window.location.href = "#/search/name/" + $scope.searchName;
        }, 1500);
    }

    function animateStats() {
        $('.statistic').addClass('animated fadeIn');
    }

});