import React, {useEffect} from 'react';
import style from "./conversation.module.css";
import {
    createThunkGetListMessages,
    createThunkSendMessage, createThunkStartChatting,
    setIsSendMessage
} from "../../../redux-toolkit/reducers/dialogsReducer";
import {Field, Form, Formik} from "formik";
import {useAppDispatch, useAppSelector} from "../../../redux-toolkit/redux-toolkit";
import {useParams} from "react-router-dom";

const Conversation = () => {

    let userId = +useParams()['*']

    const dispatch = useAppDispatch()

    const messages = useAppSelector(state => state.dialogs.listMessages).map(message => <div key={message.id} className={style.messages}>{message.body}</div>)
    const page = useAppSelector(state => state.dialogs.page)
    const count = useAppSelector(state => state.dialogs.count)

    useEffect(() => {
        dispatch(createThunkGetListMessages(userId, page, count))
    }, [])

    return (
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
        </div>
    );
};

export default Conversation;