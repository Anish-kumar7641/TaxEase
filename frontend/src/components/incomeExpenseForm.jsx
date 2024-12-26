import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { DollarSign, Tag, FileText } from 'lucide-react';
import { addEntry } from '../utils/api';

const categories = {
  Income: ['Salary', 'Freelance', 'Investment Returns', 'Bonus', 'Other Income'],
  Expense: ['Housing', 'Transportation', 'Food', 'Healthcare', 'Entertainment', 'Other Expense'],
  Investment: ['Stocks', 'Bonds', 'Real Estate', 'Mutual Funds', 'Other Investment']
};

const IncomeExpenseForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    type: 'Income',
    category: '',
    amount: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'type' ? { category: '' } : {})
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addEntry(formData);
      onAdd(response.data.entry);
      setFormData({ type: 'Income', category: '', amount: '', description: '' });
    } catch (err) {
      console.error("ADD ENTRY ERROR", err);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Add Financial Entry
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Type
              <select 
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              >
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
                <option value="Investment">Investment</option>
              </select>
            </label>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Category
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              >
                <option value="">Select a category</option>
                {categories[formData.type].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Amount
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="block w-full pl-7 rounded-md border border-gray-300 p-2"
                  placeholder="0.00"
                />
              </div>
            </label>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Description
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                rows="3"
                placeholder="Add details about this entry..."
              />
            </label>
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors duration-200"
          >
            Add Entry
          </button>
        </form>
      </CardContent>
    </Card>
  );
};

export default IncomeExpenseForm;