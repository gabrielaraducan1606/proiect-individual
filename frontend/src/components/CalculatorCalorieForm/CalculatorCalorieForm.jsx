import React, { useState } from "react";
import styles from "./CalculatorCalorieForm.module.css";

const CalculatorCalorieForm = ({ onCalculate }) => {
    const [height, setHeight] = useState("");
    const [age, setAge] = useState("");
    const [currentWeight, setCurrentWeight] = useState("");
    const [desiredWeight, setDesiredWeight] = useState("");
    const [bloodType, setBloodType] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!height || !age || !currentWeight || !desiredWeight || !bloodType) {
            setError("All fields are required!");
            return;
        }

        setError("");
        onCalculate({ height, age, currentWeight, desiredWeight, bloodType });
    };

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
            {error && <p className={styles.errorText}>{error}</p>}
            <input type="number" placeholder="Height (cm) *" value={height} onChange={(e) => setHeight(e.target.value)} />
            <input type="number" placeholder="Age *" value={age} onChange={(e) => setAge(e.target.value)} />
            <input type="number" placeholder="Current weight *" value={currentWeight} onChange={(e) => setCurrentWeight(e.target.value)} />
            <input type="number" placeholder="Desired weight *" value={desiredWeight} onChange={(e) => setDesiredWeight(e.target.value)} />

            <div className={styles.bloodTypeContainer}>
                <label>Blood Type*</label>
                {[1, 2, 3, 4].map((type) => (
                    <label key={type}>
                        <input type="radio" name="bloodType" value={type} checked={bloodType === String(type)} onChange={(e) => setBloodType(e.target.value)} />
                        {type}
                    </label>
                ))}
            </div>

            <button type="submit">Calculate</button>
        </form>
    );
};

export default CalculatorCalorieForm;
