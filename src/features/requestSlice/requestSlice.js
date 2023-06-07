import { createSlice } from "@reduxjs/toolkit";

export const requestSlice = createSlice({
    name: "userRequest",
    initialState: {
        userRequest:null
    },
    reducers: {
        userRequest: (state,action) => {
            state.userRequest = action.payload;
            // console.log(state.status);
        },
        
    }
})

export const { userRequest } = requestSlice.actions;

export const selectUserRequest = (state) => state.userRequest.userRequest;

export default requestSlice.reducer;