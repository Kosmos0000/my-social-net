import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../redux-toolkit/redux-toolkit";
import {
    createThunkGetAllDialogs,
    createThunkGetListMessages,
    createThunkSendMessage,
    setIsSendMessage
} from "../../redux-toolkit/reducers/dialogsReducer";
import userImage from './../../common-images/user.png'
import style from './dialogs.module.css'
import {NavLink, useParams} from "react-router-dom";
import {createThunkAuthorizeUser, createThunkGetCaptcha} from "../../redux-toolkit/reducers/authReducer";
import {Field, Form, Formik} from "formik";

const Dialogs = () => {

    let params = useParams()['*']
    let userId = ''
    for (let i = 0; i < params.length; i++) {
        if (+params[i]) userId += params[i]
    }

    const dispatch = useAppDispatch()
    const dialogs = useAppSelector(state => state.dialogs.dialogs)
    const page = useAppSelector(state => state.dialogs.page)
    const count = useAppSelector(state => state.dialogs.count)
    const listMessages = useAppSelector(state => state.dialogs.listMessages)
    const isSendMessage = useAppSelector(state => state.dialogs.isSendMessage)


    useEffect(() => {
        dispatch(createThunkGetAllDialogs())
        return () => {
            dispatch(setIsSendMessage(false))
        }
    }, [])
    useEffect(() => {
        dispatch(createThunkGetListMessages(userId, page, count))
    }, [])

    const dialogsJSX = dialogs.map(item => <NavLink key={item.id} to={`/dialogs/${item.id}/messages`}
                                                    onClick={() => dispatch(createThunkGetListMessages(item.id, page, count))}
                                                    className={style.dialog}>
        <div className={style.userPhoto}><img src={item.photos.small ? item.photos.small : userImage} alt="photo"/>
        </div>
        <div className={style.name}>{item.userName}</div>
    </NavLink>)

    const messages = listMessages.map(message => <div key={message} className={style.messages}>{message.body}</div>)

    return (
        <div>
            {isSendMessage ?
                <div>
                    <button className={style.back} onClick={() => dispatch(setIsSendMessage(false))}>Back</button>
                    <div className={style.listMessages}>{messages}</div>
                    <div>
                        <div>
                            <Formik
                                initialValues={{message: ''}}
                                onSubmit={(values) => {
                                    dispatch(createThunkSendMessage(userId, values.message, page, count))
                                }}
                            >
                                <Form>
                                    <div>
                                        Message: <Field type="text" name="message"/>
                                    </div>
                                    <button type="submit">Send message</button>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div> :
                dialogsJSX}
        </div>
    );
};

export default Dialogs;