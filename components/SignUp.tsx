import React, { useState } from 'react';
import { View } from '../types';

interface SignUpProps {
  onNavigate: (view: View) => void;
  addNotification: (message: string, type: 'success' | 'error' | 'info') => void;
}

export const SignUp: React.FC<SignUpProps> = ({ onNavigate, addNotification }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'patient'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
        addNotification("Please fill in all required fields.", "error");
        return;
    }
    if (formData.password.length < 6) {
        addNotification("Password must be at least 6 characters long.", "error");
        return;
    }
    
    setIsLoading(true);
    addNotification("Creating your account...", "info");
    
    // Simulate backend registration call
    console.log("Registering user:", formData);
    
    setTimeout(() => {
        setIsLoading(false);
        addNotification("Account created successfully! Please login.", "success");
        onNavigate(View.LOGIN);
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Create Account</h2>
        <p className="text-center text-gray-500 mb-8">Join CareConnect today</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
             <input
               type="tel"
               name="phone"
               value={formData.phone}
               onChange={handleChange}
               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
               placeholder="+1 (555) 000-0000"
             />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
              placeholder="••••••••"
            />
            <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">I am a</label>
            <select 
              name="role" 
              value={formData.role} 
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none bg-white"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-sky-600 transition shadow-md mt-4 flex justify-center items-center"
          >
             {isLoading ? <i className="fas fa-spinner fa-spin mr-2"></i> : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button onClick={() => onNavigate(View.LOGIN)} className="text-primary font-bold hover:underline">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};