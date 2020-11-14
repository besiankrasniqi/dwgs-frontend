import * as React from 'react'
import axios from 'axios'
import useHttp from '../../hooks/useHttp'
import './sass/register.style.sass'

const Register = props => {
    const BASE_URL = 'http://localhost:5001'
    const [ name, setName ] = React.useState<string>('')
    const [ email, setEmail ] = React.useState<string>('')
    const [ password, setPassword ] = React.useState<string>('')
    const [ passwordConfirmation, setPasswordConfirmation ] = React.useState<string>('')
    const httpRequest = useHttp('axios')

    const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target
        setName(target.value)
    }

    const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target
        setEmail(target.value)
    }

    const paswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target
        setPassword(target.value)
    }

    const passwordConfirmationHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target
        setPasswordConfirmation(target.value)
    }

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault()
        
        httpRequest({
            method: 'post',
            url: `${BASE_URL}/auth/register`,
            data: {
                name,
                email,
                password,
                passwordConfirmation
            }
        })
        .then(response => {
            console.log('submitHandler response is:', response)
        })

        console.log('submitHandler is invoked')
    }

    return(
        <>
        <div className="register-ui bg-light p-5">
            <div className="content">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="header-title text-center">Register</h1>
                    </div>
                </div>

                <form onSubmit={submitHandler}>
                    <div className="row mt-5">
                        <div className="col-md-12">
                            <div className="form-group">
                            <div className="input-group">
                                <input type="text" id="name" name="register" className="form-control"
                                placeholder="Name"
                                    onChange={nameHandler} required={true}
                                />
                            </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <input type="email" id="email" value={email} name="email" className="form-control"
                                    placeholder="Email"
                                    onChange={emailHandler} required={true}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <input type="password" id="password" value={password} name="password" className="form-control"
                                    placeholder="Password"
                                    onChange={paswordHandler} required={true}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <input type="password" id="password-confirmation" value={passwordConfirmation} name="password-confirmation" className="form-control"
                                    placeholder="Confirm your password"
                                    onChange={passwordConfirmationHandler} required={true}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <div className="form-group">
                                <input type="submit" value="Submit" className="btn btn-primary btn-lg w-100"/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
            
        </>
    )
    
}

export default Register