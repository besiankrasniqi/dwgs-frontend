import * as React from 'react'
import {render} from 'react-dom'

import 'bootstrap/scss/bootstrap.scss'
import './lib/FontAwesome'
import './app.sass'

import Dashboard from './components/dashboard/dashboard.component'

render(
    <Dashboard />,
    document.getElementById('drawings-app')
)