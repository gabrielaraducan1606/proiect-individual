import React, { useState } from "react";
import styles from "./CalculatorPage.module.css";

const CalculatorPage = () => {
    const [height, setHeight] = useState("");
    const [age, setAge] = useState("");
    const [currentWeight, setCurrentWeight] = useState("");
    const [desiredWeight, setDesiredWeight] = useState("");
    const [bloodType, setBloodType] = useState("");
    const [calories, setCalories] = useState(null);
    const [error, setError] = useState("");

    const calculateCalories = async (e) => {
        e.preventDefault();
        setError("");

        // ✅ Verificare dacă toate câmpurile sunt completate
        if (!height || !age || !currentWeight || !desiredWeight || !bloodType) {
            setError("Please fill in all fields!");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/calories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ height, age, currentWeight, desiredWeight, bloodType }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Calculation failed");
            }

            setCalories(data.dailyCalories);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className={styles.calculatorPage}>
            <h1 className={styles.title}>Calculate your daily calorie intake right now</h1>

            {/* ✅ Formular */}
            <form className={styles.formContainer} onSubmit={calculateCalories}>
                <div className={styles.leftColumn}>
                    <input
                        type="number"
                        placeholder="Height (cm) *"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className={styles.inputField}
                    />

                    <input
                        type="number"
                        placeholder="Age *"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className={styles.inputField}
                    />

                    <input
                        type="number"
                        placeholder="Current weight *"
                        value={currentWeight}
                        onChange={(e) => setCurrentWeight(e.target.value)}
                        className={styles.inputField}
                    />
                </div>

                <div className={styles.rightColumn}>
                    <input
                        type="number"
                        placeholder="Desired weight *"
                        value={desiredWeight}
                        onChange={(e) => setDesiredWeight(e.target.value)}
                        className={styles.inputField}
                    />

                    {/* ✅ Blood Type */}
                    <div className={styles.bloodTypeContainer}>
    <label className={styles.bloodTypeLabel}>Blood Type*</label>
    <ul className={styles.bloodTypeOptions}>
        {[1, 2, 3, 4].map((type) => (
            <li key={type}>
                <input
                    type="radio"
                    name="bloodType"
                    value={type}
                    checked={bloodType === String(type)}
                    onChange={(e) => setBloodType(e.target.value)}
                />
                <span>{type}</span> {/* ✅ Textul rămâne aliniat perfect */}
            </li>
        ))}
    </ul>
</div>

                </div>

                <button type="submit" className={styles.submitButton}>
                    Start losing weight
                </button>
            </form>

            {/* ✅ Mesaj de eroare */}
            {error && <p className={styles.errorMessage}>{error}</p>}

            {/* ✅ Rezultatul calculului */}
            {calories && (
                <div className={styles.resultContainer}>
                    <h3>Calorii zilnice necesare: {calories}</h3>
                </div>
            )}
        </div>
    );
};

export default CalculatorPage;
