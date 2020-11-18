import * as React from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import useHttp from '../../hooks/useHttp'
import ModalInfo from '../ModalInfo'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './sass/register.style.sass'
import useCommonUtils from '../../hooks/useCommonUtils'
import RoutesConfig from '../../config/routes-config'
import Config from '../../config/config'

const Register = props => {
  const history = useHistory()
  const CommonUtils = useCommonUtils()
  const [name, setName] = React.useState<string>('')
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = React.useState<
    string
  >('')
  const [registerModal, setRegisterModal] = React.useState({
    show: false,
    title: 'Success!',
    body: '',
    bodyInfo: '',
    bodyInfoClass: '',
  })
  const httpRequest = useHttp('axios')
  const [isBackendError, setIsBackendError] = React.useState(false)

  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    setName(target.value)
  }

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    setEmail(target.value)
  }

  const paswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    setPassword(target.value)
  }

  const passwordConfirmationHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const target = e.target
    setPasswordConfirmation(target.value)
  }

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault()

    const registerModalCopy = Object.assign({}, registerModal)

    try {
      const registerUser = await httpRequest({
        method: 'post',
        url: `${Config.settings.endpoint}/auth/register`,
        data: {
          name,
          email,
          password,
          passwordConfirmation,
        },
      })

      const {
        data: {isRegistered},
      } = registerUser
      const {
        data: {message},
      } = registerUser

      if (isRegistered) {
        registerModalCopy.title = 'Success!'
        registerModalCopy.bodyInfo = message
        registerModalCopy.bodyInfoClass = 'alert alert-success'
        setIsBackendError(false)
      } else {
        registerModalCopy.title = 'Error!'
        registerModalCopy.bodyInfo = message
        registerModalCopy.bodyInfoClass = 'alert alert-danger'
        setIsBackendError(true)
      }
    } catch (error) {
      setIsBackendError(true)
      registerModalCopy.title = 'Error!'
      registerModalCopy.bodyInfo = error.message
      registerModalCopy.bodyInfoClass = 'alert alert-danger'
    }

    registerModalCopy.show = true
    setRegisterModal(registerModalCopy)
  }

  const onHideRegisterModal = () => {
    return
  }

  const modalHideHandler = () => {
    setRegisterModal(prevState => {
      const prevStateCopy = Object.assign({}, prevState)
      prevStateCopy.show = false
      return prevStateCopy
    })

    if (!isBackendError) history.push(RoutesConfig.login.route)
  }

  return (
    <>
      <div className="auth-ui bg-light p-5">
        <div>
          <div className="row">
            <div className="col-md-12">
              <h1 className="header-title text-center">Register</h1>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 auth-icon text-center">
              <FontAwesomeIcon icon={['fas', 'drafting-compass']} size="sm" />
            </div>
          </div>

          <form onSubmit={submitHandler}>
            <div className="row mt-4">
              <div className="col-md-12">
                <div className="form-group">
                  <div className="input-group">
                    <input
                      type="text"
                      id="name"
                      name="register"
                      className="form-control"
                      placeholder="Name"
                      onChange={nameHandler}
                      required={true}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={emailHandler}
                    required={true}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={paswordHandler}
                    required={true}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <input
                    type="password"
                    id="password-confirmation"
                    value={passwordConfirmation}
                    name="password-confirmation"
                    className="form-control"
                    placeholder="Confirm your password"
                    onChange={passwordConfirmationHandler}
                    required={true}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-12">
                <div className="form-group">
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-primary btn-lg w-100"
                  />
                </div>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-12 text-center">
                <span
                  className="auth-footer-link"
                  onClick={() => CommonUtils.goToRoute('/login')}
                >
                  User Login
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>

      <ModalInfo
        show={registerModal.show}
        onHide={onHideRegisterModal}
        title={registerModal.title}
        hideHandler={modalHideHandler}
        body={registerModal.body}
        bodyInfo={registerModal.bodyInfo}
        bodyInfoClass={registerModal.bodyInfoClass}
      />
    </>
  )
}

export default Register
