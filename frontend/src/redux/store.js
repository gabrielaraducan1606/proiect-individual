import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import loaderReducer from "./loaderSlice"; // ✅ Import corect
import modalReducer from "./modalSlice"; // ✅ Import corect
import caloriesReducer from "./caloriesSlice"; // ✅ Reducer pentru calorii

const store = configureStore({
    reducer: {
        user: userReducer,
        loader: loaderReducer,
        modal: modalReducer,
        calories: caloriesReducer
    }
});

export default store;
