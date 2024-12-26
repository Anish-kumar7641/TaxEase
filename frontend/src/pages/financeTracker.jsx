import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { DollarSign, Trash2 } from 'lucide-react';
import IncomeExpenseForm from '../components/incomeExpenseForm';
import { getEntries, deleteEntry } from '../utils/api';

const FinanceTracker = () => {
  const [entries, setEntries] = useState([]);

  const fetchEntries = async () => {
    try {
      const response = await getEntries();
      setEntries(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchEntries();
  }, []);

  const handleAddEntry = (newEntry) => {
    setEntries((prev) => [newEntry, ...prev]);
  };


const handleDeleteEntry = async (id, index) => {
    try {
        const response = await deleteEntry(id);
        console.log(response.data.message); 
        setEntries((prevEntries) => prevEntries.filter((_, i) => i !== index));
    } catch (error) {
        console.error(error.response?.data?.error || "Failed to delete entry");
    }
};


  const totals = entries.reduce((acc, entry) => {
    const amount = parseFloat(entry.amount);
    if (entry.type === 'Income') acc.income += amount;
    if (entry.type === 'Expense') acc.expenses += amount;
    if (entry.type === 'Investment') acc.investments += amount;
    return acc;
  }, { income: 0, expenses: 0, investments: 0 });

  const chartData = entries.map(entry => ({
    name: entry.category,
    amount: parseFloat(entry.amount),
    type: entry.type
  }));

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-700">Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">${totals.income.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card className="bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-700">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">${totals.expenses.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-700">Total Investments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">${totals.investments.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-64">
              <LineChart width={500} height={250} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="amount" stroke="#8884d8" />
              </LineChart>
            </div>
          </CardContent>
        </Card>

        <IncomeExpenseForm onAdd={handleAddEntry} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Type</th>
                  <th className="p-2 text-left">Category</th>
                  <th className="p-2 text-left">Amount</th>
                  <th className="p-2 text-left">Description</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-2">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs
                        ${entry.type === 'Income' ? 'bg-green-100 text-green-800' :
                          entry.type === 'Expense' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'}`}>
                        {entry.type}
                      </span>
                    </td>
                    <td className="p-2">{entry.category}</td>
                    <td className="p-2">${parseFloat(entry.amount).toFixed(2)}</td>
                    <td className="p-2">{entry.description}</td>
                    <td className="p-2">
                      <button
                        onClick={() => handleDeleteEntry(entry._id, index)} // Pass both id and index
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceTracker;