 class Authenticator {

    constructor() {
        this.isAuthenticated = false;
        this.isAdmin =  false;
        this.portalUser =""

    }

    setAuthentication(token,name) {
        sessionStorage.setItem("trustToken",token);
        this.isAuthenticated = true;
        this.portalUser = name;
        if(this.portalUser ==="admin"){
            this.isAdmin = true;
        }
        

    }
    removeAuthentication() {
        sessionStorage.removeItem("trustToken");
        this.isAuthenticated = false;
        this.isAdmin =  false;
        this.portalUser =""
    }
    isAuthenticated() {
        return this.isAuthenticated;
    }
}

export default new Authenticator();
