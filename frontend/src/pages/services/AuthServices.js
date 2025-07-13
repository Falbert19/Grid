//src/pages/Register.js
import React, { useState } from "react";
import AuthService from "../services/AuthService";

export default function Register() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await AuthService.register(formData);
      setMessage("✅ Registered successfully");
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.error || "Something went wrong"));
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full border p-2"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2"
          onChange={handleChange}
        />
        <button type="submit" className="w-full bg-black text-white py-2">Register</button>
      </form>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
}


// frontend/src/pages/Login.js
import React, { useState } from "react";
import AuthService from "../services/AuthService";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await AuthService.login(formData);
      setMessage("✅ Login successful");
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.error || "Invalid credentials"));
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2"
          onChange={handleChange}
        />
        <button type="submit" className="w-full bg-black text-white py-2">Login</button>
      </form>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
}


// frontend/src/services/AuthService.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5050/api/auth";

const register = async (data) => {
  return axios.post(`${API_URL}/register`, data);
};

const login = async (data) => {
  return axios.post(`${API_URL}/login`, data);
};

export default {
  register,
  login,
};