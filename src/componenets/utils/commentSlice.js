import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comment: [], // Initialize as an array if storing multiple comments
    filtercomment: null,
  },
  reducers: {
    setComment: (state, action) => {
      console.log("Set Comment Action Dispatched:", action.payload); // Debugging
      state.comment = action.payload;
    },
    filterComment: (state, action) => {
      console.log("Filter Comment Action Dispatched:", action.payload); // Debugging
      state.filtercomment = action.payload;
    },
  },
});

export const { setComment, filterComment } = commentSlice.actions;
export default commentSlice.reducer;
