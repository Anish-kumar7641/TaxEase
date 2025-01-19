import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { PieChart, DollarSign, Tag, ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { getSuggestions } from "../utils/api";

const TaxOptimization = () => {
  const navigate = useNavigate();
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState({
    medical: '',
    education: '',
    housing: '',
    retirement: ''
  });
  const [currentInvestments, setCurrentInvestments] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const handleSubmit = async () => {
    try {
      const { data } = await getSuggestions({ income, expenses, currentInvestments });
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error("Error fetching suggestions", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => navigate('/dashboard')}
        className="mb-6 flex items-center gap-2 hover:bg-gray-100 p-0 rounded-full transition-colors duration-200"
        aria-label="Go back to dashboard"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="w-6 h-6" />
            AI-Powered Tax Optimization Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">
            Get personalized tax-saving recommendations based on your income, expenses, and current investments. Our AI analyzes your financial profile to suggest optimal tax-saving strategies.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  <DollarSign className="w-4 h-4 inline-block mr-1" />
                  Annual Income
                </label>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter your annual income"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium mb-2">Expenses Breakdown</h3>
                {Object.entries({
                  medical: 'Medical Expenses',
                  education: 'Education Expenses',
                  housing: 'Housing Loan EMI',
                  retirement: 'Retirement Contributions'
                }).map(([key, label]) => (
                  <div key={key}>
                    <label className="block text-sm text-gray-600 mb-1">{label}</label>
                    <input
                      type="number"
                      value={expenses[key]}
                      onChange={(e) => setExpenses({ ...expenses, [key]: Number(e.target.value) })}
                      className="w-full rounded-md border border-gray-300 p-2"
                      placeholder={`Enter ${label.toLowerCase()}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  <Tag className="w-4 h-4 inline-block mr-1" />
                  Current Investments
                </label>
                <textarea
                  value={currentInvestments.join(",")}
                  onChange={(e) => setCurrentInvestments(e.target.value.split(",").map(item => item.trim()))}
                  className="w-full rounded-md border border-gray-300 p-2 h-32"
                  placeholder="Enter your current investments (comma-separated)&#10;Example: PPF, ELSS Mutual Funds, NPS"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
              >
                Generate Tax-Saving Recommendations
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {suggestions.length > 0 && (
        <Card className="bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-700">Personalized Tax-Saving Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <Card key={index} className="bg-white">
                  <CardContent className="p-4">
                    <p className="text-gray-800">{suggestion}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TaxOptimization;