app.controller("registerCtrl", function($scope, $routeParams, $http, usersService) {

    $scope.createUser = createUser;

    function createUser() {
        $scope.User.name = $scope.User.firstName + ' ' + $scope.User.lastName;

        $http.post(usersService.GET_API_PATH() + "/users", $scope.User).then(function(response) {
        	alert("New user registered");
        });
    }
});