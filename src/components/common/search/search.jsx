import React, {useState} from 'react';
import {createThunkAuthorizeUser} from "../../../redux-toolkit/reducers/authReducer";
import {Field, Form, Formik} from "formik";
import {createThunkGetUsers} from "../../../redux-toolkit/reducers/usersReducer";
import {useAppDispatch, useAppSelector} from "../../../redux-toolkit/redux-toolkit";
import {changeCurrentStringForSearch} from "../../../redux-toolkit/reducers/searchReducer";

const Search = (props) => {

    const currentStringForSearch = useAppSelector(state => state.search.currentStringForSearch)
    const displayedUsersCount = useAppSelector(state => state.users.displayedUsersCount)
    const currentPage = useAppSelector(state => state.users.currentPage)


    const dispatch = useAppDispatch()

    return (
        <div>
            <input type="text" onChange={(e) => dispatch(changeCurrentStringForSearch(e.target.value))} value={currentStringForSearch}/>
            <button onClick={() => dispatch(createThunkGetUsers(displayedUsersCount, currentPage, currentStringForSearch))} >Find</button>
        </div>
    );
};

export default Search;