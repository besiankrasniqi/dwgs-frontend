
const AuthUtils = {
    getAuth() {
        return JSON.parse(localStorage.getItem('auth'))
    },
    setAuth(isAuthorized, jwtToken, email, id) {
        if(!isAuthorized || !jwtToken || !email || !id) {
            localStorage.setItem('auth', null)
        }

        localStorage.setItem('auth', JSON.stringify({
            isAuthorized: isAuthorized,
            jwt: jwtToken,
            userEmail: email,
            userId: id
        }))
    }
}

export default AuthUtils