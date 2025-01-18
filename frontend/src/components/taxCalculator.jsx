import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Calculator, TrendingUp, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { calculateTax, getProjections } from "../utils/api";

const TaxCalculator = () => {
  const navigate = useNavigate();
  const [income, setIncome] = useState('');
  const [deductions, setDeductions] = useState('');
  const [growthRate, setGrowthRate] = useState('');
  const [results, setResults] = useState(null);
  const [projections, setProjections] = useState([]);

  const handleCalculateTax = async () => {
    try {
      const { data } = await calculateTax({ income, deductions });
      setResults(data);
    } catch (error) {
      console.error("Error calculating tax", error);
    }
  };

  const handleGetProjections = async () => {
    try {
      const { data } = await getProjections({ currentIncome: income, growthRate });
      setProjections(data.projections);
    } catch (error) {
      console.error("Error getting projections", error);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <button
              onClick={() => navigate('/')}
              className="mb-6 flex items-center gap-2 hover:bg-gray-100 p-0 rounded-full transition-colors duration-200"
              aria-label="Go back to dashboard"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Current Tax Calculation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-4">
                Enter your annual income and deductions to calculate your current tax liability based on the latest tax slabs.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Annual Income ($)</label>
                  <input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className="w-full rounded-md border border-gray-300 p-2"
                    placeholder="Enter your annual income"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Total Deductions ($)</label>
                  <input
                    type="number"
                    value={deductions}
                    onChange={(e) => setDeductions(Number(e.target.value))}
                    className="w-full rounded-md border border-gray-300 p-2"
                    placeholder="Enter total deductions"
                  />
                </div>

                <button
                  onClick={handleCalculateTax}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Calculate Current Tax
                </button>
              </div>
            </div>

            {results && (
              <Card className="bg-gray-50">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Taxable Income</p>
                      <p className="text-xl font-bold">${results.taxableIncome.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Tax Amount</p>
                      <p className="text-xl font-bold">${results.tax.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Future Tax Projections
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Estimate your future income and tax liability based on expected annual growth rate.
            </p>
            <div>
              <label className="block text-sm font-medium mb-1">Expected Annual Growth Rate (%)</label>
              <input
                type="number"
                value={growthRate}
                onChange={(e) => setGrowthRate(Number(e.target.value))}
                className="w-full rounded-md border border-gray-300 p-2"
                placeholder="Enter expected growth rate"
              />
              <button
                onClick={handleGetProjections}
                className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
              >
                Calculate 5-Year Projection
              </button>
            </div>

            {projections.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">5-Year Income Projection</h3>
                <div className="h-64">
                  <LineChart width={400} height={250} data={projections}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="income" stroke="#10B981" name="Projected Income" />
                  </LineChart>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaxCalculator;