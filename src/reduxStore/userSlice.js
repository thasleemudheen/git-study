import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userId:null,
    userName:''
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        addUserDetalis:(state,action)=>{
            state.userId=action.payload.id,
            state.userName=action.payload.name
        },
        clearUserDetails: (state) => {
            state.userId = null;
            state.userName = '';
        }
    }
})
export const {addUserDetalis,clearUserDetails}=userSlice.actions
export default userSlice.reducer