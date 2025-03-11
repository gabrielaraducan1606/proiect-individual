import React, { useState } from "react";
import DiaryDateCalendar from "../../components/DiaryDateCalendar/DiaryDateCalendar";
import DiaryAddProductForm from "../../components/DiaryAddProductForm/DiaryAddProductForm";
import DiaryProductsList from "../../components/DiaryProductsList/DiaryProductsList";
import Summary from "../../components/Summary/Summary";
import styles from "./DiaryPage.module.css";

const DiaryPage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div className={styles.diaryContainer}>
            <div className={styles.leftContent}>
                <DiaryDateCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                <DiaryAddProductForm selectedDate={selectedDate} />
                <DiaryProductsList selectedDate={selectedDate} />
            </div>
            <Summary selectedDate={selectedDate} />
        </div>
    );
};

export default DiaryPage;
