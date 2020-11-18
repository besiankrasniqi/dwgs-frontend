import * as React from 'react'
import {withRouter} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Link} from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import AuthenticationUtils from '../../utils/AuthenticationUtils'
import './sass/navbar.style.sass'

const NavBar = withRouter(({history}) => {
  const [userName, setUserName] = React.useState<string>('')
  const signOut = () => {
    AuthenticationUtils.setAuth(null)
    history.push('/login')
  }

  React.useEffect(() => {
    if (AuthenticationUtils.getAuth()) {
      if (AuthenticationUtils.getAuth().userName) {
        setUserName(AuthenticationUtils.getAuth().userName)
      }
    }
  }, [])

  return (
    <>
      <div className="navbar-sidebar">
        <div
          className="navicons"
          data-tip="Create A Drawing"
          data-place="right"
        >
          <Link className="navicons-link" to={{pathname: '/create-drawing'}}>
            <FontAwesomeIcon icon={['fas', 'pencil-ruler']} size="sm" />
          </Link>
        </div>

        <div className="navicons" data-tip="Drawings List" data-place="right">
          <Link className="navicons-link" to={{pathname: '/drawing-list'}}>
            <FontAwesomeIcon icon={['fas', 'dice-d6']} size="sm" />
          </Link>
        </div>
      </div>
      <div className="navbar-icon-app">
        <FontAwesomeIcon icon={['fas', 'drafting-compass']} size="sm" />
      </div>
      <div className="row mb-5 navbar-drawings-horizontal">
        <div className="col-md-12 p-0">
          <div
            className="user-profile-icon-wrapper"
            data-tip={userName}
            data-place="bottom"
            onClick={signOut}
          >
            <div className="user-profile-icon">{userName[0]}</div>
          </div>
        </div>
      </div>
      <ReactTooltip />
    </>
  )
})

export default NavBar
