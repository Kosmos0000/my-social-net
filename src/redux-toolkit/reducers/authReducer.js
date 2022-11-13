import {API} from "../../api/API";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    data: {
        id: null,
        email: null,
        login: null,
        isAuth: false
    }
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setDataAuthMe: (state, action) => {
            if (Object.entries(action.payload).length !== 0) {
                state.data = {...action.payload, isAuth: true}
            }
        },
        signOut: (state, action) => {
            state.data = {
                id: null,
                email: null,
                login: null,
                isAuth: false
            }
        },
    },
})

export const createThunkGetDataAuthMe = () => async (dispatch) => {
    const data = await API.getDataAuthMe()
    dispatch(setDataAuthMe(data))
}
export const createThunkAuthorizeUser = ({email, password, rememberMe}) => async (dispatch) => {
    const resultCode = await API.authorizeUser({email, password, rememberMe})
    resultCode === 0 && dispatch(createThunkGetDataAuthMe())
}
export const createThunkSignOut = () => async (dispatch) => {
    const resultCode = await API.signOut()
    resultCode === 0 && dispatch(signOut())
}

export const {setDataAuthMe, signOut} = usersSlice.actions

export default usersSlice.reducer