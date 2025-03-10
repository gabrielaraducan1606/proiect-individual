import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dailyCalories: 0,
    consumedCalories: 0,
};

const caloriesSlice = createSlice({
    name: "calories",
    initialState,
    reducers: {
        setDailyCalories: (state, action) => {
            state.dailyCalories = action.payload;
        },
        addConsumedCalories: (state, action) => {
            state.consumedCalories += action.payload;
        },
        removeConsumedCalories: (state, action) => {  // ✅ Adăugat aici!
            state.consumedCalories -= action.payload;
            if (state.consumedCalories < 0) state.consumedCalories = 0;
        }
    }
});

export const { setDailyCalories, addConsumedCalories, removeConsumedCalories } = caloriesSlice.actions;
export default caloriesSlice.reducer;
