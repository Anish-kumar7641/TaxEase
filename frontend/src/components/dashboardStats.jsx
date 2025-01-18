import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Calculator } from 'lucide-react';

const TaxFinanceDashboard = ({ userData, financeData, taxData }) => {
  // Calculate monthly savings (sum of all investment type transactions in current month)
  const monthlySavings = useMemo(() => {
    const currentMonth = new Date().getMonth();
    return financeData
      ?.filter(transaction => 
        transaction.type === 'Investment' && 
        new Date(transaction.date).getMonth() === currentMonth
      )
      .reduce((sum, transaction) => sum + transaction.amount, 0) || 0;
  }, [financeData]);

  // Calculate total tax saved based on deductions
  const taxSaved = useMemo(() => {
    const totalDeductions = 
      (taxData?.deductions?.section80C || 0) +
      (taxData?.deductions?.section80D || 0) +
      (taxData?.deductions?.homeLoanInterest || 0) +
      (taxData?.deductions?.educationLoanInterest || 0) +
      (taxData?.deductions?.otherDeductions || 0);
    // Assuming 30% tax bracket for simplification
    return totalDeductions * 0.3;
  }, [taxData]);

  // Calculate total investments
  const totalInvestments = useMemo(() => {
    return financeData
      ?.filter(transaction => transaction.type === 'Investment')
      .reduce((sum, transaction) => sum + transaction.amount, 0) || 0;
  }, [financeData]);

  // Generate recent activity
  const recentActivity = useMemo(() => {
    const activities = [];
    
    // Add tax status changes
    if (taxData) {
      activities.push({
        type: 'success',
        message: 'Tax return filed successfully',
        date: taxData.date,
      });
    }

    // Add recent investments
    const recentInvestments = financeData
      ?.filter(transaction => transaction.type === 'Investment')
      .slice(0, 3)
      .map(transaction => ({
        type: 'info',
        message: `Investment of ₹${transaction.amount.toLocaleString()} in ${transaction.category}`,
        date: transaction.date,
      })) || [];
    
    activities.push(...recentInvestments);

    // Sort by date
    return activities.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [financeData, taxData]);

  // Calculate due date (July 31st of next year if after July 31st of current year)
  const dueDate = useMemo(() => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const julyDeadline = new Date(currentYear, 6, 31); // July 31st
    
    return today > julyDeadline 
      ? new Date(currentYear + 1, 6, 31)
      : julyDeadline;
  }, []);

  const getActivityColor = (type) => {
    switch (type) {
      case 'success': return 'bg-green-500';
      case 'info': return 'bg-blue-500';
      default: return 'bg-purple-500';
    }
  };

  return (
    <div className="space-y-8">
      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-blue-800">Monthly Savings</h3>
            <p className="text-2xl font-bold text-blue-900">
              ₹{monthlySavings.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-green-50">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-green-800">Tax Saved</h3>
            <p className="text-2xl font-bold text-green-900">
              ₹{taxSaved.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-purple-50">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-purple-800">Investments</h3>
            <p className="text-2xl font-bold text-purple-900">
              ₹{totalInvestments.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-orange-50">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-orange-800">Due Date</h3>
            <p className="text-2xl font-bold text-orange-900">
              {dueDate.toLocaleDateString('en-IN', { 
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              })}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${getActivityColor(activity.type)}`}></div>
                  <span>{activity.message}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(activity.date).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short'
                  })}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxFinanceDashboard;