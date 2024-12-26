import React from "react";

function TaxFormSummary({ formData }) {
  return (
    <div className="tax-form-summary">
      <h3>Form Summary</h3>
      <p><strong>Name:</strong> {formData.name}</p>
      <p><strong>Income:</strong> ₹{formData.income}</p>
      <p><strong>Investments:</strong> ₹{formData.investments}</p>
      <p><strong>Deductions:</strong> ₹{formData.deductions}</p>
    </div>
  );
}

export default TaxFormSummary;
