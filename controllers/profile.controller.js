app.controller("profileCtrl", function ($scope, $http, usersService, $routeParams) {
    $scope.profile = {};
    $scope.competitors = [];
    $scope.comments = [];
    $scope.postComment = postComment;
    $scope.isCompetitorsLoaded = false;
    $scope.competitorCount = 0;
    $scope.addToDo = addToDo;
    $scope.todo = {
        request: false,
        favorite: false
    }

    $scope.loggedUser = localStorage.getItem('loggedUser') || 'false';

    var profileId = $routeParams.profileId;

    loadProfile();
    loadComments();

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

    function postComment() {
        $scope.comment.user = localStorage.getItem('loggedUser');
        $scope.comment.date = Date.now();
        $scope.comment.provider = profileId;

        if (confirm("Are you sure to add a comment ?") == true) {
            $http.post(usersService.GET_API_PATH() + "/providers/comments", $scope.comment).then(function (response) {
                alert("You have successfully added a new comment !");
                loadComments();
            });
        }
    }

    function loadComments() {
        var recCount = 0;
        var repCount = 0;
        $http.get(usersService.GET_API_PATH() + "providers/comments/" + profileId).then(function (response) {
            $scope.comments = response.data;

            for (var i = 0; i < $scope.comments.length; i++) {
                if ($scope.comments[i].rating == "Recommend") {
                    recCount++
                } else {
                    repCount++;
                }
            }
        }).finally(function () {
            $scope.profile.recommends = recCount;
            $scope.profile.reports = repCount;
        });
    }

    function addToDo(action) {
        const toDoItem = {
            "date": Date.now(),
            "action": "",
            "provider": $scope.profile.name,
            "provider_id": profileId,
            "user": localStorage.getItem('loggedUser'),
            "satisfied": false
        }
        toDoItem.action = action;
        $http.post(usersService.GET_API_PATH() + "users/todo", toDoItem).then(function (response) {
            $scope.todo[action] = true;
        });
    }

});