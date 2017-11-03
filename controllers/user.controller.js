app.controller("userCtrl", function ($scope, $http, usersService, $route) {
    var loggedUserEmail = localStorage.getItem('loggedUser') || 'false';
    $scope.User = {};
    $scope.createUser = createUser;
    $scope.pageHeader = "Edit Your Profile";
    $scope.pageSubHeader = loggedUserEmail;
    $scope.comments = [];
    $scope.feedback = [];
    $scope.requests = [];
    $scope.favorites = [];
    $scope.removeComment = removeComment;
    $scope.registration = false;

    $http.get(usersService.GET_API_PATH() + "users/" + loggedUserEmail).then(function (response) {
        $scope.User = response.data;
        $scope.User.firstName = response.data.name.split(" ")[0];
        $scope.User.lastName = response.data.name.split(" ")[1];
        $scope.User.name = $scope.User.firstName + ' ' + $scope.User.lastName;
    }, function (response) {

    });

    // Eager loading of stuff
    loadUserComments();
    loadUserFeedback();
    loadUserFavorites();
    loadUserRequests();

    function createUser() {
        if (confirm("Are you sure to update your details ?") == true) {
            $http.put(usersService.GET_API_PATH() + "users/" + loggedUserEmail, $scope.User).then(function (response) {
                alert("Your profile was successfully updated !");
                $route.reload();
            }, function (response) {

            });
        }
    }

    function loadUserComments() {
        $http.get(usersService.GET_API_PATH() + 'providers/comments_user/' + loggedUserEmail).then(function (response) {
            $scope.comments = response.data;
        });
    }

    function loadUserFeedback() {
        $http.get(usersService.GET_API_PATH() + 'feedback/users/' + loggedUserEmail).then(function (response) {
            $scope.feedback = response.data;
        });
    }

    function loadUserRequests() {
        $http.get(usersService.GET_API_PATH() + 'users/find_todo/users/' + loggedUserEmail + '/actions/request').then(function (response) {
            $scope.requests = response.data;
        });
    }

    function loadUserFavorites() {
        $http.get(usersService.GET_API_PATH() + 'users/find_todo/users/' + loggedUserEmail + '/actions/favorite').then(function (response) {
            $scope.favorites = response.data;
        });
    }

    function removeComment(id){
        if(confirm("Are you sure to remove comment ?")){

        }
    }

    // Form input validation functions

});