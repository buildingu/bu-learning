import React, { createContext, useState, useEffect } from 'react';

/**
 * Challenge: Create an authentication context for user management
 * 
 * Requirements:
 * 1. Create a context for authentication state
 * 2. Implement login/logout functionality
 * 3. Add user profile and preferences
 * 4. Create a provider component that will wrap the application
 */

// Create the Authentication Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);

  // Simulate checking for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Simulate API call to check authentication status
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if there's a stored user in localStorage
        const storedUser = localStorage.getItem('user');
        const storedTheme = localStorage.getItem('theme');
        const storedNotifications = localStorage.getItem('notifications');
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
        
        if (storedTheme) {
          setTheme(storedTheme);
        }
        
        if (storedNotifications !== null) {
          setNotifications(JSON.parse(storedNotifications));
        }
      } catch (err) {
        setError('Failed to authenticate');
        console.error('Auth check error:', err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call for login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validate credentials (simple validation for demo)
      if (email === 'user@example.com' && password === 'password') {
        const userData = {
          id: '1',
          name: 'Demo User',
          email: 'user@example.com',
          avatar: 'https://via.placeholder.com/150',
          role: 'user',
          lastLogin: new Date().toISOString(),
        };
        
        setUser(userData);
        setIsAuthenticated(true);
        
        // Store user in localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        
        return { success: true };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('user');
  };

  // Update user profile
  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Toggle notifications
  const toggleNotifications = () => {
    const newNotificationSetting = !notifications;
    setNotifications(newNotificationSetting);
    localStorage.setItem('notifications', JSON.stringify(newNotificationSetting));
  };

  // Context value
  const contextValue = {
    isAuthenticated,
    user,
    loading,
    error,
    theme,
    notifications,
    login,
    logout,
    updateProfile,
    toggleTheme,
    toggleNotifications,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;    