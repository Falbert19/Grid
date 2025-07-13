import React, { useState } from 'react';
import axios from 'axios';

export default function AuthPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({ email: '', username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleToggle = () => {
    setIsRegistering(!isRegistering);
    setMessage('');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegistering ? '/api/auth/register' : '/api/auth/login';

    try {
      const res = await axios.post(endpoint, formData);
      setMessage(`${isRegistering ? 'Registered' : 'Logged in'} successfully!`);
      console.log(res.data);
    } catch (err) {
      setMessage(`${err.response?.data?.error || 'An error occurred'}`);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isRegistering ? 'Create Account' : 'Welcome Back'}
        </h2>

        {message && <p className="mb-4 text-sm text-center text-red-500">{message}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />

        {isRegistering && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition"
        >
          {isRegistering ? 'Register' : 'Login'}
        </button>

        <p className="text-sm mt-4 text-center">
          {isRegistering ? 'Already have an account?' : 'New here?'}{' '}
          <button type="button" onClick={handleToggle} className="text-blue-600 underline">
            {isRegistering ? 'Login' : 'Register'}
          </button>
        </p>
      </form>
    </div>
  );
}
