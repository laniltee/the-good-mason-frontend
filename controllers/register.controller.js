app.controller("registerCtrl", function ($scope, $routeParams, $http, usersService) {

    $scope.createUser = createUser;
    $scope.pageHeader = "Register Today";
    $scope.pageSubHeader = "To find a service today";
    $scope.userRegistered = false;
    $scope.formErrors = [];
    $scope.User = {}
    $scope.removeRequest = removeRequest;
    $scope.registration = true;

    var users = [];
    loadAvailableUsers();

    function createUser() {
        $scope.User.name = $scope.User.firstName + ' ' + $scope.User.lastName;

        validateForm($scope.User);

        if ($scope.formErrors.length == 0) {
            $http.post(usersService.GET_API_PATH() + "/users", $scope.User).then(function (response) {
                alert("New user registered");
                $scope.userRegistered = true;
            });
        }

    }

    function validateForm(user) {
        $scope.formErrors = [];

        if (!validateEmail(user.email)) {
            $scope.formErrors.push("Email address seems to be not valid !");
        }
        
        if(validateEmail(user.email) && isEmailAlreadyTaken(user.email)){
            $scope.formErrors.push("Email address is already taken !");
        }

        if (isNaN(user.contact) || user.contact.length < 10) {
            $scope.formErrors.push("Contact number is not valid !");
        }

        if (!isTextValid(user.firstName + user.lastName)) {
            $scope.formErrors.push("Please provide a valid name !");
        }

        if (user.type != 'provider' && user.type != 'user') {
            $scope.formErrors.push("Select an account type !");
        }

        if (!isTextValid(user.location)) {
            $scope.formErrors.push("We want to know where you live");
        }

        if (!isTextValid(user.password) || user.password.length < 6) {
            $scope.formErrors.push("Provide a password with at least with 6 characters");
        }


    }

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var validation = re.test(email);
        return validation;
    }

    function isEmailAlreadyTaken(email){
        var emailAlreadyTaken = false;
        for (var i = 0; i < users.length; i++) {
            if(users[i].email == email){
                emailAlreadyTaken = true;
                break;
            }
        }
        return emailAlreadyTaken;
    }

    function isTextValid(text) {
        if (!text || text == null || text == "") {
            return false;
        } else {
            return true
        }
    }

    function loadAvailableUsers() {
        $http.get(usersService.GET_API_PATH() + "/users").then(function (response) {
            users = response.data;
        });
    }
});