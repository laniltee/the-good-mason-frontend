app.service('usersService', function() {

    const API_PATH = "http://localhost:8081/api/";

    this.myFunc = function(x) {
        return x.toString(16);
    }

    this.getLoggedUser = function() {
        return localStorage.getItem('loggedUser');
    }

    this.GET_API_PATH = function() {
        return API_PATH;
    }

    this.setLoggedUser = function(loggedUserIn) {
        localStorage.setItem('loggedUser', loggedUserIn);
        localStorage.setItem('IS_USER_LOGGED', true);
    }

    this.IS_USER_LOGGED = function() {
        return localStorage.getItem('IS_USER_LOGGED');
    }

    this.logOutUser = function() {
        localStorage.setItem('IS_USER_LOGGED', false);
        localStorage.removeItem('IS_USER_LOGGED');
        localStorage.setItem('loggedUser', '');
    }
});