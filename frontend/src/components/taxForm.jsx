import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { FileText, CheckCircle, AlertCircle, Download, Send } from "lucide-react";

import { autoFill, validate, submitForm } from "../utils/api";

const TaxForm = () => {
  const [istaxvalid,setIstaxvalid] = useState(false);
  const [formData, setFormData] = useState({
    personalInfo: {
      name: "",
      panNumber: "",
      aadhaarNumber: "",
      dateOfBirth: "",
      address: "",
      email: "",
      phone: "",
      bankDetails: {
        accountNumber: "",
        ifscCode: "",
        bankName: ""
      }
    },
    incomeDetails: {
      salary: {
        gross: 0,
        deductions: 0,
        net: 0
      },
      otherIncome: {
        interest: 0,
        rental: 0,
        businessIncome: 0,
        capitalGains: 0
      }
    },
    deductions: {
      section80C: 0,
      section80D: 0,
      homeLoanInterest: 0,
      educationLoanInterest: 0,
      otherDeductions: 0
    },
    taxPayments: {
      tds: 0,
      advanceTax: 0,
      selfAssessmentTax: 0
    },
    assessmentYear: new Date().getFullYear().toString(),
  });

  const [errors, setErrors] = useState({});
  const [validationStatus, setValidationStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  // Helper functions for handling form changes
  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleNestedChange = (section, subsection, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [field]: value
        }
      }
    }));
  };

  const handleFileUpload = (documentType, files) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [documentType]: documentType.endsWith('s') ? [...files] : files[0]
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // PAN validation
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(formData.personalInfo.panNumber)) {
      newErrors.pan = "Invalid PAN format";
    }

    // Aadhaar validation
    const aadhaarRegex = /^\d{12}$/;
    if (!aadhaarRegex.test(formData.personalInfo.aadhaarNumber)) {
      newErrors.aadhaar = "Invalid Aadhaar format";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.personalInfo.email)) {
      newErrors.email = "Invalid email format";
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.personalInfo.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    // Bank details validation
    if (!formData.personalInfo.bankDetails.accountNumber) {
      newErrors.accountNumber = "Account number is required";
    }
    if (!formData.personalInfo.bankDetails.ifscCode) {
      newErrors.ifscCode = "IFSC code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAutoFill = async () => {
    if (!formData.personalInfo.panNumber) {
      setValidationStatus({
        status: 'error',
        message: 'Please enter PAN number first'
      });
      return;
    }

    setLoading(true);
    try {
      
      const token = localStorage.getItem('token');
      const  response  = await autoFill({ formData, token });
      const result=response.data;
      if (result.status === 'success' && !result.isNewUser) {
        // Existing user - auto-fill the form
        setFormData(prev => ({ ...prev, ...result.data }));
        setValidationStatus({
          status: 'success',
          message: 'Form auto-filled with previous records'
        });
      }
       else if (result.isNewUser) {
        // New user - save current form data
        setValidationStatus({
          status: 'success',
          message: 'No previous records found. Please fill in your details.'
        });
      }
    } catch (error) {
      console.error('Auto-fill error:', error);
      setValidationStatus({
        status: 'error',
        message: error.message || 'Error processing your request'
      });
    }
    setLoading(false);
  };

  // Add a save draft function
  const saveDraft = async () => {
    if (!formData.personalInfo.panNumber) {
      setValidationStatus({
        status: 'error',
        message: 'Please enter at least PAN number before saving'
      });
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const  {response}  = await autoFill({ formData, token });
      const result=response.data;
      if (result.status === 'success') {
        setValidationStatus({
          status: 'success',
          message: 'Draft saved successfully'
        });
      }
    } catch (error) {
      setValidationStatus({
        status: 'error',
        message: 'Failed to save draft'
      });
    }
    setLoading(false);
  };

  const handleValidation = async () => {
    if (!validateForm()) {
      setValidationStatus({
        status: 'error',
        message: 'Please correct the errors in the form'
      });
      setIstaxvalid(false);
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response  = await validate({
        token,
        personalInfo: formData.personalInfo,
        incomeDetails: formData.incomeDetails,
        deductions: formData.deductions,
        taxPayments: formData.taxPayments,
        
      })
     
      
      setValidationStatus(response.data);
      setIstaxvalid(true);
    } catch (error) {
      
      setValidationStatus({
        status: 'error',
        message: (
          <ul className="list-disc pl-4">
            {error.response.data.errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        ) || 'Validation failed'
      });
      setIstaxvalid(false);
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    if(!istaxvalid){
      setValidationStatus(
        {message: 'First validate your tax data'}
      )
      return;
    }
    

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await submitForm ({token, formData});
      const result = response.data;
      if (result.success) {
        setValidationStatus({
          status: 'success',
          message: 'Tax return submitted successfully'
        });
      }
    } catch (error) {
      setValidationStatus({
        status: 'error',
        message: 'Failed to submit tax return'
      });
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-6 h-6" />
            Tax Filing Form
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name*</label>
                  <input
                    type="text"
                    value={formData.personalInfo.name}
                    onChange={(e) => handleChange('personalInfo', 'name', e.target.value)}
                    className="w-full rounded-md border p-2"
                    placeholder="Enter full name as per PAN"
                    required
                  />
                  {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">PAN Number*</label>
                  <input
                    type="text"
                    value={formData.personalInfo.panNumber}
                    onChange={(e) => handleChange('personalInfo', 'panNumber', e.target.value.toUpperCase())}
                    className="w-full rounded-md border p-2"
                    placeholder="Enter 10-digit PAN"
                    required
                  />
                  {errors.pan && <span className="text-red-500 text-sm">{errors.pan}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Aadhaar Number</label>
                  <input
                    type="text"
                    value={formData.personalInfo.aadhaarNumber}
                    onChange={(e) => handleChange('personalInfo', 'aadhaarNumber', e.target.value)}
                    className="w-full rounded-md border p-2"
                    placeholder="Enter 12-digit Aadhaar"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.personalInfo.dateOfBirth}
                    onChange={(e) => handleChange('personalInfo', 'dateOfBirth', e.target.value)}
                    className="w-full rounded-md border p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={(e) => handleChange('personalInfo', 'email', e.target.value)}
                    className="w-full rounded-md border p-2"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.personalInfo.phone}
                    onChange={(e) => handleChange('personalInfo', 'phone', e.target.value)}
                    className="w-full rounded-md border p-2"
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <textarea
                    value={formData.personalInfo.address}
                    onChange={(e) => handleChange('personalInfo', 'address', e.target.value)}
                    className="w-full rounded-md border p-2"
                    rows="3"
                    placeholder="Enter complete address"
                  />
                </div>
              </div>

              {/* Bank Details Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Bank Details</h3>
                <div>
                  <label className="block text-sm font-medium mb-1">Bank Name</label>
                  <input
                    type="text"
                    value={formData.personalInfo.bankDetails.bankName}
                    onChange={(e) => handleChange('personalInfo', 'bankDetails', { ...formData.personalInfo.bankDetails, bankName: e.target.value })}
                    className="w-full rounded-md border p-2"
                    placeholder="Enter bank name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Account Number</label>
                  <input
                    type="text"
                    value={formData.personalInfo.bankDetails.accountNumber}
                    onChange={(e) => handleChange('personalInfo', 'bankDetails', { ...formData.personalInfo.bankDetails, accountNumber: e.target.value })}
                    className="w-full rounded-md border p-2"
                    placeholder="Enter account number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">IFSC Code</label>
                  <input
                    type="text"
                    value={formData.personalInfo.bankDetails.ifscCode}
                    onChange={(e) => handleChange('personalInfo', 'bankDetails', { ...formData.personalInfo.bankDetails, ifscCode: e.target.value })}
                    className="w-full rounded-md border p-2"
                    placeholder="Enter IFSC code"
                  />
                </div>
              </div>
            </div>
            {/* Right Column */}
            <div className="space-y-6">
              {/* Income Details Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Income Details</h3>
                <div>
                  <label className="block text-sm font-medium mb-1">Gross Salary</label>
                  <input
                    type="number"
                    value={formData.incomeDetails.salary.gross === "" ? "" : formData.incomeDetails.salary.gross}
                    onChange={(e) => {
                      const value = e.target.value;
                      handleNestedChange(
                        'incomeDetails',
                        'salary',
                        'gross',
                        value === "" ? "" : Number(value)
                      );
                    }}
                    className="w-full rounded-md border p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Business Income</label>
                  <input
                    type="number"
                    value={formData.incomeDetails.otherIncome.businessIncome === "" ? "" : formData.incomeDetails.otherIncome.businessIncome}
                    onChange={(e) => {
                      const value = e.target.value;
                      handleNestedChange('incomeDetails', 'otherIncome', 'businessIncome',
                        value === "" ? "" : Number(value))
                    }}
                    className="w-full rounded-md border p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Capital Gains</label>
                  <input
                    type="number"
                    value={formData.incomeDetails.otherIncome.capitalGains === "" ? "" : formData.incomeDetails.otherIncome.capitalGains}
                    onChange={(e) => {
                      const value = e.target.value;
                      handleNestedChange('incomeDetails', 'otherIncome', 'capitalGains',
                        value === "" ? "" : Number(value))
                    }}
                    className="w-full rounded-md border p-2"
                  />
                </div>
              </div>

              {/* Deductions Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Deductions</h3>
                <div>
                  <label className="block text-sm font-medium mb-1">Section 80C</label>
                  <input
                    type="number"
                    value={formData.deductions.section80C === "" ? "" : formData.deductions.section80C}
                    onChange={(e) => {
                      const value = e.target.value;
                      handleChange('deductions', 'section80C',
                        value === "" ? "" : Number(value))
                    }}
                    className="w-full rounded-md border p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Section 80D</label>
                  <input
                    type="number"
                    value={formData.deductions.section80D === "" ? "" : formData.deductions.section80D}
                    onChange={(e) => {
                      const value = e.target.value;
                      handleChange('deductions', 'section80D',
                        value === "" ? "" : Number(value))
                    }}
                    className="w-full rounded-md border p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Home Loan Interest</label>
                  <input
                    type="number"
                    value={formData.deductions.homeLoanInterest === "" ? "" : formData.deductions.homeLoanInterest}
                    onChange={(e) => {
                      const value = e.target.value;
                      handleChange('deductions', 'homeLoanInterest',
                        value === "" ? "" : Number(value))
                    }}
                    className="w-full rounded-md border p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Education Loan Interest</label>
                  <input
                    type="number"
                    value={formData.deductions.educationLoanInterest === "" ? "" : formData.deductions.educationLoanInterest}
                    onChange={(e) => {
                      const value = e.target.value;
                      handleChange('deductions', 'educationLoanInterest',
                        value === "" ? "" : Number(value))
                    }}
                    className="w-full rounded-md border p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Other Deductions</label>
                  <input
                    type="number"
                    value={formData.deductions.otherDeductions === "" ? "" : formData.deductions.otherDeductions}
                    onChange={(e) => {
                      const value = e.target.value;
                      handleChange('deductions', 'otherDeductions',
                        value === "" ? "" : Number(value))
                    }}
                    className="w-full rounded-md border p-2"
                  />
                </div>
              </div>

              {/* Tax Payments Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Tax Payments</h3>
                <div>
                  <label className="block text-sm font-medium mb-1">TDS</label>
                  <input
                    type="number"
                    value={formData.taxPayments.tds === "" ? "" : formData.taxPayments.tds}
                    onChange={(e) => {
                      const value = e.target.value;
                      handleChange('taxPayments', 'tds',
                        value === "" ? "" : Number(value))
                    }}
                    className="w-full rounded-md border p-2"
                  />

                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Advance Tax</label>
                  <input
                    type="number"
                    value={formData.taxPayments.advanceTax === "" ? "" : formData.taxPayments.advanceTax}
                    onChange={(e) => {
                      const value = e.target.value;
                      handleChange('taxPayments', 'advanceTax',
                        value === "" ? "" : Number(value))
                    }}
                    className="w-full rounded-md border p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Self Assessment Tax</label>
                  <input
                    type="number"
                    value={formData.taxPayments.selfAssessmentTax === "" ? "" : formData.taxPayments.selfAssessmentTax}
                    onChange={(e) => {
                      const value = e.target.value;
                      handleChange('taxPayments', 'selfAssessmentTax',
                        value === "" ? "" : Number(value))
                    }}
                    className="w-full rounded-md border p-2"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleAutoFill}
              disabled={loading}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              <Download className="w-4 h-4" />
              Auto-Fill
            </button>
            <button
              onClick={handleValidation}
              disabled={loading}
              className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              <CheckCircle className="w-4 h-4" />
              Validate
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
            >
              <Send className="w-4 h-4" />
              Submit Return
            </button>
          </div>

          {/* Validation Status */}
          {validationStatus && (
            <div className={`mt-4 p-4 rounded-md ${validationStatus.status === 'success' ? 'bg-green-50' : 'bg-red-50'}`}>
              <div className="flex items-center gap-2">
                {validationStatus.status === 'success' ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                )}
                <p className={validationStatus.status === 'success' ? 'text-green-700' : 'text-red-700'}>
                  {validationStatus.message}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxForm;