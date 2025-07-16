import React from 'react';
import { useState } from "react";
import Header from '../components/Header'; 
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.endlessrealty.in';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Define admin users with proper names
      const adminUsers = [
        { email: 'admin@gmail.com', name: 'Admin User' },
        { email: 'manager@endlessrealty.com', name: 'Manager' },
        { email: 'rohit@endlessrealty.com', name: 'Rohit Singhal' },
        { email: 'amisha@endlessrealty.com', name: 'Amisha' }
      ];

      // For now, simulate authentication with localStorage until backend is integrated
      if (email && password) {
        // Check if user is admin and use proper name
        const adminUser = adminUsers.find(admin => admin.email === email);
        
        // Check for admin credentials
        if (adminUser && password === 'admin123') {
          const userData = {
            name: adminUser.name,
            email: adminUser.email,
            phone: ''
          };
          
          // Store login state
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userData', JSON.stringify(userData));
          
          // Redirect admin users to homepage first (they can access admin panel from there)
          navigate('/');
          return;
        }
        
        // For regular users
        const userData = {
          name: email.split('@')[0], // Extract name from email for regular users
          email: email,
          phone: '' // Placeholder for phone
        };
        
        // Store login state
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Redirect to homepage for regular users
        navigate('/');
        return;
      }

      // When backend is integrated, use this code:
      /*
      const res = await fetch(`${API_BASE_URL}/api/users/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      // Save JWT token (optional, for protected routes)
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userData', JSON.stringify(data.user));

      // Redirect to homepage or dashboard
      navigate('/');
      */
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      
      <Header />

      {/* Sign-In Form */}
      <main className="container mx-auto px-6 py-12 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign In</h2>
          
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Sign In
            </button>
          </form>

          {/* Additional Links */}
          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{' '}
            <Link to ="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default SignIn;