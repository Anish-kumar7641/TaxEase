import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { TrendingUp, Calculator, PieChart, FileText } from "lucide-react";
import { dashData } from "../utils/api";
import TaxFinanceDashboard from "../components/dashboardStats";

const Dashboard = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    // Simulate loading state
    setTimeout(() => setIsLoading(false), 1000);
  }, []);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await dashData();
        if (response.data.success) {
          setDashboardData(response.data.data);
        } else {
          throw new Error('Failed to fetch dashboard data');
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err.message || 'Error fetching dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    // Optional: Set up polling for real-time updates
    const intervalId = setInterval(fetchDashboardData, 5 * 60 * 1000); // Refresh every 5 minutes

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">
      Error: {error}
    </div>;
  }

 

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto p-6">
        <div className="mb-8 opacity-0 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Tax Management Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Welcome to your comprehensive tax management suite. Simplify your tax planning, calculations, and filing with our intelligent tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className={`transform transition-all duration-300 hover:scale-105 
                ${isLoading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
                ${activeCard === index ? 'ring-2 ring-offset-2 ' + feature.color : ''}
                hover:shadow-xl
              `}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`${feature.color} p-3 rounded-lg transform transition-transform duration-300 hover:rotate-12`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                </div>
                <p className="text-gray-600 mt-3 leading-relaxed">
                  {feature.description}
                </p>
              </CardHeader>
              <CardContent>
                <button
                  onClick={() => window.location.href = feature.path}
                  className={`w-full ${feature.color} ${feature.hoverColor} text-white px-4 py-3 rounded-lg 
                    transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg 
                    flex items-center justify-center space-x-2 font-medium`}
                >
                  <span>Get Started</span>
                  <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
      <div className="container mx-auto px-4 py-8">
      <TaxFinanceDashboard 
        userData={dashboardData?.userData}
        financeData={dashboardData?.financeData}
        taxData={dashboardData?.taxData}
      />
    </div>
    </div>
    
  );
};

export default Dashboard;