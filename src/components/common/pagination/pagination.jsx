import React from 'react';
import style from "./pagination.module.css";
import {useSelector} from "react-redux";
import {useAppDispatch, useAppSelector} from "../../../redux-toolkit/redux-toolkit";
import {createThunkGetUsers, setCurrentPage, setPage} from "../../../redux-toolkit/reducers/usersReducer";

const Pagination = ({totalCount, displayedAmount, currentPage, action, currentStringForSearch}) => {

    const dispatch = useAppDispatch()

    const numberOfDisplayedPages = [];

    for (let i = 1; i <= Math.round(totalCount / displayedAmount); i++) {
        numberOfDisplayedPages.push(i)
    }

    const goToAnotherPage = (newPage) => {
        dispatch(action(displayedAmount, newPage, currentStringForSearch))
    }

    const pages = numberOfDisplayedPages.map((page) => <span key={page} onClick={() => goToAnotherPage(page)}
                                                           className={currentPage === page ?
                                                               style.page + ' ' + style.active :
                                                               style.page}>{page}</span>
    )

    return (
        <div className={style.pages}>
            {pages}
        </div>
    );
};

export default Pagination;