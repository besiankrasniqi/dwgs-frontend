import * as React from 'react'
import NavBar from '../navbar/navbar.component'
import './sass/dashboard.sass'

const Dashboard = props => {

    return (
        <>
            <div className="section-dashboard mx-auto mt-5">
                <div className="content">
                    <NavBar />

                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">Dashboard</div>
                                <div className="card-body">
                                    drawings goes here
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard