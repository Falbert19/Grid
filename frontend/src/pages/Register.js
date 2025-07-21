// frontend/src/pages/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [welcomeMsg, setWelcomeMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setWelcomeMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }

    try {
      // Register user
      await AuthService.register(form);

      // Auto log after registration
      const loginResponse = await AuthService.login({
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("token", loginResponse.data.token);
      setWelcomeMsg(`Welcome!!!, ${form.username}! Redirecting...`);

      // Redirect to home
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {welcomeMsg && <p className="text-green-600 text-sm">{welcomeMsg}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}