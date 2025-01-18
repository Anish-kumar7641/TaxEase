const UserTaxData = require("../models/userTaxData");

// Auto-fill tax form based on PAN number or create new entry
const autoFillTaxForm = async (req, res) => {
  try {
    const { formData } = req.body;
    const { panNumber } = req.body.formData.personalInfo; 

    // Find existing record
    const existingFiling = await UserTaxData.findOne({ 
      'personalInfo.panNumber': panNumber 
    }).sort({ date: -1 });

    if (existingFiling) {
      // Return existing data for returning users

      return res.json({
        status: 'success',
        message: 'Previous records found',
        data: existingFiling,
        isNewUser: false
      });
    } 
    else {

      return res.status(201).json({
        status: 'info',
        message: 'No previous records found. Please fill in your details.',
        isNewUser: true
      });
    }
  } catch (error) {

    res.status(500).json({ 
      status: 'error',
      message: "Error processing tax form data",
      error: error.message
    });
  }
};

// Validate tax form
const validateTaxForm = async (req, res) => {
  try {

    // const formData=req.body;
    
    
    const {personalInfo,incomeDetails, deductions, taxPayments} = req.body;

    // Validation checks
    const errors = [];

    // 1. Basic validation
    if (!personalInfo.panNumber.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)) {
      errors.push("Invalid PAN format");
    }

    if (!personalInfo.aadhaarNumber.match(/^\d{12}$/)) {
      errors.push("Invalid Aadhaar format");
    }

    // 2. Income validation
    const totalIncome = incomeDetails.salary.gross + 
      Object.values(incomeDetails.otherIncome).reduce((a, b) => a + b, 0);


    // 3. Deductions validation
    const totalDeductions = Object.values(deductions).reduce((a, b) => a + b, 0);

    if (totalDeductions > totalIncome * 0.5) {
      errors.push("Total deductions cannot exceed 50% of total income");
    }

    // 4. Section 80C validation (max 1.5L)
    if (deductions.section80C > 150000) {
      errors.push("Section 80C deductions cannot exceed ₹1,50,000");
    }

    // 5. Tax payments validation
    const totalTaxPaid = Object.values(taxPayments).reduce((a, b) => a + b, 0);
    // Calculate expected tax based on income slab

    const expectedTax = calculateTax(totalIncome, totalDeductions);
    
    if (totalTaxPaid < expectedTax) {
      errors.push(`Tax paid (₹${totalTaxPaid}) is less than expected tax (₹${expectedTax})`);
    }

    if (errors.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors
      });
    }

    res.json({
      status: 'success',
      message: 'All validations passed',
      taxCalculation: {
        totalIncome,
        totalDeductions,
        taxableIncome: totalIncome - totalDeductions,
        expectedTax
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Validation failed',
      error: error.message
    });
  }
};

// Submit tax return
const submitTaxReturn = async (req, res) => {
  try {
    // Create a copy of the request body and ensure no _id field is carried over
    const {
      formData: {
        _id,
        assessmentYear,
        personalInfo,
        incomeDetails,
        deductions,
        taxPayments,
        ...rest
      },
    } = req.body; // Extract from formData
	

    
    // Create a new instance of UserTaxData with a sanitized payload
    const taxData = new UserTaxData({
      assessmentYear,
      personalInfo, // Include personal information
      userId: req.user.id, // Ensure the user ID is included
      incomeDetails, // Add income details
      deductions, // Add deductions
      taxPayments, // Add tax payments
      ...rest, // Include any additional fields
    });
    

    // Save the new tax return entry to the database
    await taxData.save();

    res.status(201).json({
      success: true,
      message: 'Tax return submitted successfully',
      referenceNumber: taxData._id // Send the new _id as reference
    });
  } catch (error) {

    res.status(500).json({
      success: false,
      message: 'Failed to submit tax return',
      error: error.message
    });
  }
};


// Helper function to calculate tax based on income slab
const calculateTax = (totalIncome, totalDeductions) => {
  const taxableIncome = totalIncome - totalDeductions;
  let tax = 0;

  // New tax regime slabs (FY 2024-25)
  if (taxableIncome <= 300000) {
    tax = 0;
  } else if (taxableIncome <= 600000) {
    tax = (taxableIncome - 300000) * 0.05;
  } else if (taxableIncome <= 900000) {
    tax = 15000 + (taxableIncome - 600000) * 0.10;
  } else if (taxableIncome <= 1200000) {
    tax = 45000 + (taxableIncome - 900000) * 0.15;
  } else if (taxableIncome <= 1500000) {
    tax = 90000 + (taxableIncome - 1200000) * 0.20;
  } else {
    tax = 150000 + (taxableIncome - 1500000) * 0.30;
  }

  // Add 4% cess
  tax = tax + (tax * 0.04);

  return Math.round(tax);
};

module.exports = {
  autoFillTaxForm,
  validateTaxForm,
  submitTaxReturn
};