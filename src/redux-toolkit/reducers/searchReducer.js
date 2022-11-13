import {API} from "../../api/API";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentStringForSearch: ''
};

export const searchSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        changeCurrentStringForSearch: (state, action) => {
            state.currentStringForSearch = action.payload
        },
    },
})



export const {changeCurrentStringForSearch} = searchSlice.actions

export default searchSlice.reducer