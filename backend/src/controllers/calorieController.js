export const calculateCalories = (req, res) => {
    const { weight, height, age, desiredWeight } = req.body;

    if (!weight || !height || !age || !desiredWeight) {
        return res.status(400).json({ message: "Toate câmpurile sunt obligatorii." });
    }

    const dailyCalories = 10 * weight + 6.25 * height - 5 * age - 161 - 10 * (weight - desiredWeight);

    res.json({ dailyCalories });
};
