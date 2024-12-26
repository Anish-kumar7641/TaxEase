const express = require("express");
const { getSuggestions } = require("../controllers/optimizationController");
const router = express.Router();

router.post("/suggestions", getSuggestions);

module.exports = router;
