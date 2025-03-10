import React from "react";
import { useSelector } from "react-redux";
import styles from "./Summary.module.css";

const getFormattedDate = () => {
    const today = new Date();
    return `${String(today.getDate()).padStart(2, "0")}.${String(today.getMonth() + 1).padStart(2, "0")}.${today.getFullYear()}`;
};

const Summary = () => {
    const { dailyCalories = 0, consumedCalories = 0 } = useSelector((state) => state.calories || {});
    const remainingCalories = dailyCalories - consumedCalories;
    const percentageOfDailyIntake = dailyCalories > 0 ? ((consumedCalories / dailyCalories) * 100).toFixed(1) : 0;

    return (
        <div className={styles.summaryContainer}>
            <h3 className={styles.summaryTitle}>Summary for {getFormattedDate()}</h3>
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
