// File: src/redux/features/adminSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAdminExist: false, // Indicates if the admin is logged in
  adminData: null, // Stores admin details
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    // Save admin data when logged in
    saveadmin: (state, action) => {
      state.isAdminExist = true;
      state.adminData = action.payload;
    },
    // Clear admin data when logged out
    clearadmin: (state) => {
      state.isAdminExist = false;
      state.adminData = null;
    },
  },
});

export const { saveadmin, clearadmin } = adminSlice.actions;

export default adminSlice.reducer;
