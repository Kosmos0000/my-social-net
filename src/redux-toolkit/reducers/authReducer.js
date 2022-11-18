import {API} from "../../api/API";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    data: {
        id: null,
        email: null,
        login: null,
        isAuth: false,
        captchaUrl: null
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
        setCaptcha: (state, action) => {
            state.data.captchaUrl = action.payload
        },
    },
})

export const createThunkGetDataAuthMe = () => async (dispatch) => {
    const data = await API.getDataAuthMe()
    dispatch(setDataAuthMe(data))
}
export const createThunkAuthorizeUser = ({email, password, rememberMe, captcha}) => async (dispatch) => {
    const resultCode = await API.authorizeUser({email, password, rememberMe, captcha})
    if (!resultCode) {
        dispatch(createThunkGetDataAuthMe())
    } else if (resultCode === 10) {
        dispatch(createThunkGetCaptcha())
    }
}
export const createThunkSignOut = () => async (dispatch) => {
    const resultCode = await API.signOut()
    if (!resultCode) dispatch(signOut())
}
export const createThunkGetCaptcha = () => async (dispatch) => {
    const captchaUrl = await API.getCaptcha()
    if (captchaUrl) dispatch(setCaptcha(captchaUrl))
}

export const {setDataAuthMe, signOut, setCaptcha} = usersSlice.actions

export default usersSlice.reducer