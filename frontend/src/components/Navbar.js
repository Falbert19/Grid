// frontend/src/components/Navbar.js
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Only show login/register nav on auth pages
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <nav className="p-4 bg-white shadow flex gap-4 justify-between">
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        {isLoggedIn && (
          <>
            <Link to="/cart">Cart</Link>
            <Link to="/saved">Saved</Link>
            <Link to="/profile">Profile</Link>
          </>
        )}
      </div>
      <div className="flex gap-4">
        {!isLoggedIn && isAuthPage && (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
        {isLoggedIn && (
          <button onClick={handleLogout} className="text-red-500">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
