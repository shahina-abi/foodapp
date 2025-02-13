// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   userInfo: null,
//   userAuthorized: false,
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     saveUser: (state, action) => {
//       state.userInfo = action.payload;
//       state.userAuthorized = true; // Mark user as authorized
//     },
//     clearUser: (state) => {
//       state.userInfo = null;
//       state.userAuthorized = false; // Mark user as unauthorized
//     },
//   },
// });

// export const { saveUser, clearUser } = userSlice.actions;
// export default userSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserAuth: false,
  userData: {},
};

// export const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     saveUser: (state, action) => {
//       state.isUserAuth = true;
//       state.userData = action.payload;
//     },
//     clearUser: (state) => {
//       state.isUserAuth = false;
//       state.userData = {};
//     },
//   },
// });
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
   saveUser: (state, action) => {
  return { isUserAuth: true, userData: action.payload.data }; // Store data directly
},
    clearUser: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { saveUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
