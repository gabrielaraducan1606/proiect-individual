import express from "express";
import { calculateCalories } from "../controllers/calorieController.js";

const router = express.Router();

// ✅ Middleware de debugging pentru fiecare request
router.use((req, res, next) => {
    console.log(`📌 [${req.method}] Request to ${req.originalUrl}`);
    next();
});

// ✅ Ruta pentru calcul calorii și returnare produse nerecomandate
router.post("/", calculateCalories);

export default router;
