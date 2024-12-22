import { createSlice } from "@reduxjs/toolkit";

const darkmodeSlice=createSlice({
    name:'dark',
    initialState:{
        isdark:true,
        issearch:true,
    },
    reducers:{
toggledark:(state)=>{
state.isdark=!state.isdark;
}, 
togglesearch:(state,action)=>{
    state.issearch=action.payload;
}, 
setDarkMode(state, action) {
    state.darkMode = action.payload; // Set dark mode state based on the payload
  },
    }
})
export const {toggledark,setDarkMode,togglesearch}=darkmodeSlice.actions;
export default darkmodeSlice.reducer