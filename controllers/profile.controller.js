app.controller("profileCtrl", function ($scope, $http, usersService, $routeParams) {
    $scope.profile = {};
    $scope.competitors = []

    var profileId = $routeParams.profileId;

    loadProfile();

    function loadProfile() {
        $http.get(usersService.GET_API_PATH() + "providers/" + profileId).then(function (response) {
            $scope.profile = response.data;
            getCompetitors();
        });
    }

    function getCompetitors() {
        $http.get(usersService.GET_API_PATH() + "providers/services/" + $scope.profile.service).then(function (response) {
            $scope.competitors = response.data;
        })
    }

});