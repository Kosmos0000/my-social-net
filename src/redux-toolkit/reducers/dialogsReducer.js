import {API} from "../../api/API";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    page: 1,
    count: 10,
    totalCount: 0,
    dialogs: [],
    listMessages: [],
    isSendMessage: false
};

export const dialogsSlice = createSlice({
    name: 'dialogs',
    initialState,
    reducers: {
        setAllDialogs: (state, action) => {
            state.dialogs = action.payload
        },
        setListMessages: (state, action) => {
            state.listMessages = action.payload
        },
        setIsSendMessage: (state, action) => {
            state.isSendMessage = action.payload
        },
    },
})


export const createThunkGetAllDialogs = () => async (dispatch) => {
    const data = await API.dialogs.getAllDialogs()
    dispatch(setAllDialogs(data))
}
export const createThunkStartChatting = (userId, page, count) => async (dispatch) => {
    const resultCode = await API.dialogs.startChatting(userId)
    if (!resultCode) {
        dispatch(setIsSendMessage(true))
        createThunkGetListMessages(userId, page, count)
    }

}
export const createThunkGetListMessages = (userId, page, count) => async (dispatch) => {
    const data = await API.dialogs.getListMessages(userId, page, count)
    if (!data.resultCode) {
        dispatch(setListMessages(data.items))
        dispatch(setIsSendMessage(true))
    }
}
export const createThunkSendMessage = (userId, message, page, count) => async (dispatch) => {
    const data = await API.dialogs.sendMessage(userId, message)
    if (!data.resultCode) {
        dispatch(createThunkGetListMessages(userId, page, count))
    }

}


export const {setAllDialogs, setListMessages, setIsSendMessage} = dialogsSlice.actions

export default dialogsSlice.reducer