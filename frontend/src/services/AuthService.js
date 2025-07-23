// frontend/src/services/AuthService.js
import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/api/auth`;

const register = (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

const login = (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

const AuthService = {
  register,
  login,
};

export default AuthService;