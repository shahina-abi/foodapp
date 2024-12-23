import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userAuthorized: false,
  userInfo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser(state, action) {
      state.userAuthorized = true;
      state.userInfo = action.payload;
    },
    clearUser(state) {
      state.userAuthorized = false;
      state.userInfo = null;
    },
  },
});

export const { saveUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
