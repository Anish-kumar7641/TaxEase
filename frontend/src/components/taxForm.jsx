import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { FileText, CheckCircle, AlertCircle, Download, Send } from "lucide-react";
import { autoFillTaxForm, validateTaxForm } from "../utils/api";

function TaxForm() {
  const [formData, setFormData] = useState({
    name: "",
    pan: "",
    income: "",
    investments: "",
    deductions: "",
    address: "",
    phone: ""
  });
  const [autoFilledData, setAutoFilledData] = useState(null);
  const [validationStatus, setValidationStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAutoFill = async () => {
    setLoading(true);
    try {
      const response = await autoFillTaxForm(formData);
      setAutoFilledData(response.data);
      setFormData({ ...formData, ...response.data });
    } catch (error) {
      console.error("Auto-fill error:", error);
    }
    setLoading(false);
  };

  const handleValidation = async () => {
    setLoading(true);
    try {
      const response = await validateTaxForm(formData);
      setValidationStatus(response.data);
    } catch (error) {
      console.error("Validation error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-6 h-6" />
            Tax Filing Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">
            Complete your tax filing process easily with our intelligent assistant. 
            Auto-fill your information from previous records and validate your submission 
            before filing.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter your full name as per PAN"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">PAN Number</label>
                <input
                  type="text"
                  name="pan"
                  value={formData.pan}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter your 10-digit PAN"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Annual Income (₹)</label>
                <input
                  type="number"
                  name="income"
                  value={formData.income}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter your total annual income"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Total Investments (₹)</label>
                <input
                  type="number"
                  name="investments"
                  value={formData.investments}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter total investments made"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Claimed Deductions (₹)</label>
                <input
                  type="number"
                  name="deductions"
                  value={formData.deductions}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter total deductions claimed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                  rows="3"
                  placeholder="Enter your current residential address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter your contact number"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={handleAutoFill}
              disabled={loading}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              <Download className="w-4 h-4" />
              Auto-Fill from Previous Records
            </button>
            
            <button
              type="button"
              onClick={handleValidation}
              disabled={loading}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              Validate Form
            </button>
          </div>

          {validationStatus && (
            <Card className={`mt-6 ${
              validationStatus.status === 'success' ? 'bg-green-50' : 'bg-red-50'
            }`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  {validationStatus.status === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}
                  <p className={`${
                    validationStatus.status === 'success' ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {validationStatus.message}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default TaxForm;