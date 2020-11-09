import * as React from 'react'
import AuthUtils from './utils/AuthUtils'
import { Route } from 'react-router-dom'
import Context from '../context'
import Login from './components/login/login.component'
import Dashboard from './components/dashboard/dashboard.component'

const Routes = props => {
    const [ isAuthorized, setIsAuthorized ] = React.useState<boolean>(false)

    React.useEffect(() => {
        console.log('current auth:', AuthUtils)
        console.log('current AuthUtils object:', AuthUtils.getAuth())

        if(AuthUtils.getAuth()) {
            setIsAuthorized(AuthUtils.getAuth().isAuthorized)
        }
        else {
            setIsAuthorized(false)
        }

    }, [AuthUtils.getAuth()])

    React.useEffect(() => {
        console.log('Routes isAuthorized is:', isAuthorized)
    }, [isAuthorized])

    return (
        <>
<           Route
                exact
                path="/"
                state="home"
                component={isAuthorized ? Dashboard : Login }
            />

            <Route
                exact
                path="/login"not
                state="login"
                component={ Login }
            />

            <Route
                exact
                path="/dashboard"
                state="dashboard"
                component={isAuthorized ? Dashboard : Login }
            />
            
        </>
    )
}

export default Routes