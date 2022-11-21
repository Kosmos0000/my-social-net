import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../redux-toolkit/redux-toolkit";
import {
    createThunkGetAllDialogs,
    createThunkGetListMessages,
    setIsSendMessage
} from "../../redux-toolkit/reducers/dialogsReducer";
import userImage from './../../common-images/user.png'
import style from './dialogs.module.css'
import {Navigate, NavLink, useParams} from "react-router-dom";
import Conversation from "./conversation/conversation";

const Dialogs = () => {

    const dispatch = useAppDispatch()
    const dialogs = useAppSelector(state => state.dialogs.dialogs)
    const isSendMessage = useAppSelector(state => state.dialogs.isSendMessage)
    const isAuth = useAppSelector(state => state.auth.data.isAuth)

    useEffect(() => {
        dispatch(createThunkGetAllDialogs())
    }, [])

    if (!isAuth) return <Navigate to={'/login'}/>

    const dialogsJSX = dialogs.map(item => <NavLink key={item.id} to={`/dialogs/${item.id}`}
                                                    onClick={() => dispatch(setIsSendMessage(true))}
                                                    className={style.dialog}>
        <div className={style.userPhoto}><img src={item.photos.small ? item.photos.small : userImage} alt="photo"/>
        </div>
        <div className={style.name}>{item.userName}</div>
    </NavLink>)

    return (
        <div>
            {isSendMessage ?
                <Conversation /> :
                dialogsJSX}
        </div>
    );
};

export default Dialogs;