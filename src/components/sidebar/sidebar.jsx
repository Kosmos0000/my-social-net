import React from 'react';
import style from './sidebar.module.css'
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

function Sidebar() {

    const userId = useSelector((state) => state.auth.data.id)


    return (
        <div className={style.sidebar}>
            <NavLink to={`profile/${userId || ''}`} className={style.text}>Profile</NavLink>
            <NavLink to={`users`} className={style.text}>Users</NavLink>
            <NavLink to={`dialogs`} className={style.text}>Dialogs</NavLink>
        </div>
    );
}

export default Sidebar;