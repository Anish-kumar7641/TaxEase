const express = require("express");
const { autoFillTaxForm, validateTaxForm } = require("../controllers/taxFillingController");

const router = express.Router();

// Route to auto-fill the tax form
router.post("/auto-fill", autoFillTaxForm);

// Route to validate the tax form
router.post("/validate", validateTaxForm);

module.exports = router;
