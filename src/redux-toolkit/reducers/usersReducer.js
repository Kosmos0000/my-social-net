import {API} from "../../api/API";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    items: [],
    usersTotalCount: null,
    dispayedUsersCount: 10,
    page: 1
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUsers: (state, action) => {
            state.items = action.payload
        },
        getTotalUsersCount: (state, action) => {
            state.usersTotalCount = action.payload
        },
    },
})




export const createThunkGetUsers = () => async (dispatch) => {
    const users = await API.getUsers()
    dispatch(getUsers(users.items))
    dispatch(getTotalUsersCount(users.totalCount))
}

export const {getUsers, getTotalUsersCount} = usersSlice.actions

export default usersSlice.reducer