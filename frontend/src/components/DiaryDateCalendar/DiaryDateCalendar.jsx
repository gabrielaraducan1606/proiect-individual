import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DiaryDateCalendar.module.css";

const DiaryDateCalendar = ({ selectedDate, setSelectedDate }) => {
    return (
        <div className={styles.calendarContainer}>
            <h3 className={styles.calendarTitle}>Select Date:</h3>
            <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd.MM.yyyy"
                className={styles.datePicker}
            />
        </div>
    );
};

export default DiaryDateCalendar;
