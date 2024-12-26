const express = require("express");
const { calculateTax, getTaxProjection } = require("../controllers/taxController");
const router = express.Router();

router.post("/calculate", calculateTax);
router.post("/projections", getTaxProjection);

module.exports = router;
