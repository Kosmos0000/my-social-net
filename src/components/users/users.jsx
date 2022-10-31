import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createThunkGetUsers} from "../../redux-toolkit/reducers/usersReducer";
import userImage from './../../common-images/user.png'
import style from './users.module.css'

function Users() {
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(createThunkGetUsers())
    }, [])

    const stateUsers = useSelector((state) => state.users)

    const numberOfPages = Math.round(stateUsers.usersTotalCount / stateUsers.dispayedUsersCount)

    const numberOfPagesArray = [];

    if(numberOfPages) {
        for(let i = 1; i < numberOfPages; i++) {
            numberOfPagesArray.push(i)
        }
    }

    const users = stateUsers.items.map((user) => {
        return (
            <div className={style.user}>
                <div className={style.photo}>
                    {user.photos.small ?
                        <img src={user.photos.small} alt=""/> :
                        <img src={userImage} alt=""/>
                    }
                </div>
                <div>
                    <div className={style.name}>{user.name}</div>
                    <div className={style.status}>{user.status}</div>
                </div>
            </div>
        )
    })

    return (
        <div>
            <div className={style.numbers}>
                {
                    numberOfPagesArray.map((number) => <span className={style.number}>{number}</span>)
                }
            </div>
            <div>{users}</div>
        </div>
    );
}

export default Users;