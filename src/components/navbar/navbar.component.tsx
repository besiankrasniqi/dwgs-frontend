import * as React from 'react'
import {withRouter} from 'react-router-dom'
import AuthUtils from '../../utils/AuthUtils'

const NavBar = withRouter(({history}) => {
  const signOut = () => {
    AuthUtils.setAuth(null)
    history.push('/login')
  }

  return (
    <>
      <div className="row mb-5">
        <div className="col-md-12">
          <div className="btn btn-secondary float-right" onClick={signOut}>
            Sign Out
          </div>
        </div>
      </div>
    </>
  )
})

export default NavBar
