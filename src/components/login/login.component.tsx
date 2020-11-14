import * as React from 'react'
import AuthUtils from '../../utils/AuthUtils.js'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './sass/login.style.sass'

const Login = props => {
  const BASE_URL = 'http://localhost:5001'
  const history = useHistory()
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [validationMessage, setValidationMessage] = React.useState<
    string | null
  >(null)

  const actionState = {
    setEmail,
    setPassword,
  }

  const changeHandler = (e: React.ChangeEvent) => {
    const target = e.target
    actionState[target.getAttribute('data-handler')](target['value'])
  }

  const loginHandler = (e: React.FormEvent) => {
    e.preventDefault()

    axios
      .post(`${BASE_URL}/auth/login`, {
        email,
        password,
      })
      .then(response => {
        console.log(response)

        if (200 === response.status) {
          const {
            data: {payload},
          } = response
          console.log('pyaload is:', payload)
          AuthUtils.setAuth(
            payload.authorized,
            payload.jwt,
            payload.userEmail,
            payload.userId,
          )
          setValidationMessage(null)
          history.push('/dashboard')
        } else {
          console.log('response status is:', response.data.payload.status)
          AuthUtils.setAuth(null)
          setValidationMessage(response.data.payload.message)
        }
      })
      .catch(errorResponse => {
        console.log('errorResponse is:', errorResponse.message)
        AuthUtils.setAuth(null)
        setValidationMessage(
          'Email or password is incorrect, please try again!',
        )
      })
  }

  return (
    <>
      <div className="auth-ui login-ui p-5">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <h1 className="header-title text-center">User Login</h1>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 auth-icon text-center">
              <FontAwesomeIcon icon={['fas', 'drafting-compass']} size="sm" />
            </div>
          </div>

          <form onSubmit={loginHandler}>
            <div className="row mt-4">
              <div className="col-md-12">
                <div className="form-group">
                  <input
                    type="email"
                    id="email"
                    data-handler="setEmail"
                    value={email}
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={changeHandler}
                    required={true}
                  />
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-12">
                <div className="form-group">
                  <input
                    type="password"
                    id="password"
                    data-handler="setPassword"
                    value={password}
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={changeHandler}
                    required={true}
                  />
                </div>
              </div>
            </div>

            {validationMessage ? (
              <div className="row ml-0 mr-0 mb-2 mt-2 p-0">
                <div className="col-md-12 alert alert-danger">
                  {validationMessage}
                </div>
              </div>
            ) : null}

            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <input
                    type="submit"
                    value="Login"
                    className="btn btn-primary btn-lg w-100"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
