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

  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <nav className="bg-zinc-900 text-white px-4 py-3 flex justify-between items-center shadow-md">
      {/* Logo/Title */}
      <div className="text-xl font-bold tracking-wide">
        <Link to="/" className="hover:text-gray-300">Grid</Link>
      </div>

      {/* Main Navigation */}
      <div className="flex gap-6 items-center">
        {isLoggedIn ? (
          <>
            <Link to="/cart" className="hover:text-gray-300">Cart</Link>
            <Link to="/saved" className="hover:text-gray-300">Saved</Link>
            <Link to="/profile" className="hover:text-gray-300">Profile</Link>
            <button onClick={handleLogout} className="text-red-500 hover:text-red-400">Logout</button>
          </>
        ) : (
          isAuthPage && (
            <>
              <Link to="/register" className="hover:text-gray-300">Register</Link>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
            </>
          )
        )}
      </div>
    </nav>
  );
}
