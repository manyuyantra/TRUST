 class Authenticator {

    constructor() {
        this.isAuthenticated = false;

    }

    setAuthentication() {
        this.isAuthenticated = true;
    }
    removeAuthentication() {
        this.isAuthenticated = false
    }
    isAuthenticated() {
        return this.isAuthenticated;
    }
}

export default new Authenticator();
