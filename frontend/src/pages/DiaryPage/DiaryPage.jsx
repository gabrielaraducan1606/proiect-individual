import React, { useState, useEffect } from "react";
import DiaryDateCalendar from "../../components/DiaryDateCalendar/DiaryDateCalendar";
import DiaryAddProductForm from "../../components/DiaryAddProductForm/DiaryAddProductForm";
import DiaryProductsList from "../../components/DiaryProductsList/DiaryProductsList";
import styles from "./DiaryPage.module.css";

const DiaryPage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [consumedFoods, setConsumedFoods] = useState([]);

    // ✅ Load foods from local storage when date changes
    useEffect(() => {
        const savedFoods = JSON.parse(localStorage.getItem(`foods_${selectedDate.toISOString().split("T")[0]}`)) || [];
        setConsumedFoods(savedFoods);
    }, [selectedDate]);

    // ✅ Add food & save to local storage
    const handleAddFood = (food) => {
        const updatedFoods = [...consumedFoods, food];
        setConsumedFoods(updatedFoods);
        localStorage.setItem(`foods_${selectedDate.toISOString().split("T")[0]}`, JSON.stringify(updatedFoods));
    };

    // ✅ Remove food & update storage
    const handleRemoveFood = (index) => {
        const updatedFoods = consumedFoods.filter((_, i) => i !== index);
        setConsumedFoods(updatedFoods);
        localStorage.setItem(`foods_${selectedDate.toISOString().split("T")[0]}`, JSON.stringify(updatedFoods));
    };

    return (
        <div className={styles.diaryContainer}>
            <div className={styles.leftContent}>
                <DiaryDateCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                <DiaryAddProductForm selectedDate={selectedDate} onAddFood={handleAddFood} />
                <DiaryProductsList consumedFoods={consumedFoods} onDeleteFood={handleRemoveFood} />
            </div>
        </div>
    );
};

export default DiaryPage;
