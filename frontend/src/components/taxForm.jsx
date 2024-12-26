import React, { useState } from "react";
import { autoFillTaxForm, validateTaxForm } from "../utils/api";

function TaxForm() {
  const [formData, setFormData] = useState({
    name: "",
    income: "",
    investments: "",
    deductions: "",
  });
  const [autoFilledData, setAutoFilledData] = useState({});
  const [validationStatus, setValidationStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAutoFill = async () => {
    const response = await autoFillTaxForm(formData);
    setAutoFilledData(response.data);
  };

  const handleValidation = async () => {
    const response = await validateTaxForm(formData);
    setValidationStatus(response.data);
  };

  return (
    <div className="tax-form">
      <h2>Tax Filing Form</h2>
      <form>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Income</label>
          <input type="number" name="income" value={formData.income} onChange={handleChange} />
        </div>
        <div>
          <label>Investments</label>
          <input type="number" name="investments" value={formData.investments} onChange={handleChange} />
        </div>
        <div>
          <label>Deductions</label>
          <input type="number" name="deductions" value={formData.deductions} onChange={handleChange} />
        </div>
        <button type="button" onClick={handleAutoFill}>
          Auto-Fill
        </button>
        <button type="button" onClick={handleValidation}>
          Validate
        </button>
      </form>
      {autoFilledData && <pre>{JSON.stringify(autoFilledData, null, 2)}</pre>}
      {validationStatus && <p>Validation Status: {validationStatus.message}</p>}
    </div>
  );
}

export default TaxForm;
