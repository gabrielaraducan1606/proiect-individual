import React, { useState, useEffect } from "react";
import productsData from "../../data/products.json"; // ✅ Importăm lista de produse
import styles from "./DiaryAddProductForm.module.css";

const DiaryAddProductForm = ({ selectedDate, onAddFood }) => {
    const [product, setProduct] = useState("");
    const [weight, setWeight] = useState("");
    const [calories, setCalories] = useState(0);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        // ✅ Filtrăm produsele pe baza textului introdus
        if (product.length > 0) {
            const filtered = productsData.filter((p) =>
                p.title.toLowerCase().includes(product.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts([]);
        }
    }, [product]);

    const handleSelectProduct = (selectedProduct) => {
        setProduct(selectedProduct.title);
        setCalories(selectedProduct.calories);
        setFilteredProducts([]); // ✅ Ascundem sugestiile după selectare
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!product || !weight) return;

        const totalCalories = (weight / 100) * calories; // ✅ Calculăm caloriile corect

        onAddFood({ name: product, weight, calories: totalCalories });
        setProduct("");
        setWeight("");
        setCalories(0);
    };

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        placeholder="Enter food name"
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                        className={styles.inputField}
                    />
                    {/* ✅ Lista de sugestii */}
                    {filteredProducts.length > 0 && (
                        <ul className={styles.suggestions}>
                            {filteredProducts.slice(0, 5).map((p) => (
                                <li key={p._id.$oid} onClick={() => handleSelectProduct(p)}>
                                    {p.title} ({p.calories} kcal/100g)
                                </li>
                            ))}
                        </ul>
                    )}
                

                <input
                    type="number"
                    placeholder="Grams"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className={styles.inputField}
                />
                
                <button type="submit" className={styles.submitButton}>+</button>
</div>
            </form>
        </div>
    );
};

export default DiaryAddProductForm;
