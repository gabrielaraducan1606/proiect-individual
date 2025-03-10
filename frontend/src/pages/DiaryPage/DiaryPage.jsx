import React, { useState } from "react";
import DiaryDateCalendar from "../../components/DiaryDateCalendar/DiaryDateCalendar";
import DiaryAddProductForm from "../../components/DiaryAddProductForm/DiaryAddProductForm";
import DiaryProductsList from "../../components/DiaryProductsList/DiaryProductsList";
import RightSidebar from "../../components/RightSideBar/RightSideBar";
import styles from "./DiaryPage.module.css";

const DiaryPage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [consumedFoods, setConsumedFoods] = useState([]);

    return (
        <div className={styles.diaryContainer}>
            <div className={styles.leftContent}>
                <DiaryDateCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                <DiaryAddProductForm selectedDate={selectedDate} setConsumedFoods={setConsumedFoods} />
                <DiaryProductsList consumedFoods={consumedFoods} />
            </div>
            <RightSidebar />
        </div>
    );
};

export default DiaryPage;
