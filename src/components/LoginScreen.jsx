
import React, { useState } from 'react';

const LoginScreen = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock user data
  const mockUsers = [
    { username: 'admin', password: 'admin123', name: 'Administrator' },
    { username: 'user', password: 'user123', name: 'John Doe' },
    { username: 'guest', password: 'guest123', name: 'Guest User' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    setTimeout(() => {
      const user = mockUsers.find(
        u => u.username === credentials.username && u.password === credentials.password
      );

      if (user) {
        // Store user info in localStorage for persistence
        localStorage.setItem('currentUser', JSON.stringify(user));
        onLogin(user);
      } else {
        setError('Invalid username or password');
      }
      setIsLoading(false);
    }, 800);
  };

  const handleDemoLogin = (demoUser) => {
    setCredentials({
      username: demoUser.username,
      password: demoUser.password
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-sm w-full space-y-4">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg mb-3">
            <i className="fas fa-shield-alt text-white text-lg"></i>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-1">Welcome Back</h2>
          <p className="text-sm text-gray-600">Sign in to continue</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="username" className="block text-xs font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={credentials.username}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={credentials.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                placeholder="Enter password"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-2.5 flex items-center space-x-2">
                <i className="fas fa-exclamation-circle text-red-500 text-xs"></i>
                <span className="text-red-700 text-xs">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm"
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin text-xs"></i>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt text-xs"></i>
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="border-t border-gray-200 pt-4">
            <p className="text-xs text-gray-600 mb-2 text-center">Demo Accounts:</p>
            <div className="space-y-1.5">
              {mockUsers.map((user, index) => (
                <button
                  key={index}
                  onClick={() => handleDemoLogin(user)}
                  className="w-full text-left p-2.5 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900 text-xs">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.username} / {user.password}</div>
                    </div>
                    <i className="fas fa-arrow-right text-gray-400 text-xs"></i>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          <p>© 2024 Forest Recovery. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
