import * as React from 'react'
import AuthenticationUtils from '../../utils/AuthenticationUtils'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './sass/login.style.sass'
import useCommonUtils from '../../hooks/useCommonUtils'
import RoutesConfig from '../../config/routes-config'
import Config from '../../config/config'

const Login = props => {
  const history = useHistory()
  const CommonUtils = useCommonUtils()
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
      .post(`${Config.settings.endpoint}/auth/login`, {
        email,
        password,
      })
      .then(response => {
        if (200 === response.status) {
          const {
            data: {payload},
          } = response
          AuthenticationUtils.setAuth(
            payload.authorized,
            payload.jwt,
            payload.userEmail,
            payload.userId,
            payload.userName,
          )
          setValidationMessage(null)
          history.push(RoutesConfig.drawingList.route)
        } else {
          AuthenticationUtils.setAuth(null)
          setValidationMessage(response.data.payload.message)
        }
      })
      .catch(errorResponse => {
        AuthenticationUtils.setAuth(null)
        setValidationMessage(
          'Email or password is incorrect, please try again!',
        )
      })
  }

  return (
    <>
      <div className="auth-ui login-ui p-5">
        <div>
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

          <div className="row mt-2">
            <div className="col-md-12 text-center">
              <span
                className="auth-footer-link"
                onClick={() =>
                  CommonUtils.goToRoute(RoutesConfig.register.route)
                }
              >
                Create an account
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
