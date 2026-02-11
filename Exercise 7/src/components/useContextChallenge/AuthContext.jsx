// Import React and some useful hooks and functions from the 'react' library
import React, { createContext, useState, useEffect } from 'react';

// This is a comment block describing the challenge and requirements for this file
/**
 * Challenge: Create an authentication context for user management
 * 
 * Requirements:
 * 1. Create a context for authentication state
 * 2. Implement login/logout functionality
 * 3. Add user profile and preferences
 * 4. Create a provider component that will wrap the application
 */

// Create a new context object for authentication, which will be used to share data across components
export const AuthContext = createContext();

// Define the AuthProvider component, which will wrap parts of the app that need authentication info
export const AuthProvider = ({ children }) => {
  // Create a state variable to track if the user is authenticated, default is false (not logged in)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Create a state variable to store user information, default is null (no user)
  const [user, setUser] = useState(null);
  // Create a state variable to show if the app is loading authentication info, default is true (loading)
  const [loading, setLoading] = useState(true);
  // Create a state variable to store any error messages, default is null (no error)
  const [error, setError] = useState(null);
  // Create a state variable for the user's theme preference, default is 'light'
  const [theme, setTheme] = useState('light');
  // Create a state variable for notification settings, default is true (notifications on)
  const [notifications, setNotifications] = useState(true);

  // useEffect runs code when the component mounts (loads) or updates
  useEffect(() => {
    // Define an async function to check if the user is already logged in
    const checkAuth = async () => {
      try {
        // Simulate a delay (like an API call) using setTimeout for 1 second
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Try to get stored user data from the browser's localStorage
        const storedUser = localStorage.getItem('user');
        // Try to get stored theme preference from localStorage
        const storedTheme = localStorage.getItem('theme');
        // Try to get stored notification setting from localStorage
        const storedNotifications = localStorage.getItem('notifications');
        
        // If there is a stored user, update the user state and set authenticated to true
        if (storedUser) {
          setUser(JSON.parse(storedUser)); // Parse the user data from JSON
          setIsAuthenticated(true); // Set authentication to true
        }
        
        // If there is a stored theme, update the theme state
        if (storedTheme) {
          setTheme(storedTheme);
        }
        
        // If there is a stored notification setting, update the notifications state
        if (storedNotifications !== null) {
          setNotifications(JSON.parse(storedNotifications)); // Parse the boolean value
        }
      } catch (err) {
        // If there is an error, set the error state with a message
        setError('Failed to authenticate');
        // Also log the error to the console for debugging
        console.error('Auth check error:', err);
      } finally {
        // After everything is done (success or error), set loading to false
        setLoading(false);
      }
    };

    // Call the checkAuth function when the component mounts
    checkAuth();
  }, []); // The empty array means this runs only once when the component mounts

  // Define a function to log in the user, takes email and password as arguments
  const login = async (email, password) => {
    // Set loading to true while logging in
    setLoading(true);
    // Clear any previous error messages
    setError(null);
    
    try {
      // Simulate a delay (like an API call) using setTimeout for 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if the email and password match the demo credentials
      if (email === 'user@example.com' && password === 'password') {
        // If credentials are correct, create a user object with some info
        const userData = {
          id: '1',
          name: 'Demo User',
          email: 'user@example.com',
          avatar: 'https://via.placeholder.com/150',
          role: 'user',
          lastLogin: new Date().toISOString(), // Store the current date/time
        };
        
        // Update the user state with the new user data
        setUser(userData);
        // Set authentication to true
        setIsAuthenticated(true);
        
        // Save the user data to localStorage so it persists after refresh
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Return an object indicating login was successful
        return { success: true };
      } else {
        // If credentials are wrong, throw an error
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      // If there is an error, set the error state with the error message
      setError(err.message || 'Login failed');
      // Return an object indicating login failed, with the error message
      return { success: false, error: err.message };
    } finally {
      // After everything is done (success or error), set loading to false
      setLoading(false);
    }
  };

  // Define a function to log out the user
  const logout = () => {
    // Set authentication to false
    setIsAuthenticated(false);
    // Clear the user state (no user)
    setUser(null);
    // Remove the user data from localStorage
    localStorage.removeItem('user');
  };

  // Define a function to update the user's profile with new data
  const updateProfile = (updatedData) => {
    // Create a new user object by merging the current user and the updated data
    const updatedUser = { ...user, ...updatedData };
    // Update the user state with the new user object
    setUser(updatedUser);
    // Save the updated user data to localStorage
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // Define a function to toggle the theme between 'light' and 'dark'
  const toggleTheme = () => {
    // If the current theme is 'light', change to 'dark', otherwise change to 'light'
    const newTheme = theme === 'light' ? 'dark' : 'light';
    // Update the theme state with the new theme
    setTheme(newTheme);
    // Save the new theme to localStorage
    localStorage.setItem('theme', newTheme);
  };

  
  // Define a function to toggle notifications on or off
  const toggleNotifications = () => {
    // Flip the current notifications value (true becomes false, false becomes true)
    const newNotificationSetting = !notifications;
    // Update the notifications state with the new value
    setNotifications(newNotificationSetting);
    // Save the new notifications setting to localStorage
    localStorage.setItem('notifications', JSON.stringify(newNotificationSetting));
  };

  // Create an object with all the values and functions we want to share in the context
  const contextValue = {
    isAuthenticated,      // Whether the user is logged in
    user,                 // The user object (or null if not logged in)
    loading,              // Whether authentication info is loading
    error,                // Any error messages
    theme,                // The user's theme preference
    notifications,        // Whether notifications are enabled
    login,                // Function to log in
    logout,               // Function to log out
    updateProfile,        // Function to update user profile
    toggleTheme,          // Function to toggle theme
    toggleNotifications,  // Function to toggle notifications
  };

  // This is the return statement of our AuthProvider component
  // We're returning a special React component called "AuthContext.Provider"
return (
  // AuthContext.Provider is a built-in component from React's Context API
  // It allows us to share data (like user info or theme settings) with any nested components
  <AuthContext.Provider value={contextValue}>

    {/* This is where we render any child components inside the provider */}
    {/* These children will now have access to the contextValue via useContext(AuthContext) */}
    {children}

  {/* Closing tag for the AuthContext.Provider */}
  </AuthContext.Provider>
);
}

// Export the AuthProvider component as the default export from this file
// This allows other files to import and use the AuthProvider
export default AuthProvider;