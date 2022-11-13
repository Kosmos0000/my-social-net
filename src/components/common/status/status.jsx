import React, {useEffect, useState} from 'react';
import style from './status.module.css'
import {useParams} from "react-router-dom";
import {createThunkGetStatus, createThunkSetStatus, setStatus} from "../../../redux-toolkit/reducers/usersReducer";
import {useAppDispatch, useAppSelector} from "../../../redux-toolkit/redux-toolkit";

function Status() {

    let params = useParams();

    const status = useAppSelector((state) => state.users.status)
    const userId = useAppSelector((state) => state.auth.data.id)

    const dispatch = useAppDispatch();

    const [editMode, setEditMode] = useState(false);

    const editStatus = () => {
        setEditMode(false)
        dispatch(createThunkSetStatus(status))
    }

    useEffect(() => {
        if (params['*'] !== '') {
            dispatch(createThunkGetStatus(params['*']))
        }
    }, [])

    return (
        <div>
            {editMode ?
                <input className={style.myStatus} autoFocus onBlur={editStatus}
                       onChange={(e) => dispatch(setStatus(e.target.value))} type="text" value={status}/> :
                <div className={+params['*'] === userId ? style.myStatus : style.status}
                     onDoubleClick={() => +params['*'] === userId && setEditMode(true)}>{status ? status : '...'}</div>}
        </div>
    );
}

export default Status;