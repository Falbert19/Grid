// src/services/AuthService.js
import axios from 'axios';

const API_URL = 'http://localhost:5050/api/auth'; // adjust if needed

const register = (formData) => {
  return axios.post(`${API_URL}/register`, formData);
};

const login = (formData) => {
  return axios.post(`${API_URL}/login`, formData);
};

const AuthService = { register, login };

export default AuthService;
