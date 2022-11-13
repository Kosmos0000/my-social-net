import React, {useState} from 'react';
import style from './header.module.css'
import logo from './img/logo.png'
import {useAppDispatch, useAppSelector} from "../../redux-toolkit/redux-toolkit";
import {createThunkSignOut} from "../../redux-toolkit/reducers/authReducer";
import {NavLink} from "react-router-dom";

function Header() {

    const dispatch = useAppDispatch();

    const authData = useAppSelector((state) => state.auth.data)


    return (
        <header className={style.header}>
            <div className="container">
                <div className={style.body}>
                    <img className={style.logo} src={logo} alt="aaa"/>
                    {authData.isAuth ?
                        <span>
                            <span className={style.login}>{authData.login}</span>
                            <span onClick={() => dispatch(createThunkSignOut())} className={style.logout}>Logout</span>
                        </span> :
                        <NavLink to={'login'} className={style.login}>Login</NavLink>}
                </div>
            </div>
        </header>
    );
}

export default Header;