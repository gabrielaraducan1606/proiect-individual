import React from "react";
import { useSelector } from "react-redux";
import styles from "./Summary.module.css";

const Summary = ({ selectedDate }) => {
    const { dailyCalories = 0, consumedFoods = {} } = useSelector((state) => state.calories || {});

    // ✅ Ensure `selectedDate` is always a valid Date
    let dateObject;
    try {
        dateObject = selectedDate instanceof Date ? selectedDate : new Date(selectedDate);
        if (isNaN(dateObject)) throw new Error("Invalid date");
    } catch (error) {
        dateObject = new Date(); // Set default to today's date if invalid
    }

    const formattedDate = dateObject.toISOString().split("T")[0]; // ✅ Safe conversion

    // ✅ Get total calories consumed for the selected date
    const consumedCalories = (consumedFoods[formattedDate] || []).reduce((total, food) => total + food.calories, 0);
    const remainingCalories = dailyCalories - consumedCalories;
    const percentageOfDailyIntake = dailyCalories > 0 ? ((consumedCalories / dailyCalories) * 100).toFixed(1) : 0;

    return (
        <div className={styles.summaryContainer}>
            <h3 className={styles.summaryTitle}>Summary for {dateObject.toLocaleDateString("ro-RO")}</h3>
            <ul className={styles.summaryList}>
                <li><span>Left</span> {remainingCalories} kcal</li>
                <li><span>Consumed</span> {consumedCalories} kcal</li>
                <li><span>Daily Rate</span> {dailyCalories} kcal</li>
                <li><span>% of normal</span> {percentageOfDailyIntake}%</li>
            </ul>
        </div>
    );
};

export default Summary;
