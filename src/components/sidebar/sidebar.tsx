import React from 'react';
import style from './sidebar.module.css'

function Sidebar() {
    return (
        <div className={style.sidebar}>
            <div className="container">
                <div className={style.body}>
                    <div className={style.text}>Profile</div>
                    <div className={style.text}>Friends</div>
                    <div className={style.text}>Messages</div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;