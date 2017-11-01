app.controller("searchCtrl", function ($scope, $http, usersService, $routeParams) {
    var searchLevel = $routeParams.level;
    var searchKey = $routeParams.query;
    var searchUrl;

    $scope.searchResults = [];
    $scope.searchMethod = searchLevel;

    if (searchLevel == "category") {
        searchUrl = usersService.GET_API_PATH() + "providers/services/" + searchKey;
    } else if (searchLevel == "name") {
        searchUrl = usersService.GET_API_PATH() + "providers/search/name/" + searchKey;
    } else if (searchLevel == "location") {
        searchUrl = usersService.GET_API_PATH() + "providers/search/name/" + location;
    }

    $http.get(searchUrl).then(function (response) {
        $scope.searchResults = response.data;
    })
});