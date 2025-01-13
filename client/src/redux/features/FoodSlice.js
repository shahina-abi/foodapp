// src/redux/foodSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popularItems: [],
};

const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    setPopularItems(state, action) {
      state.popularItems = action.payload;
    },
  },
});

export const { setPopularItems } = foodSlice.actions;
export default foodSlice.reducer;
