
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/UserSlice";
import foodReducer from "./features/FoodSlice";
import adminReducer from "./features/AdminSlice";
//import themeReducer from "./features/ThemeSlice"; // Import the theme slice

const store = configureStore({
  reducer: {
    user: userReducer,
    food: foodReducer,
    admin: adminReducer,
    //theme: themeReducer, // Add the theme slice
  },
});

export default store;
