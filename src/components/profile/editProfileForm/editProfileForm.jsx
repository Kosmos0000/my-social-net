import {useAppDispatch, useAppSelector} from "../../../redux-toolkit/redux-toolkit";
import {Field, Form, Formik} from "formik";
import {createThunkSendProfileForm} from "../../../redux-toolkit/reducers/usersReducer";
import React from "react";
import style from './editProfileForm.module.css'

const EditProfileForm = () => {

    const dispatch = useAppDispatch();

    const profileInfo = useAppSelector(state => state.users.profileInfo)

    return (
        <div>
            <Formik
                initialValues={profileInfo}
                onSubmit={(values) => {
                    dispatch(createThunkSendProfileForm(values, profileInfo.userId))
                }}
            >
                <Form>
                    {Object.keys(profileInfo).map(key => {
                        if (key !== 'userId' && key !== 'contacts' && key !== 'photos' && key !== 'aboutMe') {
                            return <div className={style.row} key={key}>{key}: <Field
                                type={typeof profileInfo[key] == 'boolean' ? 'checkbox' : 'text'} name={key}/></div>
                        } else if (key === 'contacts') {
                            return Object.keys(profileInfo[key]).map(item => {
                                return <div className={style.subRow} key={item}>{item}: <Field
                                    type={'text'} name={'contacts.' + item}/></div>
                            })
                        }
                    })}
                    <button type="submit">Send</button>
                </Form>
            </Formik>
        </div>
    );
};

export default EditProfileForm