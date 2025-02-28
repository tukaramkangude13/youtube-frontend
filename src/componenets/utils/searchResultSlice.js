import { createSlice } from "@reduxjs/toolkit";

const searchResultSlice = createSlice({
  name: "searchResult",
  initialState: {
    datase: null,
  },
  reducers: {
    setsearchResult: (state, action) => {
      state.datase = action.payload;
    },
  },
});
export const { setsearchResult } = searchResultSlice.actions;
export default searchResultSlice.reducer;
