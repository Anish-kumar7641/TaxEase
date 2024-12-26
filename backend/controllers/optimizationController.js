const tf = require("@tensorflow/tfjs-node");
const path = require("path");

const modelPath = path.resolve(__dirname, "../models/taxOptimizerModel/model.json");

const getSuggestions = async (req, res) => {
    try {
        const { income, expenses, currentInvestments } = req.body;

        // Preprocess input data
        const inputTensor = tf.tensor2d([
            [income, expenses.medical || 0, currentInvestments.length]
        ]);

        // Load the trained model
        const model = await tf.loadLayersModel(`file://${modelPath}`);

        // Get predictions
        const predictions = model.predict(inputTensor).dataSync(); // Get raw predictions


        // Interpret predictions (example: threshold-based)
        const recommendationList = [
            "Invest in PPF to utilize the full 80C deduction.",
            "Claim medical insurance premium under Section 80D.",
            "Consider investing in ELSS funds for tax-saving and growth.",
            "Explore NPS for additional 80CCD(1B) benefits.",
            "Utilize HRA exemption if applicable.",
            "Claim deductions on education loan interest under Section 80E.",
            "Deduct donations to charitable organizations under Section 80G.",
            "Claim tax benefits for interest paid on home loans under Section 24(b).",
            "Invest in tax-saving fixed deposits with a lock-in period of 5 years.",
            "Maximize savings through Sukanya Samriddhi Yojana for a girl child.",
            "Claim Leave Travel Allowance (LTA) for travel within India.",
            "Take advantage of the standard deduction for salaried employees.",
            "Deduct expenses incurred on treatment of specified diseases under Section 80DDB.",
            "Utilize exemptions for meal coupons or food allowances provided by employers.",
            "Invest in Voluntary Provident Fund (VPF) for additional tax-free returns.",
            "Claim benefits on rent paid under Section 10(13A) if you don't receive HRA."
        ];
        

        const suggestions = recommendationList.filter((_, index) => predictions[index] > 0.2);

        res.json({ suggestions });
    } catch (error) {
        console.error("Error in getSuggestions:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { getSuggestions };
