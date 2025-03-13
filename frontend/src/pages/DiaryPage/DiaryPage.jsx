import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedDate } from "../../redux/caloriesSlice";
import DiaryDateCalendar from "../../components/DiaryDateCalendar/DiaryDateCalendar";
import DiaryAddProductForm from "../../components/DiaryAddProductForm/DiaryAddProductForm";
import DiaryProductsList from "../../components/DiaryProductsList/DiaryProductsList";
import Summary from "../../components/Summary/Summary";
import styles from "./DiaryPage.module.css";

const DiaryPage = () => {
    const dispatch = useDispatch();
    const selectedDate = useSelector((state) => state.calories.selectedDate);

    useEffect(() => {
        if (!selectedDate || isNaN(new Date(selectedDate).getTime())) {
            console.error("🚨 Invalid selectedDate detected. Resetting to today.");
            const today = new Date().toISOString().split("T")[0];
            dispatch(setSelectedDate(today));
        }
    }, [selectedDate, dispatch]);

    const formattedDate = selectedDate;

    const dailyCaloriesByDate = useSelector((state) => state.calories.dailyCaloriesByDate || {});
    const consumedFoods = useSelector((state) => state.calories.consumedFoods || {});

    console.log("📌 [DiaryPage] Selected Date:", formattedDate);
    console.log("📌 [DiaryPage] dailyCaloriesByDate:", dailyCaloriesByDate);
    console.log("📌 [DiaryPage] consumedFoods:", consumedFoods);

    const dailyCalories = dailyCaloriesByDate[formattedDate] || 0;

    const handleDateChange = (newDate) => {
        if (newDate instanceof Date && !isNaN(newDate.getTime())) {
            dispatch(setSelectedDate(newDate.toISOString().split("T")[0]));
        } else {
            console.error("🚨 Invalid date selected");
        }
    };

    return (
        <div className={styles.diaryContainer}>
            <div className={styles.leftContent}>
                <DiaryDateCalendar selectedDate={new Date(selectedDate)} setSelectedDate={handleDateChange} />
                <DiaryAddProductForm selectedDate={new Date(selectedDate)} />
                <DiaryProductsList selectedDate={new Date(selectedDate)} />
            </div>

            <div className={styles.rightContent}>
                <h3 className={styles.dailyCaloriesTitle}>Daily Calories Goal: {dailyCalories.toFixed(2)} kcal</h3>
                <Summary selectedDate={new Date(selectedDate)} />
            </div>
        </div>
    );
};

export default DiaryPage;
