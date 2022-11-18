import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {useAppDispatch, useAppSelector} from "../../../redux-toolkit/redux-toolkit";
import {createThunkAuthorizeUser, createThunkGetCaptcha} from "../../../redux-toolkit/reducers/authReducer";
import {Navigate} from "react-router-dom";
import style from './login.module.css'

const Login = () => {
    const dispatch = useAppDispatch()

    const isAuth = useAppSelector(state => state.auth.data.isAuth)
    const userId = useAppSelector(state => state.auth.data.id)
    const captchaUrl = useAppSelector(state => state.auth.data.captchaUrl)

    if (isAuth) {
        return <Navigate to={`/profile/${userId}`}/>
    }

    return <div className={style.form}>
        <h1>Sign in</h1>
        <Formik
            initialValues={{email: '', password: '', rememberMe: false, captcha: ''}}
            onSubmit={(values) => {
                dispatch(createThunkAuthorizeUser(values))
            }}
        >
            <Form>
                <div className={style.field}>
                    Email: <Field type="email" name="email"/>
                </div>
                <div className={style.field}>
                    Password: <Field type="password" name="password"/>
                </div>
                <div className={style.field}>
                    <span><Field type="checkbox" name="rememberMe"/> Remember me</span>
                </div>
                {captchaUrl && <div className={style.captcha}>
                    <div>
                        <span>Enter captcha: <Field type="text" name="captcha"/></span>
                    </div>
                    <div><img onClick={() => dispatch(createThunkGetCaptcha())} src={captchaUrl} alt="captcha"/></div>
                </div>}
                <button type="submit">Sign in</button>
            </Form>
        </Formik>
    </div>
}

export default Login;