
import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    isAdminAuth: !!localStorage.getItem("adminToken"), // ✅ Persist auth state
    adminData: null,
  },
  reducers: {
    saveAdmin: (state, action) => {
      state.isAdminAuth = true;
      state.adminData = action.payload;
      if (action.payload?.token) {
        localStorage.setItem("adminToken", action.payload.token);
      }
    },
    clearAdmin: (state) => {
      state.isAdminAuth = false;
      state.adminData = null;
      localStorage.removeItem("adminToken"); // ✅ Remove token on logout
    },
  },
});

export const { saveAdmin, clearAdmin } = adminSlice.actions;
export default adminSlice.reducer;
