import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import darkmodeSlice from "./darkmodeSlice";
import searchResultSlice from "./searchResultSlice";
import commentSlice from "./commentSlice";
import userProfileSlice from "./userProfileSlice"
import UserProfile from "../UserProfile";
const store = configureStore({
  reducer: {
    app: appSlice,
    dark: darkmodeSlice,
    searchResult: searchResultSlice,
comment:commentSlice,
userprofile:userProfileSlice
},
});

export default store;
