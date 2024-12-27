import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { TrendingUp, Calculator, PieChart, FileText } from "lucide-react";

function Dashboard() {
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
    },
    {
      title: "Tax Filing",
      description: "File your taxes seamlessly with our intelligent assistant. Auto-fill forms, validate entries, and submit your returns securely with step-by-step guidance.",
      icon: FileText,
      path: "/taxfillingpage",
      color: "bg-orange-500",
      hoverColor: "hover:bg-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tax Management Dashboard</h1>
          <p className="text-gray-600 text-lg">
            Welcome to your comprehensive tax management suite. Simplify your tax planning, calculations, and filing with our intelligent tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className={`${feature.color} p-2 rounded-lg`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
                <p className="text-gray-600 mt-2">
                  {feature.description}
                </p>
              </CardHeader>
              <CardContent>
                <button
                  onClick={() => window.location.href = feature.path}
                  className={`w-full ${feature.color} ${feature.hoverColor} text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2`}
                >
                  <span>Get Started</span>
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <Card className="bg-blue-50">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium text-blue-800">Monthly Savings</h3>
              <p className="text-2xl font-bold text-blue-900">₹45,000</p>
            </CardContent>
          </Card>
          <Card className="bg-green-50">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium text-green-800">Tax Saved</h3>
              <p className="text-2xl font-bold text-green-900">₹12,500</p>
            </CardContent>
          </Card>
          <Card className="bg-purple-50">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium text-purple-800">Investments</h3>
              <p className="text-2xl font-bold text-purple-900">₹1,25,000</p>
            </CardContent>
          </Card>
          <Card className="bg-orange-50">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium text-orange-800">Due Date</h3>
              <p className="text-2xl font-bold text-orange-900">31 Jul 2024</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Tax return filed successfully</span>
                </div>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>New investment added</span>
                </div>
                <span className="text-sm text-gray-500">5 days ago</span>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Tax optimization suggestions updated</span>
                </div>
                <span className="text-sm text-gray-500">1 week ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;