const express = require("express");
const { autoFillTaxForm, validateTaxForm, submitTaxReturn } = require("../controllers/taxFillingController");
const auth = require('../middleware/authMiddleware')

const router = express.Router();

// Route to auto-fill the tax form
router.post("/auto-fill", auth, autoFillTaxForm);

// Route to validate the tax form
router.post("/validate",auth, validateTaxForm);

// Route to submit the tax form
router.post("/submit",auth, submitTaxReturn);

module.exports = router;
