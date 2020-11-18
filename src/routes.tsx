import * as React from 'react'
import AuthenticationUtils from './utils/AuthenticationUtils'
import {Route} from 'react-router-dom'
// import Context from '../context'
import Login from './components/login/login.component'
import Register from './components/register/register.component'
import CreateDrawing from './components/create-drawing/create-drawing.component'
import DrawingList from './components/drawing-list/drawing-list.component'
import SingleImage from './components/single-image/single-image.component'

const Routes = (props): React.ReactElement => {
  const [isAuthorized, setIsAuthorized] = React.useState<boolean>(false)

  React.useEffect(() => {
    console.log('current auth:', AuthenticationUtils)
    console.log(
      'current AuthenticationUtils object:',
      AuthenticationUtils.getAuth(),
    )

    if (AuthenticationUtils.getAuth()) {
      setIsAuthorized(AuthenticationUtils.getAuth().isAuthorized)
    } else {
      setIsAuthorized(false)
    }
  }, [AuthenticationUtils.getAuth()])

  React.useEffect(() => {
    console.log('Routes isAuthorized is:', isAuthorized)
  }, [isAuthorized])

  return (
    <>
      <Route
        exact
        path="/"
        state="home"
        component={isAuthorized ? DrawingList : Login}
      />

      <Route exact path="/login" not state="login" component={Login} />

      <Route exact path="/register" not state="register" component={Register} />

      <Route
        exact
        path="/create-drawing"
        state="create-drawing"
        component={isAuthorized ? CreateDrawing : Login}
      />

      <Route
        exact
        path="/drawing-list"
        state="drawing-list"
        component={isAuthorized ? DrawingList : Login}
      />

      <Route exact path="/image/:id" state="image" component={SingleImage} />
      <Route
        exact
        path="/image/:id/:public"
        state="image"
        component={SingleImage}
      />
    </>
  )
}

export default Routes
