// src/redux/features/ThemeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: true, // Default theme: true for light, false for dark
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = !state.theme; // Toggle between light and dark
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
