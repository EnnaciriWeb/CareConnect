import React, { useState } from 'react';
import { View } from '../types';

interface LoginProps {
  onLogin: () => void;
  onNavigate: (view: View) => void;
  addNotification: (message: string, type: 'success' | 'error' | 'info') => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onNavigate, addNotification }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic Validation
    if (!email || !password) {
      addNotification("Please enter both email and password.", "error");
      return;
    }

    if (!email.includes('@')) {
      addNotification("Please enter a valid email address.", "error");
      return;
    }

    setIsLoading(true);
    addNotification("Authenticating...", "info");

    // Simulate API call to backend
    setTimeout(() => {
      setIsLoading(false);
      // Simulate successful login
      onLogin();
      addNotification("Login successful! Welcome back.", "success");
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <i className="fas fa-user-circle text-5xl text-primary mb-4"></i>
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Sign in to manage your appointments</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <i className="fas fa-envelope"></i>
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                placeholder="you@example.com"
                
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <i className="fas fa-lock"></i>
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                placeholder="••••••••"
                
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-sky-600 transition shadow-md flex justify-center items-center"
          >
            {isLoading ? <i className="fas fa-spinner fa-spin mr-2"></i> : 'Sign In'}
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <button onClick={() => onNavigate(View.SIGNUP)} className="text-primary font-bold hover:underline">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};