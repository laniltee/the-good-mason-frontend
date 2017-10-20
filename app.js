var app = angular.module("myApp", ["ngRoute"]);

app.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        .when("/", {
            templateUrl: "views/home.html",
            controller: "homeCtrl"
        })
        .when("/register", {
            templateUrl: "views/register.html",
            controller: "registerCtrl"
        })
        .when("/user", {
            templateUrl: "views/register.html",
            controller: "registerCtrl"
        }).when("/search", {
            templateUrl: "views/search.html",
            controller: "searchCtrl"
        });
});