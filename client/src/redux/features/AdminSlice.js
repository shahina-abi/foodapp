// // File: src/redux/features/adminSlice.js

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   isAdminExist: false, // Indicates if the admin is logged in
//   adminData: null, // Stores admin details
// };

// const adminSlice = createSlice({
//   name: "admin",
//   initialState,
//   reducers: {
//     // Save admin data when logged in
//     saveadmin: (state, action) => {
//       state.isAdminExist = true;
//       state.adminData = action.payload;
//     },
//     // Clear admin data when logged out
//     clearadmin: (state) => {
//       state.isAdminExist = false;
//       state.adminData = null;
//     },
//   },
// });

// export const { saveadmin, clearadmin } = adminSlice.actions;

// export default adminSlice.reducer;
// import { createSlice } from "@reduxjs/toolkit";

// const adminSlice = createSlice({
//   name: "admin",
//   initialState: {
//     isAdminExist: false,
//     adminData: null,
//   },
//   reducers: {
//     saveadmin: (state, action) => {
//       state.isAdminExist = true;
//       state.adminData = action.payload;
//     },
//     clearadmin: (state) => {
//       state.isAdminExist = false;
//       state.adminData = null;
//     },
//   },
// });

// export const { saveadmin, clearadmin } = adminSlice.actions;
// export default adminSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   adminData: null,
//   isAdminAuth: false, // Ensure this is correctly updated
// };

// const adminSlice = createSlice({
//   name: "admin",
//   initialState,
//   reducers: {
//     saveAdmin: (state, action) => {
//       state.adminData = action.payload;
//       state.isAdminAuth = true; // Ensure authentication state updates
//       localStorage.setItem("adminToken", action.payload.token);
//     },
//     clearAdmin: (state) => {
//       state.adminData = null;
//       state.isAdminAuth = false;
//       localStorage.removeItem("adminToken");
//     },
//   },
// });

// export const { saveAdmin, clearAdmin } = adminSlice.actions;
// export default adminSlice.reducer;
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
      localStorage.setItem("adminToken", action.payload.token); // ✅ Store token persistently
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
