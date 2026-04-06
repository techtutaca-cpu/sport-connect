import React, { useState } from 'react';

interface AuthProps {
  mode: 'login' | 'signup';
  onSignupComplete?: (userName: string) => void;
}

export const Auth: React.FC<AuthProps> = ({ mode: initialMode, onSignupComplete }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'signup' && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (!formData.email.trim()) {
      alert('Please enter an email');
      return;
    }
    
    if (!formData.password.trim()) {
      alert('Please enter a password');
      return;
    }
    
    if (mode === 'signup') {
      if (!formData.fullName.trim()) {
        alert('Please enter your name');
        return;
      }
      // Call the signup callback with the user's name
      if (onSignupComplete) {
        onSignupComplete(formData.fullName);
      }
    } else {
      // For login, extract name from email and log them in
      const userName = formData.email.split('@')[0];
      if (onSignupComplete) {
        onSignupComplete(userName);
      }
      setFormData({ fullName: '', email: '', password: '', confirmPassword: '' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full">
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl shadow-2xl p-8 border border-cyan-500 border-opacity-30">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="text-5xl">{mode === 'login' ? '🔐' : '✨'}</span>
            <h2 className="text-3xl font-black text-white mt-4">
              {mode === 'login' ? 'Login' : 'Create Account'}
            </h2>
            <p className="text-gray-400 mt-2">
              {mode === 'login'
                ? 'Welcome back to SportsConnect'
                : 'Join the sports community'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            {mode === 'signup' && (
              <div>
                <label className="block text-cyan-300 font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-cyan-400 border-opacity-50 rounded-lg bg-slate-600 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
                />
              </div>
            )}

            <div>
              <label className="block text-cyan-300 font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-cyan-400 border-opacity-50 rounded-lg bg-slate-600 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
              />
            </div>

            <div>
              <label className="block text-cyan-300 font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-3 border border-cyan-400 border-opacity-50 rounded-lg bg-slate-600 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
              />
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-cyan-300 font-semibold mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-cyan-400 border-opacity-50 rounded-lg bg-slate-600 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition duration-300 transform hover:scale-105 mt-6"
            >
              {mode === 'login' ? '🔐 Login' : '✨ Create Account'}
            </button>
          </form>

          {/* Toggle Mode */}
          <div className="border-t border-slate-600 pt-6">
            <p className="text-gray-400 text-center mb-4">
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
            </p>
            <button
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login');
                setFormData({
                  fullName: '',
                  email: '',
                  password: '',
                  confirmPassword: '',
                });
              }}
              className="w-full border-2 border-cyan-400 border-opacity-50 text-cyan-400 hover:text-cyan-300 hover:border-cyan-300 px-6 py-3 rounded-lg font-bold transition duration-300"
            >
              {mode === 'login' ? '✨ Sign Up Instead' : '🔐 Login Instead'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
