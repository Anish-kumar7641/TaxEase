import React from "react";
import { useNavigate } from "react-router-dom";
import { Calculator, TrendingUp, PieChart } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";

function Dashboard() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Finance Tracker",
      description: "Track your income, expenses, and investments in real-time. Easily categorize transactions and monitor your financial health with dynamic reporting tools.",
      icon: TrendingUp,
      path: "/financetracker",
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600"
    },
    {
      title: "Tax Calculator",
      description: "Calculate your tax liability instantly based on the latest tax slabs. Get accurate projections of your future tax obligations based on your financial patterns.",
      icon: Calculator,
      path: "/taxcalculator",
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600"
    },
    {
      title: "Tax Optimization",
      description: "Receive AI-powered recommendations for tax-saving investments and strategies. Get personalized tips to maximize your deductions and minimize tax liability.",
      icon: PieChart,
      path: "/taxoptimization",
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tax Management Dashboard</h1>
          <p className="text-gray-600 text-lg">
            Welcome to your personal tax management suite. Simplify your tax planning and optimize your finances with our intelligent tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className={`${feature.color} p-2 rounded-lg`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
                <CardDescription className="text-gray-600 mt-2">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <button
                  onClick={() => navigate(feature.path)}
                  className={`w-full ${feature.color} ${feature.hoverColor} text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2`}
                >
                  <span>Get Started</span>
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;