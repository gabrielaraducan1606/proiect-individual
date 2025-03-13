import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./Summary.module.css";

const Summary = ({ selectedDate }) => {
    const navigate = useNavigate();
    
    // ✅ Debugging Redux Structure
    const reduxState = useSelector((state) => state);
    console.log("🛠 Redux Full State:", reduxState);

    // ✅ Corectare useSelector - extrage corect user
    const user = useSelector((state) => state.user?.userInfo || null);
    console.log("🔎 Extracted User:", user);
    
    const { dailyCaloriesByDate = {}, consumedFoods = {} } = useSelector((state) => state.calories);

    let dateObject = selectedDate instanceof Date && !isNaN(selectedDate) ? selectedDate : new Date();
    const formattedDate = dateObject.toISOString().split("T")[0];

    useEffect(() => {
        console.log("📌 [Summary] Selected Date:", formattedDate);
        console.log("📌 [Summary] Daily Calories:", dailyCaloriesByDate[formattedDate] || 0);
        console.log("📌 [Summary] Consumed Calories:", (consumedFoods[formattedDate] || []).reduce((total, food) => total + food.calories, 0));

        if (!user || !user.bloodType) {
            console.warn("⚠️ User or blood type is missing!", user);
            return;
        }
        
        const bloodIndex = parseInt(user.bloodType, 10);
        if (isNaN(bloodIndex) || bloodIndex < 1 || bloodIndex > 4) {
            console.warn("⚠️ Invalid blood type:", user.bloodType);
            return;
        }
    }, [formattedDate, dailyCaloriesByDate, consumedFoods, user]);

    // ✅ Memorizează produsele interzise pentru optimizare
    const forbiddenFoods = useSelector((state) => state.calories.forbiddenFoods || []);
    console.log("🚫 Forbidden Foods from Redux:", forbiddenFoods);

    const dailyCalories = dailyCaloriesByDate[formattedDate] || 0;
    const consumedCalories = (consumedFoods[formattedDate] || []).reduce((total, food) => total + food.calories, 0);
    const remainingCalories = Math.max(dailyCalories - consumedCalories, 0);
    const percentageOfDailyIntake = dailyCalories > 0 ? ((consumedCalories / dailyCalories) * 100).toFixed(1) : 0;

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className={styles.summaryContainer}>
            <div className={styles.summaryHeader}>
                <button className={styles.navButton} onClick={() => navigate("/summary")}>Nic</button>
                <div className={styles.verticalBar}></div>
                <button className={styles.logoutButton} onClick={handleLogout}>Exit</button>
            </div>

            <h3 className={styles.summaryTitle}>Summary for {dateObject.toLocaleDateString("ro-RO")}</h3>

            <ul className={styles.summaryList}>
                <li><span>Left</span> {remainingCalories.toFixed(2)} kcal</li>
                <li><span>Consumed</span> {consumedCalories.toFixed(2)} kcal</li>
                <li><span>Daily rate</span> {dailyCalories.toFixed(2)} kcal</li>
                <li><span>% of normal</span> {percentageOfDailyIntake}%</li>
            </ul>

            <div className={styles.forbiddenFoodsContainer}>
                <h3 className={styles.title2}>Food not recommended</h3>
                <div className={styles.scrollableForbiddenList}>
                    <ol className={styles.forbiddenList}>
                        {forbiddenFoods.length > 0 ? (
                            forbiddenFoods.map((food, index) => (
                                <li key={food._id?.$oid || food._id}>{index + 1}. {food.title}</li>
                            ))
                        ) : (
                            <li>No restricted foods found.</li>
                        )}
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default Summary;