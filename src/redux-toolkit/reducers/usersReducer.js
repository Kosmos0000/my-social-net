import {API} from "../../api/API";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    items: [],
    usersTotalCount: null,
    displayedUsersCount: 100,
    currentPage: 1,
    status: '',
    profileInfo: {},
    isLoading: false,
    subscribers: {}
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
        follow: (state, action) => {
            state.items = state.items.map(user => {
                if (user.id === action.payload) {
                    return {...user, followed: true}
                } else {
                    return user
                }
            })
        },
        unfollow: (state, action) => {
            state.items = state.items.map(user => {
                if (user.id === action.payload) {
                    return {...user, followed: false}
                } else {
                    return user
                }
            })
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
    await API.sendProfileForm(data)
    dispatch(createThunkGetProfileInfo(userId))
}
export const createThunkSetPhoto = (photo, userId) => async (dispatch) => {
    await API.setPhoto(photo)
    dispatch(createThunkGetProfileInfo(userId))
}
export const createThunkFollow = (userId) => async (dispatch) => {
    const resultCode = await API.follow(userId)
    if (!resultCode) {
        dispatch(follow(userId))
    }
}
export const createThunkUnfollow = (userId) => async (dispatch) => {
    const resultCode = await API.unfollow(userId)
    if (!resultCode) {
        dispatch(unfollow(userId))
    }
}


export const {setUsers, setTotalUsersCount, setCurrentPage, setStatus, setProfileInfo, isLoading, follow, unfollow} = usersSlice.actions

export default usersSlice.reducer