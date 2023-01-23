import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../helpers/userContext';
import App from './app';
import BeforeLogin from './beforeLogin';
import Login from './beforeLogin/login';
import SignUp from './beforeLogin/signUp';

const State = () => {
    const {user} = useContext(UserContext)
    return (
        <div>
            {localStorage.getItem('x-auth-token') && user && <App/>}
            {!localStorage.getItem('x-auth-token') && <BeforeLogin/>}
        </div>
    );
}

export default State;
