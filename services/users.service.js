app.service('usersService', function() {

    var loggedUser = "sarath.perera@gmail.com";
    const API_PATH = "http://localhost:8081/api/";

    this.IS_USER_LOGGED = true;

    this.myFunc = function(x) {
        return x.toString(16);
    }

    this.getLoggedUser = function() {
        return loggedUser;
    }

    this.GET_API_PATH = function() {
        return API_PATH;
    }

    this.setLoggedUser = function(loggedUserIn) {
        loggedUser = loggedUserIn;
    }
});