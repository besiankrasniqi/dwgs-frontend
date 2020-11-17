const AuthUtils = {
  getAuth() {
    return JSON.parse(localStorage.getItem('auth'))
  },
  setAuth(isAuthorized, jwtToken, email, id, name) {
    if (!isAuthorized || !jwtToken || !email || !id || !name) {
      localStorage.setItem('auth', null)
    }

    localStorage.setItem(
      'auth',
      JSON.stringify({
        isAuthorized: isAuthorized,
        jwt: jwtToken,
        userEmail: email,
        userName: name,
        userId: id,
      }),
    )
  },
}

export default AuthUtils
