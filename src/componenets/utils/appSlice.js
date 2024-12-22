import { createSlice } from "@reduxjs/toolkit";

const appslice=createSlice({
    name:'app',
    initialState:{
        ismenuopen:false,
        profile:false,
        chanelid:null,
        watch:false,
    },
    reducers:{
        tooglemenu:(state,action)=>{
    state.ismenuopen=action.payload;

 },
 toogleprofile:(state,action)=>{
    state.profile=action.payload;
 },
 changechannelid:(state,action)=>{
    state.chanelid=action.payload;
 },
 togglewatch:(state,action)=>{
    state.watch=action.payload;
 }

 }
}
)
export const{tooglemenu,toogleprofile,togglewatch,changechannelid}=appslice.actions;
export default appslice.reducer;
