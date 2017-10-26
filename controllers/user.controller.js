app.controller("userCtrl", function ($scope, $http, usersService, $route) {
    var loggedUserEmail = localStorage.getItem('loggedUser') || 'false';
    $scope.User = {};
    $scope.createUser = createUser;
    $scope.pageHeader = "Edit Your Profile";
    $scope.pageSubHeader = loggedUserEmail;

    $http.get(usersService.GET_API_PATH() + "users/" + loggedUserEmail).then(function (response) {
        $scope.User = response.data;
        $scope.User.firstName = response.data.name.split(" ")[0];
        $scope.User.lastName = response.data.name.split(" ")[1];
        $scope.User.name = $scope.User.firstName + ' ' + $scope.User.lastName;
    }, function (response) {

    })

    function createUser() {
        if (confirm("Are you sure to update your details ?") == true) {
            $http.put(usersService.GET_API_PATH() + "users/" + loggedUserEmail, $scope.User).then(function (response) {
                alert("Your profile was successfully updated !");
                $route.reload();
            }, function (response) {

            });
        }


    }
});