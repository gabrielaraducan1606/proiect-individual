import React from "react";
import { useDispatch } from "react-redux";
import { removeConsumedCalories } from "../../redux/caloriesSlice";
import styles from "./DiaryProductsList.module.css";

const DiaryProductsList = ({ consumedFoods }) => {
    const dispatch = useDispatch();

    const handleDeleteFood = (index) => {
        const removedFood = consumedFoods[index];
        dispatch(removeConsumedCalories(removedFood.calories));
    };

    return (
        <div className={styles.productList}>
            <h3>Consumed Products</h3>
            <ul>
                {consumedFoods.length > 0 ? (
                    consumedFoods.map((food, index) => (
                        <li key={index}>
                            {food.product} - {food.weight}g - {food.calories} kcal
                            <button onClick={() => handleDeleteFood(index)}>X</button>
                        </li>
                    ))
                ) : (
                    <li>No products added.</li>
                )}
            </ul>
        </div>
    );
};

export default DiaryProductsList;
