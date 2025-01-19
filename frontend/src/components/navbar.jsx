import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Replacing useHistory with useNavigate

  useEffect(() => {
    // Check if the user is logged in by looking for a token in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // User is logged in
    }
  }, []);

  const handleLogout = () => {
    // Remove the token from localStorage to log out the user
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    setIsLoggedIn(false); // Update login state
    navigate("/"); // Redirect to login page using useNavigate
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-white text-xl font-bold">
          TaxEase
        </Link>
        <div>
          {isLoggedIn ? (
            // Show Logout button when the user is logged in
            <button
              onClick={handleLogout}
              className="text-white px-4"
            >
              Logout
            </button>
          ) : (
            // Show Login and Register buttons when the user is not logged in
            <>
              <Link to="/" className="text-white px-4">
                Login
              </Link>
              <Link to="/register" className="text-white px-4">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
