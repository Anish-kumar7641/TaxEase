const mongoose = require("mongoose");

const userTaxDataSchema = new mongoose.Schema({
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
  personalInfo: {
    name: { type: String, required: true },
    panNumber: { type: String, required: true },
    aadhaarNumber: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    bankDetails: {
      accountNumber: { type: String, required: true },
      ifscCode: { type: String, required: true },
      bankName: { type: String, required: true }
    }
  },
  incomeDetails: {
    salary: {
      gross: { type: Number, default: 0 },
      deductions: { type: Number, default: 0 },
      net: { type: Number, default: 0 }
    },
    otherIncome: {
      interest: { type: Number, default: 0 },
      rental: { type: Number, default: 0 },
      businessIncome: { type: Number, default: 0 },
      capitalGains: { type: Number, default: 0 }
    }
  },
  deductions: {
    section80C: { type: Number, default: 0 },
    section80D: { type: Number, default: 0 },
    homeLoanInterest: { type: Number, default: 0 },
    educationLoanInterest: { type: Number, default: 0 },
    otherDeductions: { type: Number, default: 0 }
  },
  taxPayments: {
    tds: { type: Number, default: 0 },
    advanceTax: { type: Number, default: 0 },
    selfAssessmentTax: { type: Number, default: 0 }
  },
  assessmentYear: { type: String, required: true },
  status: {
    type: String,
    enum: ['filed','draft'],
    default: 'filed'
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Make sure to export the model correctly
const UserTaxData = mongoose.model('UserTaxData', userTaxDataSchema);
module.exports = UserTaxData;