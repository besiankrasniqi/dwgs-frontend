import * as React from 'react'
import {withRouter} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import AuthUtils from '../../utils/AuthUtils'
import './sass/navbar.style.sass'

const NavBar = withRouter(({history}) => {
  const signOut = () => {
    AuthUtils.setAuth(null)
    history.push('/login')
  }

  return (
    <>
      <div className="navbar-sidebar"></div>
      <div className="navbar-icon-app">
        <FontAwesomeIcon icon={['fas', 'drafting-compass']} size="sm" />
      </div>
      <div className="row mb-5 navbar-drawings-horizontal">
        <div className="col-md-12 p-0">
          <div className="user-profile-icon-wrapper" onClick={signOut}>
            <div className="user-profile-icon">
              {AuthUtils.getAuth().userName[0]}
            </div>
          </div>
        </div>
      </div>
    </>
  )
})

export default NavBar
