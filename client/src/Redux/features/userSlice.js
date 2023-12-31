import { createSlice } from "@reduxjs/toolkit";


// initialize state
const initialState = {
    currentUser: null,
    loading: false,
    error: false
}

//create userSlice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = false
        },
        signInSuccess: (state, action) =>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false
        },
        signInFaliure: (state, action) => {
            state.loading = false;
            state.error = action.payload
        }
    }
})

export const {signInFaliure, signInStart, signInSuccess} = userSlice.actions
export default userSlice.reducer