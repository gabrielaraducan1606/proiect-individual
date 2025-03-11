import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dailyCalories: 0,
    consumedCalories: 0,
    consumedFoods: {}, // ✅ Store foods per date { "2024-03-13": [{ food item }] }
};

const caloriesSlice = createSlice({
    name: "calories",
    initialState,
    reducers: {
        // ✅ Set daily calorie goal
        setDailyCalories: (state, action) => {
            state.dailyCalories = action.payload;
        },

        // ✅ Add consumed food correctly
        addConsumedFood: (state, action) => {
            const { date, name, weight, calories } = action.payload;

            // ✅ Use structured cloning to avoid direct mutation
            const updatedConsumedFoods = { ...state.consumedFoods };

            if (!updatedConsumedFoods[date]) {
                updatedConsumedFoods[date] = [];
            }

            updatedConsumedFoods[date] = [
                ...updatedConsumedFoods[date],
                { name, weight, calories }
            ];

            return {
                ...state,
                consumedFoods: updatedConsumedFoods,
                consumedCalories: Object.values(updatedConsumedFoods)
                    .flat()
                    .reduce((total, food) => total + food.calories, 0),
            };
        },

        // ✅ Remove consumed food
        removeConsumedFood: (state, action) => {
            const { date, index } = action.payload;

            if (state.consumedFoods[date]) {
                const updatedFoods = [...state.consumedFoods[date]];
                updatedFoods.splice(index, 1); // Remove selected item

                // ✅ Create a new object to avoid direct state mutation
                const updatedConsumedFoods = { ...state.consumedFoods };
                if (updatedFoods.length > 0) {
                    updatedConsumedFoods[date] = updatedFoods;
                } else {
                    delete updatedConsumedFoods[date]; // Remove date if empty
                }

                return {
                    ...state,
                    consumedFoods: updatedConsumedFoods,
                    consumedCalories: Object.values(updatedConsumedFoods)
                        .flat()
                        .reduce((total, food) => total + food.calories, 0),
                };
            }
        },
    },
});

export const { setDailyCalories, addConsumedFood, removeConsumedFood } = caloriesSlice.actions;
export default caloriesSlice.reducer;
