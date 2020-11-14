import * as React from 'react'
import NavBar from '../navbar/navbar.component'
import AuthUtils from '../../utils/AuthUtils'
import axios from 'axios'
import './sass/dashboard.sass'
import useHttp from '../../hooks/useHttp'

const Dashboard = props => {
  const BASE_URL = 'http://localhost:5001'
  const httpRequest = useHttp('axios')

  const getData = () => {
    console.log('getData was invoked')
    httpRequest({
      method: 'get',
      url: `${BASE_URL}/auth/is-authenticated`,
      params: {
        jwt: 'some test data',
      },
    }).then(response => {
      console.log('response is:', response)
    })
  }

  const getDrawings = () => {
    console.log('getData was invoked')
    httpRequest({
      method: 'get',
      url: `${BASE_URL}/auth/get-drawings`,
      params: {
        jwt: 'some test data',
      },
    }).then(response => {
      console.log('response is:', response)
    })
  }

  return (
    <>
      <div className="section-dashboard mx-auto mt-5">
        <div className="content">
          <NavBar />

          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">Dashboard</div>
                <div className="card-body">drawings goes here</div>
              </div>
            </div>
          </div>

          <br />
          <br />

          <div className="btn btn-primary" onClick={getData}>
            Get Data
          </div>

          <br />
          <br />

          <div className="btn btn-primary" onClick={getDrawings}>
            Get Drawings
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
