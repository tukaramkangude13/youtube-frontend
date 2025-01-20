import { createSlice } from "@reduxjs/toolkit";

const userProfileSlice = createSlice({
    name: 'userprofile',
    initialState: {
        videos: null,
        shorts: null,
        playlisttitle:null,
        playlists: null,
        watchlaterlist:[],
        likevideo:[],
    },
    reducers: {
        uservideo: (state, action) => {
            state.videos = action.payload;
        },
        usershort: (state, action) => {
            state.shorts = action.payload;
        },
        userplaylist: (state, action) => {
            state.playlists = action.payload;
        },
        
            plalistname:(state,action)=>{
                state.playlisttitle=action.payload;
            
        },
        laterplaylist:(state,action)=>{
            state.watchlaterlist.unshift(action.payload);
        },
        likevideoadd:(state,action)=>{
            state.likevideo.unshift(action.payload);
        }

    },
});


export const{uservideo,usershort,userplaylist,plalistname,laterplaylist,likevideoadd}=  userProfileSlice.actions;
export default userProfileSlice.reducer;