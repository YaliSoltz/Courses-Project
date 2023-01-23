import React, { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './beforeLogin/home';
import Login from './beforeLogin/login';
import NavBar from './beforeLogin/navBar';
import ResetPass from './beforeLogin/resetPass';
import SignUp from './beforeLogin/signUp';

const BeforeLogin = () => {
    return (
        <Fragment>
            <NavBar/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/signUp' element={<SignUp/>}/>
                <Route path='/resetPassword' element={<ResetPass/>}/>
            </Routes>

        </Fragment>
    );
}

export default BeforeLogin;
