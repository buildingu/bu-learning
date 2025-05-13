// Import React and two hooks: useContext (to use context) and useState (to manage local state)
import React, { useContext, useState } from 'react';
// Import AuthContext (the context object) and AuthProvider (the provider component) from AuthContext file
import { AuthContext, AuthProvider } from './AuthContext';

/**
 * Challenge: Create a component that uses the AuthContext
 * 
 * Requirements:
 * 1. Use the AuthContext to access authentication state and functions
 * 2. Implement login/logout UI
 * 3. Display user profile when logged in
 * 4. Allow changing user preferences (theme, notifications)
 * 5. Add styling to make it visually appealing
 */

// Login Form Component
// This component displays the login form and handles login logic
const LoginForm = () => {
  // Get login function, error message, and loading state from AuthContext
  const { login, error, loading } = useContext(AuthContext);
  // Create state for email input
  const [email, setEmail] = useState('');
  // Create state for password input
  const [password, setPassword] = useState('');
  // Create state to show/hide the login hint
  const [showHint, setShowHint] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)
    await login(email, password); // Call login function from context with email and password
  };

  // Render the login form UI
  return (
    <div style={styles.loginForm}>
      {/* Title for the login form */}
      <h3 style={styles.formTitle}>Login</h3>
      
      {/* If there is an error, show it above the form */}
      {error && <div style={styles.errorMessage}>{error}</div>}
      
      {/* The login form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Email input field */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email" // Input type is email
            value={email} // Value comes from email state
            onChange={(e) => setEmail(e.target.value)} // Update email state on change
            style={styles.input} // Apply styles
            placeholder="Enter your email" // Placeholder text
            required // Make this field required
          />
        </div>
        
        {/* Password input field */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password" // Input type is password
            value={password} // Value comes from password state
            onChange={(e) => setPassword(e.target.value)} // Update password state on change
            style={styles.input} // Apply styles
            placeholder="Enter your password" // Placeholder text
            required // Make this field required
          />
        </div>

        {/* Submit button for the form */}
        <button 
          type="submit" // Button type is submit
          disabled={loading} // Disable button if loading is true
          style={styles.submitButton} // Apply styles
        >
          {/* Show loading text if loading, otherwise show "Login" */}
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      {/* Hint section for test credentials */}
      <div style={styles.hintContainer}>
        {/* Button to show/hide the hint */}
        <button 
          onClick={() => setShowHint(!showHint)} // Toggle showHint state
          style={styles.hintButton} // Apply styles
        >
          {/* Button text changes based on showHint state */}
          {showHint ? 'Hide Hint' : 'Need a Hint?'}
        </button>
        
        {/* If showHint is true, display the hint */}
        {showHint && (
          <div style={styles.hint}>
            <p>Use these credentials:</p>
            <p>Email: user@example.com</p>
            <p>Password: password</p>
          </div>
        )}
      </div>
    </div>
  );
};

// User Profile Component
// This component displays the user's profile and allows editing preferences
const UserProfile = () => {
  // Get user info, logout function, updateProfile function, theme, theme toggle, notifications, and notification toggle from context
  const { user, logout, updateProfile, theme, toggleTheme, notifications, toggleNotifications } = useContext(AuthContext);
  // State to track if the user is editing their name
  const [isEditing, setIsEditing] = useState(false);
  // State for the edited name input
  const [editedName, setEditedName] = useState(user.name);

  // Function to save the edited name
  const handleSaveProfile = () => {
    updateProfile({ name: editedName }); // Call updateProfile with new name
    setIsEditing(false); // Exit editing mode
  };

  // Render the user profile UI
  return (
    <div style={styles.profileContainer}>
      {/* Profile header with avatar and user info */}
      <div style={styles.profileHeader}>
        {/* User avatar */}
        <div style={styles.avatarContainer}>
          <img 
            src={user.avatar} // Avatar image source
            alt={user.name} // Alt text for accessibility
            style={styles.avatar} // Apply styles
          />
        </div>
        
        {/* User information section */}
        <div style={styles.userInfo}>
          {/* If editing, show input and save/cancel buttons; otherwise, show name and edit button */}
          {isEditing ? (
            <div style={styles.editNameContainer}>
              <input
                type="text" // Input type is text
                value={editedName} // Value comes from editedName state
                onChange={(e) => setEditedName(e.target.value)} // Update editedName on change
                style={styles.editNameInput} // Apply styles
              />
              <div style={styles.editButtonGroup}>
                {/* Save button */}
                <button 
                  onClick={handleSaveProfile} // Save changes
                  style={styles.saveButton} // Apply styles
                >
                  Save
                </button>
                {/* Cancel button */}
                <button 
                  onClick={() => {
                    setIsEditing(false); // Exit editing mode
                    setEditedName(user.name); // Reset editedName to original
                  }} 
                  style={styles.cancelButton} // Apply styles
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            // Display user name and edit button
            <h3 style={styles.userName}>
              {user.name}
              <button 
                onClick={() => setIsEditing(true)} // Enter editing mode
                style={styles.editButton} // Apply styles
              >
                Edit
              </button>
            </h3>
          )}
          {/* Display user email */}
          <p style={styles.userEmail}>{user.email}</p>
          {/* Display user role */}
          <p style={styles.userRole}>Role: {user.role}</p>
          {/* Display last login time, formatted as a readable string */}
          <p style={styles.lastLogin}>Last login: {new Date(user.lastLogin).toLocaleString()}</p>
        </div>
      </div>
      
      {/* Preferences section for theme and notifications */}
      <div style={styles.preferencesSection}>
        <h4 style={styles.preferencesTitle}>User Preferences</h4>
        
        {/* Theme toggle */}
        <div style={styles.preferenceItem}>
          <span style={styles.preferenceLabel}>Theme:</span>
          <div style={styles.themeToggle}>
            <button 
              onClick={toggleTheme} // Toggle between light and dark theme
              style={{
                ...styles.themeButton, // Spread base styles
                backgroundColor: theme === 'light' ? '#f8f9fa' : '#343a40', // Change background based on theme
                color: theme === 'light' ? '#343a40' : '#f8f9fa', // Change text color based on theme
              }}
            >
              {/* Show sun or moon icon based on theme */}
              {theme === 'light' ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </div>
        
        {/* Notifications toggle */}
        <div style={styles.preferenceItem}>
          <span style={styles.preferenceLabel}>Notifications:</span>
          <label style={styles.switch}>
            <input 
              type="checkbox" // Checkbox input
              checked={notifications} // Checked state from context
              onChange={toggleNotifications} // Toggle notifications on change
            />
            <span style={styles.slider}></span>
          </label>
        </div>
      </div>
      
      {/* Logout button */}
      <button 
        onClick={logout} // Call logout function from context
        style={styles.logoutButton} // Apply styles
      >
        Logout
      </button>
    </div>
  );
};

// Loading Spinner Component
// This component displays a loading spinner and message
const LoadingSpinner = () => {
  // Render spinner and loading text
  return (
    <div style={styles.loadingContainer}>
      <div style={styles.spinner}></div>
      <p style={styles.loadingText}>Loading...</p>
    </div>
  );
};

// Main Component
// This is the main component that wraps everything in the AuthProvider
const UseContextChallenge = () => {
  // Render the AuthProvider and the main UI
  return (
    <AuthProvider>
      <div style={styles.container}>
        {/* Title for the challenge */}
        <h2 style={styles.title}>useContext Authentication Challenge</h2>
        {/* Render the AuthConsumer component, which shows login or profile */}
        <AuthConsumer />
      </div>
    </AuthProvider>
  );
};

// Consumer Component
// This component decides whether to show the login form or user profile
const AuthConsumer = () => {
  // Get authentication state, loading state, and theme from context
  const { isAuthenticated, loading, theme } = useContext(AuthContext);
  
  // Apply theme styles to the container
  const containerStyle = {
    ...styles.authContainer, // Spread base styles
    backgroundColor: theme === 'light' ? '#ffffff' : '#343a40', // Set background based on theme
    color: theme === 'light' ? '#343a40' : '#ffffff', // Set text color based on theme
  };

  // If loading, show the loading spinner
  if (loading) {
    return <LoadingSpinner />;
  }

  // If authenticated, show user profile; otherwise, show login form
  return (
    <div style={containerStyle}>
      {isAuthenticated ? <UserProfile /> : <LoginForm />}
    </div>
  );
};

// Styles object for inline styling throughout the components
const styles = {
  container: {
    maxWidth: '800px', // Maximum width of the container
    margin: '0 auto', // Center the container horizontally
    padding: '20px', // Padding inside the container
    backgroundColor: '#f8f9fa', // Light background color
    borderRadius: '10px', // Rounded corners
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
    fontFamily: 'Arial, sans-serif', // Font family
  },
  title: {
    textAlign: 'center', // Center the title
    color: '#343a40', // Dark text color
    marginBottom: '30px', // Space below the title
    fontSize: '28px', // Large font size
  },
  authContainer: {
    padding: '25px', // Padding inside the auth container
    borderRadius: '8px', // Rounded corners
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow
    transition: 'all 0.3s ease', // Smooth transition for style changes
  },
  loadingContainer: {
    display: 'flex', // Use flexbox
    flexDirection: 'column', // Stack children vertically
    alignItems: 'center', // Center children horizontally
    justifyContent: 'center', // Center children vertically
    padding: '40px', // Padding inside the container
  },
  spinner: {
    width: '50px', // Spinner width
    height: '50px', // Spinner height
    border: '5px solid #f3f3f3', // Light gray border
    borderTop: '5px solid #007bff', // Blue top border for spinning effect
    borderRadius: '50%', // Make it circular
    animation: 'spin 1s linear infinite', // Spin animation (requires CSS keyframes)
  },
  loadingText: {
    marginTop: '15px', // Space above the text
    color: '#6c757d', // Gray text color
    fontSize: '16px', // Medium font size
  },
  loginForm: {
    maxWidth: '400px', // Maximum width of the form
    margin: '0 auto', // Center the form horizontally
  },
  formTitle: {
    textAlign: 'center', // Center the form title
    marginBottom: '20px', // Space below the title
  },
  form: {
    display: 'flex', // Use flexbox
    flexDirection: 'column', // Stack form fields vertically
  },
  formGroup: {
    marginBottom: '15px', // Space below each form group
  },
  label: {
    marginBottom: '5px', // Space below the label
    display: 'block', // Make label a block element
    fontSize: '14px', // Small font size
  },
  input: {
    width: '100%', // Input takes full width
    padding: '10px', // Padding inside the input
    fontSize: '16px', // Medium font size
    borderRadius: '5px', // Rounded corners
    border: '1px solid #ced4da', // Light gray border
    backgroundColor: 'transparent', // Transparent background
  },
  submitButton: {
    padding: '12px', // Padding inside the button
    backgroundColor: '#007bff', // Blue background
    color: '#ffffff', // White text
    border: 'none', // No border
    borderRadius: '5px', // Rounded corners
    fontSize: '16px', // Medium font size
    cursor: 'pointer', // Pointer cursor on hover
    marginTop: '10px', // Space above the button
  },
  errorMessage: {
    color: '#dc3545', // Red text color
    padding: '10px', // Padding inside the error message
    borderRadius: '5px', // Rounded corners
    backgroundColor: '#f8d7da', // Light red background
    marginBottom: '15px', // Space below the error message
    textAlign: 'center', // Center the text
  },
  hintContainer: {
    marginTop: '20px', // Space above the hint container
    textAlign: 'center', // Center the content
  },
  hintButton: {
    backgroundColor: 'transparent', // No background
    border: 'none', // No border
    color: '#007bff', // Blue text
    cursor: 'pointer', // Pointer cursor on hover
    fontSize: '14px', // Small font size
    textDecoration: 'underline', // Underline the text
  },
  hint: {
    marginTop: '10px', // Space above the hint
    padding: '10px', // Padding inside the hint
    backgroundColor: '#e9ecef', // Light gray background
    borderRadius: '5px', // Rounded corners
    fontSize: '14px', // Small font size
  },
  profileContainer: {
    display: 'flex', // Use flexbox
    flexDirection: 'column', // Stack children vertically
    gap: '20px', // Space between children
  },
  profileHeader: {
    display: 'flex', // Use flexbox
    alignItems: 'center', // Center items vertically
    gap: '20px', // Space between avatar and info
  },
  avatarContainer: {
    width: '100px', // Avatar container width
    height: '100px', // Avatar container height
    borderRadius: '50%', // Make it circular
    overflow: 'hidden', // Hide overflow
    border: '3px solid #007bff', // Blue border
  },
  avatar: {
    width: '100%', // Avatar image takes full width
    height: '100%', // Avatar image takes full height
    objectFit: 'cover', // Cover the container
  },
  userInfo: {
    flex: '1', // Take up remaining space
  },
  userName: {
    fontSize: '24px', // Large font size
    fontWeight: 'bold', // Bold text
    margin: '0 0 5px 0', // Margin below the name
    display: 'flex', // Use flexbox
    alignItems: 'center', // Center items vertically
    gap: '10px', // Space between name and edit button
  },
  userEmail: {
    fontSize: '16px', // Medium font size
    color: '#6c757d', // Gray text color
    margin: '0 0 5px 0', // Margin below the email
  },
  userRole: {
    fontSize: '14px', // Small font size
    margin: '0 0 5px 0', // Margin below the role
  },
  lastLogin: {
    fontSize: '12px', // Small font size
    fontStyle: 'italic', // Italic text
    margin: '0', // No margin
  },
  editButton: {
    padding: '3px 8px', // Padding inside the button
    fontSize: '12px', // Small font size
    backgroundColor: '#6c757d', // Gray background
    color: '#ffffff', // White text
    border: 'none', // No border
    borderRadius: '3px', // Rounded corners
    cursor: 'pointer', // Pointer cursor on hover
    marginLeft: '10px', // Space to the left of the button
  },
  editNameContainer: {
    marginBottom: '10px', // Space below the edit container
  },
  editNameInput: {
    width: '100%', // Input takes full width
    padding: '8px', // Padding inside the input
    fontSize: '16px', // Medium font size
    borderRadius: '5px', // Rounded corners
    border: '1px solid #ced4da', // Light gray border
    marginBottom: '10px', // Space below the input
    backgroundColor: 'transparent', // Transparent background
  },
  editButtonGroup: {
    display: 'flex', // Use flexbox
    gap: '10px', // Space between buttons
  },
  saveButton: {
    padding: '5px 10px', // Padding inside the button
    backgroundColor: '#28a745', // Green background
    color: '#ffffff', // White text
    border: 'none', // No border
    borderRadius: '5px', // Rounded corners
    cursor: 'pointer', // Pointer cursor on hover
  },
  cancelButton: {
    padding: '5px 10px', // Padding inside the button
    backgroundColor: '#dc3545', // Red background
    color: '#ffffff', // White text
    border: 'none', // No border
    borderRadius: '5px', // Rounded corners
    cursor: 'pointer', // Pointer cursor on hover
  },
  preferencesSection: {
    marginTop: '20px', // Space above the section
    padding: '15px', // Padding inside the section
    borderRadius: '5px', // Rounded corners
    backgroundColor: 'rgba(0, 0, 0, 0.05)', // Light transparent background
  },
  preferencesTitle: {
    margin: '0 0 15px 0', // Margin below the title
    fontSize: '18px', // Medium font size
  },
  preferenceItem: {
    display: 'flex', // Use flexbox
    justifyContent: 'space-between', // Space between label and control
    alignItems: 'center', // Center items vertically
    marginBottom: '10px', // Space below the item
  },
  preferenceLabel: {
    fontSize: '16px', // Medium font size
  },
  themeToggle: {
    display: 'flex', // Use flexbox
    alignItems: 'center', // Center items vertically
  },
  themeButton: {
    padding: '8px 12px', // Padding inside the button
    borderRadius: '20px', // Pill-shaped button
    border: '1px solid #ced4da', // Light gray border
    cursor: 'pointer', // Pointer cursor on hover
    transition: 'all 0.3s ease', // Smooth transition for style changes
  },
  switch: {
    position: 'relative', // Position relative for slider
    display: 'inline-block', // Inline-block element
    width: '60px', // Width of the switch
    height: '34px', // Height of the switch
  },
  slider: {
    position: 'absolute', // Position absolute for slider
    cursor: 'pointer', // Pointer cursor on hover
    top: '0', // Top position
    left: '0', // Left position
    right: '0', // Right position
    bottom: '0', // Bottom position
    backgroundColor: '#ccc', // Gray background
    borderRadius: '34px', // Rounded slider
    transition: '0.4s', // Smooth transition
    '&:before': {
      position: 'absolute', // Position absolute for the knob
      content: '""', // Empty content for the knob
      height: '26px', // Height of the knob
      width: '26px', // Width of the knob
      left: '4px', // Left position
      bottom: '4px', // Bottom position
      backgroundColor: 'white', // White knob
      borderRadius: '50%', // Circular knob
      transition: '0.4s', // Smooth transition
    },
  },
  logoutButton: {
    padding: '12px', // Padding inside the button
    backgroundColor: '#dc3545', // Red background
    color: '#ffffff', // White text
    border: 'none', // No border
    borderRadius: '5px', // Rounded corners
    fontSize: '16px', // Medium font size
    cursor: 'pointer', // Pointer cursor on hover
    marginTop: '10px', // Space above the button
    width: '100%', // Button takes full width
  },
};

// Export the main component as the default export
export default UseContextChallenge;