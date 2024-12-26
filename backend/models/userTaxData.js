const mongoose = require("mongoose");

const userTaxDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  income: { type: Number, required: true },
  investments: { type: Number, required: true },
  deductions: { type: Number, required: true },
});

module.exports = mongoose.model("UserTaxData", userTaxDataSchema);
