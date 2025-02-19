
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserAuth: false,
  userData: {},
};


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
// import { createSlice } from "@reduxjs/toolkit";

// // Set initial value
// const initialState = {
//     isUserAuth: true,
//     userData: {}
// }

// // Create user slice
// export const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         saveUser: (state, action) => {
//             (state.isUserAuth = true),
//             (state.userData = action.payload)
//         },
//         clearUser: (state) => {
//             (state.isUserAuth = false), (state.userData = {})
//         }
//     }
// })

// export const {saveUser, clearUser} = userSlice.actions

// export default userSlice.reducer