import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import FinanceTracker from './pages/financeTracker';
import TaxCalculator from "./components/taxCalculator";
import TaxOptimization from "./components/taxOptimization";
import TaxFilingPage from "./pages/taxFillinPage";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/financetracker" element={<FinanceTracker />} />
            <Route path="/taxcalculator" element={<TaxCalculator />} />
            <Route path="/taxoptimization" element={<TaxOptimization />} />
            <Route path="/taxfillingpage" element={<TaxFilingPage />} /> 
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
