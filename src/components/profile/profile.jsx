import React, {useEffect, useState} from 'react';
import userImage from './../../common-images/user.png'
import style from './profile.module.css'
import {Navigate, useParams} from "react-router-dom";
import {createThunkGetProfileInfo, createThunkSendProfileForm} from "../../redux-toolkit/reducers/usersReducer";
import Loading from "../common/loading/loading";
import Status from "../common/status/status";
import {useAppDispatch, useAppSelector} from "../../redux-toolkit/redux-toolkit";
import {createThunkAuthorizeUser} from "../../redux-toolkit/reducers/authReducer";
import {ErrorMessage, Field, Form, Formik} from "formik";

function Profile() {
    let params = useParams();

    const isAuth = useAppSelector(state => state.auth.data.isAuth)

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
            <div>
                <img className={style.userImage}
                     src={Object.entries(profileInfo).length !== 0 && profileInfo.photos.large !== null ? profileInfo.photos.large : userImage}
                     alt="photo"/>
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
                            {Object.keys(profileInfo.contacts).map(key => <div
                                className={style.infoItemsAccord}>{profileInfo.contacts[key]}</div>)}
                        </div>}
                </div> : <EditForm/>}
                <button onClick={() => setEditMode(!editMode)}>Edit profile</button>
            </div>
        </div>
    );
}

const EditForm = () => {

    const dispatch = useAppDispatch();

    const profileInfo = useAppSelector(state => state.users.profileInfo)

    return (
        <div>
            <Formik
                initialValues={profileInfo}
                onSubmit={(values) => {
                    debugger
                    dispatch(createThunkSendProfileForm(values, profileInfo.userId))
                }}
            >
                <Form>
                    {Object.keys(profileInfo).map(key => {
                        if(key !== 'userId' && key !== 'contacts' && key !== 'photos') {
                            return <div key={key}>{key}: <Field type={typeof profileInfo[key] == 'boolean' ? 'checkbox' : 'text'} name={key}/></div>
                        }
                        })}
                    <button type="submit">Send</button>
                </Form>
            </Formik>
        </div>
    );
};

export default Profile;