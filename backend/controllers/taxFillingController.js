const UserTaxData = require("../models/userTaxData");

// Auto-fill tax form
const autoFillTaxForm = async (req, res) => {
    const { name, income, investments, deductions } = req.body;
    
    // Check if the user data already exists
    let userData = await UserTaxData.findOne({ name, income });
  
    if (!userData) {
      // If user doesn't exist, create a new user entry
      userData = new UserTaxData({
        name,
        income,
        investments,
        deductions,
      });
  
      // Save the newly created user data
      await userData.save();
      return res.status(201).json(userData); // Returning the newly created user data
    }
  
    // If user data exists, return it
    res.json(userData);
  };
  

// Validate tax form
const validateTaxForm = async (req, res) => {
  const { income, deductions } = req.body;

  // Example validation
  if (deductions > income * 0.5) {
    return res.status(400).json({ message: "Deductions exceed allowable limit" });
  }

  res.json({ message: "Validation successful" });
};

module.exports = { autoFillTaxForm, validateTaxForm };
