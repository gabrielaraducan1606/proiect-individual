import React from "react";
import styles from "./DiaryProductsList.module.css";

const DiaryProductsList = ({ consumedFoods = [], onDeleteFood }) => {
    return (
        <div className={styles.productsListContainer}>
            {consumedFoods.length === 0 ? (
                <p>No products added yet.</p>
            ) : (
                <ul className={styles.productsList}>
                    {consumedFoods.map((food, index) => (
                        <li key={index}>
                            {/* ✅ Aliment (stânga) */}
                            <span className={styles.productName}>{food.name}</span>

                            {/* ✅ Cantitate (dreapta) */}
                            <span className={styles.productWeight}>{food.weight}g</span>

                            {/* ✅ Calorii (dreapta) */}
                            <span className={styles.productCalories}>
                                {food.calories.toFixed(2)} kcal
                            </span>

                            {/* ✅ Butonul de ștergere (X) */}
                            <button 
                                className={styles.deleteButton} 
                                onClick={() => onDeleteFood(index)} // ✅ Acum funcția este definită corect
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
