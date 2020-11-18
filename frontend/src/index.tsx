import * as React from 'react'
import {render} from 'react-dom'
import {BrowserRouter, Switch} from 'react-router-dom'
import Routes from './routes'

import 'bootstrap/scss/bootstrap.scss'
import './lib/FontAwesome'
import './app.sass'

render(
  <BrowserRouter>
    <Switch>
      <Routes />
    </Switch>
  </BrowserRouter>,
  document.getElementById('drawings-app'),
)
