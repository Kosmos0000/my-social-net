import React, {useEffect, useState} from 'react';
import userImage from './../../common-images/user.png'
import style from './profile.module.css'
import {Navigate, NavLink, useParams} from "react-router-dom";
import {
    createThunkGetProfileInfo,
    createThunkSetPhoto
} from "../../redux-toolkit/reducers/usersReducer";
import Loading from "../common/loading/loading";
import Status from "../common/status/status";
import {useAppDispatch, useAppSelector} from "../../redux-toolkit/redux-toolkit";
import EditProfileForm from "./editProfileForm/editProfileForm";
import {setIsSendMessage} from "../../redux-toolkit/reducers/dialogsReducer";

function Profile() {
    let params = useParams();

    const isAuth = useAppSelector(state => state.auth.data.isAuth)
    const userId = useAppSelector(state => state.auth.data.id)
    const profileInfo = useAppSelector((state) => state.users.profileInfo)
    const isLoading = useAppSelector((state) => state.users.isLoading)

    const [accordionState, setAccordionState] = useState(false)
    const [editMode, setEditMode] = useState(false)

    const dispatch = useAppDispatch();

    useEffect(() => {

        if (params['*'] !== '') {

            dispatch(createThunkGetProfileInfo(params['*']))
        }
    }, [params])


    if (isLoading) return <Loading/>
    if (!isAuth) return <Navigate to={'/login'}/>

    return (
        <div className={style.flex}>
            <div className={style.imageContainer}>
                <img className={style.userImage}
                     src={Object.entries(profileInfo).length !== 0 && profileInfo.photos.large !== null ? profileInfo.photos.large : userImage}
                     alt="photo"/>
                {params['*'] === String(userId) && <input onChange={(e) => dispatch(createThunkSetPhoto(e.target.files[0], userId))} type="file"/>}
            </div>
            <div className={style.userInfo}>
                <Status/>
                {!editMode ? <div>
                    <div className={style.infoItems}>{profileInfo.fullName}</div>
                    <div
                        className={style.infoItems}>{profileInfo.lookingForAJob ? 'lookingForAJob: yes' : 'lookingForAJob: no'}</div>
                    <div
                        className={style.infoItems}>{profileInfo.lookingForAJobDescription && profileInfo.lookingForAJobDescription}</div>
                    <div className={style.infoItems} onClick={() => setAccordionState(!accordionState)}>contacts:</div>
                    {accordionState &&
                        <div className={style.accordItemsBlock}>
                            {Object.keys(profileInfo.contacts).map(key => <div key={key}
                                                                               className={style.infoItemsAccord}>{profileInfo.contacts[key]}</div>)}
                        </div>}
                </div> : <EditProfileForm/>}
                {params['*'] === String(userId) &&
                    <button onClick={() => setEditMode(!editMode)}>Edit profile info</button>}
                <div><NavLink onClick={() => dispatch(setIsSendMessage(true))} to={`/dialogs/${+params['*']}`}>Start a dialog</NavLink></div>
            </div>
        </div>
    );
}

export default Profile;