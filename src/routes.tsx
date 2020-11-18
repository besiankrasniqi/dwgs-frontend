import * as React from 'react'
import AuthenticationUtils from './utils/AuthenticationUtils'
import {Route} from 'react-router-dom'
import RoutesConfig from './config/routes-config'
import Login from './components/login/login.component'
import Register from './components/register/register.component'
import CreateDrawing from './components/create-drawing/create-drawing.component'
import DrawingList from './components/drawing-list/drawing-list.component'
import SingleImage from './components/single-image/single-image.component'

const Routes = (props): React.ReactElement => {
  const [isAuthorized, setIsAuthorized] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (AuthenticationUtils.getAuth()) {
      setIsAuthorized(AuthenticationUtils.getAuth().isAuthorized)
    } else {
      setIsAuthorized(false)
    }
  }, [AuthenticationUtils.getAuth()])

  React.useEffect(() => {}, [isAuthorized])

  return (
    <>
      <Route
        exact
        path={RoutesConfig.home.route}
        state={RoutesConfig.home.state}
        component={isAuthorized ? DrawingList : Login}
      />

      <Route
        exact
        path={RoutesConfig.login.route}
        state={RoutesConfig.login.state}
        component={Login}
      />
      <Route
        exact
        path={RoutesConfig.register.route}
        state={RoutesConfig.login.state}
        component={Register}
      />

      <Route
        exact
        path={RoutesConfig.createDrawing.route}
        state={RoutesConfig.createDrawing.state}
        component={isAuthorized ? CreateDrawing : Login}
      />

      <Route
        exact
        path={RoutesConfig.drawingList.route}
        state={RoutesConfig.drawingList.state}
        component={isAuthorized ? DrawingList : Login}
      />

      <Route exact path="/image/:id" state="image" component={SingleImage} />
    </>
  )
}

export default Routes
