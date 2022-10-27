import React from 'react';
import style from './header.module.css'
import logo from './img/logo.png'

function Header() {
    return (
        <header className={style.header}>
            <div className="container">
                <div className={style.body}>
                    <img className={style.logo} src={logo} alt="aaa"/>
                </div>
            </div>
        </header>
    );
}

export default Header;