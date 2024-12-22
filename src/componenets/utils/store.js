import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import darkmodeSlice from "./darkmodeSlice";
import searchResultSlice from "./searchResultSlice";
const store = configureStore({
  reducer: {
    app: appSlice,
    dark: darkmodeSlice, 
    searchResult:searchResultSlice,
    // darkmode state will be under 'state.dark'
  },
});

export default store;
