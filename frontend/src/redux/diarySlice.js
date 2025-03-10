import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dailyCalories: 0,  // Caloriile zilnice calculate
    consumedCalories: 0,  // Caloriile consumate de utilizator
    foodEntries: []  // Lista cu produsele consumate
};

const diarySlice = createSlice({
    name: "diary",
    initialState,
    reducers: {
        setDailyCalories: (state, action) => {
            state.dailyCalories = action.payload;
        },
        addFoodEntry: (state, action) => {
            state.foodEntries.push(action.payload);
            state.consumedCalories += action.payload.calories; // ✅ Adăugăm caloriile consumate
        },
        removeFoodEntry: (state, action) => {
            const foodToRemove = state.foodEntries.find(food => food.id === action.payload);
            if (foodToRemove) {
                state.consumedCalories -= foodToRemove.calories; // ✅ Scădem caloriile consumate
                state.foodEntries = state.foodEntries.filter(food => food.id !== action.payload);
            }
        }
    }
});

export const { setDailyCalories, addFoodEntry, removeFoodEntry } = diarySlice.actions;
export default diarySlice.reducer;
