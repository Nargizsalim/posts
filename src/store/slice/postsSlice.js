import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayData: [],
  displayItem: [],
  displayComment: [],
  currentPage: 1,
};
const postSlice = createSlice({
  name: "postList",
  initialState,
  reducers: {
    setDisplayData(state, action) {
      state.displayData = action.payload;
    },
    setDisplayItem(state, action) {
      state.displayItem = state.displayData.filter(
        (el) => el.id === action.payload
      );
    },
    setDisplayComment(state, action) {
      state.displayComment = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const {
  setDisplayData,
  setDisplayItem,
  setDisplayComment,
  setCurrentPage,
} = postSlice.actions;
export default postSlice.reducer;
