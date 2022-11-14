import {API} from "../../api/API";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    items: [],
    usersTotalCount: null,
    displayedUsersCount: 100,
    currentPage: 1,
    status: null,
    profileInfo: {},
    isLoading: false
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.items = action.payload
        },
        setTotalUsersCount: (state, action) => {
            state.usersTotalCount = action.payload
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setStatus: (state, action) => {
            state.status = action.payload
        },
        setProfileInfo: (state, action) => {
            state.profileInfo = action.payload
        },
        isLoading: (state, action) => {
            state.isLoading = action.payload
        },
    },
})


export const createThunkGetUsers = (displayedUsersCount, newPage, userName) => async (dispatch) => {
    dispatch(isLoading(true))
    const users = await API.getUsers(displayedUsersCount, newPage, userName)
    if (!users.error) {
        dispatch(setCurrentPage(newPage))
        dispatch(setUsers(users.items))
        dispatch(setTotalUsersCount(users.totalCount))
    }
    dispatch(isLoading(false))
}
export const createThunkGetStatus = (userId) => async (dispatch) => {
    const status = await API.getStatus(userId)
    dispatch(setStatus(status))
}
export const createThunkSetStatus = (status) => async (dispatch) => {
    const answer = await API.setStatus(status)
    answer.resultCode !== 1 && dispatch(setStatus(status))
}
export const createThunkGetProfileInfo = (userId) => async (dispatch) => {
    dispatch(isLoading(true))
    const profileInfo = await API.getProfileInfo(userId)
    dispatch(setProfileInfo(profileInfo))
    dispatch(isLoading(false))
}
export const createThunkSendProfileForm = (data, userId) => async (dispatch) => {
    dispatch(isLoading(true))
    await API.sendProfileForm(data)
    dispatch(createThunkGetProfileInfo(userId))
    dispatch(isLoading(false))
}
export const createThunkSetPhoto = (photo, userId) => async (dispatch) => {
    await API.setPhoto(photo)
    dispatch(createThunkGetProfileInfo(userId))
}


export const {setUsers, setTotalUsersCount, setCurrentPage, setStatus, setProfileInfo, isLoading} = usersSlice.actions

export default usersSlice.reducer