import express from "express";
import { calculateCalories } from "../controllers/calorieController.js";

const router = express.Router();

router.post("/", calculateCalories);

export default router;
