import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      if (!data.success) {
        toast.error(data.message)
      }
      else {
        login(data.result);
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.result.name);
        toast.success(data.message)
        navigate('/dishlist');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 px-4 py-6">
    <div className="w-full max-w-[24rem] bg-white p-8 rounded-lg shadow-lg border border-gray-300">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Sign Up</h2>

      <div className="text-center mb-4">
        <p className="text-lg text-gray-600 mb-4">Join Foodie's Delight and enjoy:</p>
        <ul className="list-disc list-inside text-gray-600 mx-auto max-w-xs">
          <li className="mb-2 flex items-center">
            <FaLock className="text-blue-600 mr-2" />
            Secure Account
          </li>
          <li className="mb-2 flex items-center">
            <FaEnvelope className="text-green-600 mr-2" />
            Regular Updates
          </li>
          <li className="flex items-center">
            <FaUser className="text-yellow-600 mr-2" />
            Personalized Experience
          </li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="name" className="block text-gray-700 text-sm font-medium">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            required
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="email" className="block text-gray-700 text-sm font-medium">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            required
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="password" className="block text-gray-700 text-sm font-medium">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out">
          Sign Up
        </button>
      </form>
    </div>
  </div>
  );
};

export default Register;
