import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeConsumedFood } from "../../redux/caloriesSlice";
import styles from "./DiaryProductsList.module.css";

const DiaryProductsList = ({ selectedDate }) => {
    const dispatch = useDispatch();

    // ✅ Ensure selectedDate is a string
    const formattedDate =
        selectedDate instanceof Date
            ? selectedDate.toISOString().split("T")[0]
            : new Date(selectedDate).toISOString().split("T")[0];

    const consumedFoods = useSelector((state) => state.calories.consumedFoods[formattedDate] || []);

    return (
        <div className={styles.productsListContainer}>
            {consumedFoods.length === 0 ? (
                <p>No products added yet.</p>
            ) : (
                <ul className={styles.productsList}>
                    {consumedFoods.map((food, index) => (
                        <li key={index}>
                            <span className={styles.productName}>{food.name}</span>
                            <span className={styles.productWeight}>{food.weight}g</span>
                            <span className={styles.productCalories}>{food.calories.toFixed(2)} kcal</span>
                            <button 
                                className={styles.deleteButton} 
                                onClick={() => dispatch(removeConsumedFood({ date: formattedDate, index }))}
                            >
                                ✕
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DiaryProductsList;
