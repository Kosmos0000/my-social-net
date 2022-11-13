import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {useAppDispatch, useAppSelector} from "../../../redux-toolkit/redux-toolkit";
import {createThunkAuthorizeUser} from "../../../redux-toolkit/reducers/authReducer";
import {Navigate} from "react-router-dom";
import style from './login.module.css'

const Login = () => {
    const dispatch = useAppDispatch()

    const isAuth = useAppSelector(state => state.auth.data.isAuth)
    const userId = useAppSelector(state => state.auth.data.id)

    if (isAuth) {
        return <Navigate to={`/profile/${userId}`}/>
    }

    return <div className={style.form}>
        <h1>Sign in</h1>
        <Formik
            initialValues={{email: '', password: '', rememberMe: false}}
            onSubmit={(values) => {
                dispatch(createThunkAuthorizeUser(values))
            }}
        >
            <Form>
                <div>
                    Email: <Field type="email" name="email"/>
                </div>
                <div>
                    Password: <Field type="password" name="password"/>
                </div>
                <div>
                    <span><Field type="checkbox" name="rememberMe"/> Remember me</span>
                </div>
                <button type="submit">Sign in</button>
            </Form>
        </Formik>
    </div>
}

export default Login;