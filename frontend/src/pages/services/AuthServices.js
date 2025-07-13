//src/services/AuthService.js
import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5050/api/auth";

const register = (data) => axios.post(`${API_URL}/register`, data);
const login = (data) => axios.post(`${API_URL}/login`, data);

export default { register, login };
