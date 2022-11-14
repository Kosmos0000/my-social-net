import React, {useEffect} from 'react';
import {createThunkGetUsers} from "../../redux-toolkit/reducers/usersReducer";
import userImage from './../../common-images/user.png'
import style from './users.module.css'
import {NavLink} from "react-router-dom";
import Loading from "../common/loading/loading";
import Search from "../common/search/search";
import Pagination from "../common/pagination/pagination";
import {useAppDispatch, useAppSelector} from "../../redux-toolkit/redux-toolkit";

function Users() {
    const dispatch = useAppDispatch()



    const usersTotalCount = useAppSelector((state) => state.users.usersTotalCount)
    const displayedUsersCount = useAppSelector((state) => state.users.displayedUsersCount)
    const currentPage = useAppSelector((state) => state.users.currentPage)
    const items = useAppSelector((state) => state.users.items)
    const isLoading = useAppSelector((state) => state.users.isLoading)
    const currentStringForSearch = useAppSelector(state => state.search.currentStringForSearch)


    useEffect(() => {
        dispatch(createThunkGetUsers(displayedUsersCount, currentPage))
    }, [])


    const users = items.map((user) =>
        <div key={user.id}>
            <div className={style.user}>
                <NavLink to={`../profile/${user.id}`} className={style.photo}>
                    {user.photos.small ?
                        <img src={user.photos.small} alt=""/> :
                        <img src={userImage} alt=""/>
                    }
                </NavLink>
                <div>
                    <NavLink to={`../profile/${user.id}`} className={style.name}>{user.name}</NavLink>
                    <div className={style.status}>{user.status}</div>
                </div>
            </div>
        </div>
    )

    return (
        <div>
            <Search/>
            <Pagination totalCount={usersTotalCount} displayedAmount={displayedUsersCount}
                        currentPage={currentPage} action={createThunkGetUsers} currentStringForSearch={currentStringForSearch}/>
            {isLoading ? <Loading/> :
                <div>{users}</div>}

        </div>
    );
}

export default Users;