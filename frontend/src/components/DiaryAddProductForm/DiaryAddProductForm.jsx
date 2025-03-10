import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addConsumedCalories } from "../../redux/caloriesSlice";
import productsData from "../../data/products.json";
import styles from "./DiaryAddProductForm.module.css";

const DiaryAddProductForm = ({ selectedDate }) => {
    const dispatch = useDispatch();
    const [product, setProduct] = useState("");
    const [weight, setWeight] = useState("");
    const [error, setError] = useState("");

    const handleAddFood = () => {
        if (!product || !weight) {
            setError("Please enter a product and weight.");
            return;
        }
        setError("");

        const foundProduct = productsData.find((p) => p.title.toLowerCase() === product.toLowerCase());

        if (!foundProduct) {
            setError("Product not found in database.");
            return;
        }

        const calories = (foundProduct.calories / 100) * weight;
        dispatch(addConsumedCalories(calories));

        setProduct("");
        setWeight("");
    };

    return (
        <div className={styles.productForm}>
            <h3>Add Product for {selectedDate.toLocaleDateString()}</h3>
            {error && <p className={styles.errorText}>{error}</p>}
            <input type="text" placeholder="Product Name" value={product} onChange={(e) => setProduct(e.target.value)} />
            <input type="number" placeholder="Weight (g)" value={weight} onChange={(e) => setWeight(e.target.value)} />
            <button onClick={handleAddFood}>+</button>
        </div>
    );
};

export default DiaryAddProductForm;
