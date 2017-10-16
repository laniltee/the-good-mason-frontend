var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";

    const IMAGE_UPLOAD_URL = "http://smartflashcardsapi.stg-prsn.com/api/images/";
    const PROFILE_API_URL = "http://10.98.201.92:8083/profiles/supervisors";
    const CHEF_API_URL = "http://10.98.201.56:8083/profiles/chefs";

    $scope.allProfiles = [];
    $scope.imageHost = PROFILE_API_URL;
    var labelColors = ['teal', 'orange', 'green'];

    loadAllProfiles();

    function loadAllProfiles() {
        $http.get(CHEF_API_URL).then(function(response) {
            $scope.allProfiles = response.data;
            angular.element('#team-count').html($scope.allProfiles.length);
        });
    }

    $scope.getRandomColor = function() {
        var item = labelColors[Math.floor(Math.random() * labelColors.length)];
        return item;
    }

    $scope.changeActiveProfile = function(profileId) {
        console.log(profileId);
    }

    $scope.getRestColor = function(rest) {
        if (rest == 'Front End') {
            return 'red';
        } else if (rest == 'Back End') {
            return 'blue';
        } else if (rest == 'Cloud') {
            return 'black';
        } else if (rest == 'Mobile') {
            return 'purple';
        } else if (rest == 'Automation') {
            return 'orange';
        } else if (rest == 'Data Science') {
            return 'green';
        } else if (rest == 'CI / CD') {
            return 'yellow';
        } else {
            return 'teal';
        }
    }
});