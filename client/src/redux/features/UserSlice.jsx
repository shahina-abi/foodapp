import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  userAuthorized: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.userInfo = action.payload;
      state.userAuthorized = true; // Mark user as authorized
    },
    clearUser: (state) => {
      state.userInfo = null;
      state.userAuthorized = false; // Mark user as unauthorized
    },
  },
});

export const { saveUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
