import * as React from 'react'
import { withRouter } from 'react-router-dom'
import AuthUtils from '../../utils/AuthUtils.js'
import axios from 'axios'

const Login = withRouter(({ history }) => {
    let BASE_URL = 'http://localhost:5001'
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')

    const actionState = {
        setEmail,
        setPassword
    }

    const changeHandler = (e: React.ChangeEvent) => {
        const target = e.target
        actionState[target.getAttribute('data-handler')](target['value'])
    }

    const login = () => {
        axios.post(`${BASE_URL}/auth/login`, {
            email,
            password
          })
          .then(function (response) {
            console.log(response);

            if(200 === response.status) {
                const {data: { payload }} = response
                console.log('pyaload is:', payload)
                AuthUtils.setAuth(payload.authorized, payload.jwt, payload.userEmail, payload.userId)
                history.push('/dashboard')
            }
            else {
                console.log('response status is:', response.data.payload.status)
                AuthUtils.setAuth(null)
            }
          })
          .catch(function (error) {
            console.log('error is:', error);
            AuthUtils.setAuth(null)
          })
    }

    const test = () => {
        console.log('getAuth:', AuthUtils.getAuth())
    }

    const getData = () => {
        axios.get(`${BASE_URL}/auth/is-authenticated`, {
            params: {
              jwt: AuthUtils.getAuth().jwt
            // jwt: 'some test token'
            }
          })
            .then(function (response) {
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-3 mx-auto">
                        <h1>User Login</h1>

                        <div className="form-group">
                            <div className="input-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" data-handler="setEmail" value={email} name="email"
                                    onChange={changeHandler}
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="email">Password</label>
                                <input type="text" id="password" data-handler="setPassword" value={password} name="password"
                                    onChange={changeHandler}
                                />
                            </div>

                            <div className="btn btn-primary"
                                onClick={login}
                            >Login</div>

                            <br/>
                            <br/>
                            <br/>
                            <br/>

                            <div className="btn btn-primary"
                                onClick={getData}
                            >Get Data test</div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
})

export default Login