// src/services/AuthService.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5050";

if (!process.env.REACT_APP_API_URL) {
  console.warn("⚠️ REACT_APP_API_URL is not set — defaulting to http://localhost:5050");
}

const AuthService = {
  login: (credentials) => axios.post(`${API_URL}/api/auth/login`, credentials),
  register: (userData) => axios.post(`${API_URL}/api/auth/register`, userData),
};

export default AuthService;
