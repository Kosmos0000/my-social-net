import React from 'react';
import style from './sidebar.module.css'
import {NavLink} from "react-router-dom";

function Sidebar() {
    return (
        <div className={style.sidebar}>
            <NavLink to={`profile`} className={style.text}>Profile</NavLink>
            <NavLink to={`users`} className={style.text}>Users</NavLink>
            <div className={style.text}>Messages</div>
        </div>
    );
}

export default Sidebar;