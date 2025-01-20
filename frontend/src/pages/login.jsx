import React, { useState } from "react";
import InputField from "../components/inputField";
import { login } from "../utils/api";
import { Shield, PieChart, Calculator, TrendingUp } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await login({ email, password });
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userid", user.id);
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Left side - Welcome Message */}
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900">
            Simplify Your Tax Management
          </h1>
          <p className="text-lg text-gray-600">
            Your comprehensive solution for tax planning, filing, and financial management.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="p-4 bg-white/80 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-blue-700 mb-2">
                <Calculator className="w-5 h-5" />
                <h3 className="font-semibold">Tax Calculator</h3>
              </div>
              <p className="text-sm text-gray-600">Accurate tax calculations with latest regulations</p>
            </div>
            
            <div className="p-4 bg-white/80 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-blue-700 mb-2">
                <Shield className="w-5 h-5" />
                <h3 className="font-semibold">Secure Filing</h3>
              </div>
              <p className="text-sm text-gray-600">Safe and secure tax filing process</p>
            </div>
            
            <div className="p-4 bg-white/80 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-blue-700 mb-2">
                <PieChart className="w-5 h-5" />
                <h3 className="font-semibold">Investment Tracking</h3>
              </div>
              <p className="text-sm text-gray-600">Monitor your investments and returns</p>
            </div>
            
            <div className="p-4 bg-white/80 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-blue-700 mb-2">
                <TrendingUp className="w-5 h-5" />
                <h3 className="font-semibold">Financial Insights</h3>
              </div>
              <p className="text-sm text-gray-600">Smart insights for better financial decisions</p>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full md:w-1/2 max-w-md">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Welcome Back</h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField 
                label="Email Address" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              
              <InputField 
                label="Password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              <p>Don't have an account? <a href="/register" className="text-blue-600 hover:text-blue-700 font-medium">Create Account</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;