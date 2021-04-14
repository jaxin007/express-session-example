import React, { ReactNode } from 'react';
import { Redirect } from 'react-router-dom'
import axios, { AxiosInstance } from 'axios';

interface SignUpModel {
    login: string,
    password: string,
    email?: string,
    error?: string,
    responseStatus?: number,
}

export default class Signup extends React.Component<any, SignUpModel> {
    private readonly axios: AxiosInstance;

    constructor(props: any) {
        super(props);

        this.axios = axios.create({
            baseURL: 'localhost:3030/api',
            withCredentials: true,
        })
    }

    async signIn(login: string, password: string) {
        return this.axios.post('http://localhost:3000/api/auth/login', {
            login,
            password
        });
    }

    async signUp(signUpData: SignUpModel) {
        try {
            const res = await this.axios.post('http://localhost:3000/api/auth/register', signUpData);

            console.log(res.status);

            if (res.status === 200) {
                return (<Redirect to='/qwe'/>)
            }
        } catch (e) {
            return this.setState({
                error: e.response
            })
        }
    }

    async logOut() {
        return this.axios.post('http://localhost:3000/api/auth/logout')
    }

    render(): ReactNode {
        return (
            <form>
                <h3>Sign Up</h3>

                <div className='form-group'>
                    <label>Email address</label>
                    <input type='text' className='form-control' placeholder='Enter email' onChange={(e) => this.setState({
                            email: e.target.value,
                        })
                    }/>
                </div>

                <div className='form-group'>
                    <label>Login</label>
                    <input type='text' className='form-control' placeholder='Login' onChange={(e) => this.setState({
                            login: e.target.value,
                        })
                    }/>
                </div>

                <div className='form-group'>
                    <label>Password</label>
                    <input type='password' className='form-control' placeholder='Password' onChange={(e) => this.setState({
                            password: e.target.value,
                        })
                    }/>
                </div>

                <button type='button' className='btn btn-primary btn-block' onClick={() => this.signUp({
                        email: this.state.email,
                        login: this.state.login,
                        password: this.state.password,
                    }
                )}>Register</button>
            </form>
        );
    }
}
