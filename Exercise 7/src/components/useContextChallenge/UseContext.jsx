import React, { useContext, useState } from 'react';
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
const LoginForm = () => {
  const { login, error, loading } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div style={styles.loginForm}>
      <h3 style={styles.formTitle}>Login</h3>
      
      {error && <div style={styles.errorMessage}>{error}</div>}
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            placeholder="Enter your password"
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          style={styles.submitButton}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <div style={styles.hintContainer}>
        <button 
          onClick={() => setShowHint(!showHint)} 
          style={styles.hintButton}
        >
          {showHint ? 'Hide Hint' : 'Need a Hint?'}
        </button>
        
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
const UserProfile = () => {
  const { user, logout, updateProfile, theme, toggleTheme, notifications, toggleNotifications } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);

  const handleSaveProfile = () => {
    updateProfile({ name: editedName });
    setIsEditing(false);
  };

  return (
    <div style={styles.profileContainer}>
      <div style={styles.profileHeader}>
        <div style={styles.avatarContainer}>
          <img 
            src={user.avatar} 
            alt={user.name} 
            style={styles.avatar} 
          />
        </div>
        
        <div style={styles.userInfo}>
          {isEditing ? (
            <div style={styles.editNameContainer}>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                style={styles.editNameInput}
              />
              <div style={styles.editButtonGroup}>
                <button 
                  onClick={handleSaveProfile} 
                  style={styles.saveButton}
                >
                  Save
                </button>
                <button 
                  onClick={() => {
                    setIsEditing(false);
                    setEditedName(user.name);
                  }} 
                  style={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <h3 style={styles.userName}>
              {user.name}
              <button 
                onClick={() => setIsEditing(true)} 
                style={styles.editButton}
              >
                Edit
              </button>
            </h3>
          )}
          <p style={styles.userEmail}>{user.email}</p>
          <p style={styles.userRole}>Role: {user.role}</p>
          <p style={styles.lastLogin}>Last login: {new Date(user.lastLogin).toLocaleString()}</p>
        </div>
      </div>
      
      <div style={styles.preferencesSection}>
        <h4 style={styles.preferencesTitle}>User Preferences</h4>
        
        <div style={styles.preferenceItem}>
          <span style={styles.preferenceLabel}>Theme:</span>
          <div style={styles.themeToggle}>
            <button 
              onClick={toggleTheme} 
              style={{
                ...styles.themeButton,
                backgroundColor: theme === 'light' ? '#f8f9fa' : '#343a40',
                color: theme === 'light' ? '#343a40' : '#f8f9fa',
              }}
            >
              {theme === 'light' ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </div>
        
        <div style={styles.preferenceItem}>
          <span style={styles.preferenceLabel}>Notifications:</span>
          <label style={styles.switch}>
            <input 
              type="checkbox" 
              checked={notifications}
              onChange={toggleNotifications}
            />
            <span style={styles.slider}></span>
          </label>
        </div>
      </div>
      
      <button 
        onClick={logout} 
        style={styles.logoutButton}
      >
        Logout
      </button>
    </div>
  );
};

// Loading Spinner Component
const LoadingSpinner = () => {
  return (
    <div style={styles.loadingContainer}>
      <div style={styles.spinner}></div>
      <p style={styles.loadingText}>Loading...</p>
    </div>
  );
};

// Main Component
const UseContextChallenge = () => {
  return (
    <AuthProvider>
      <div style={styles.container}>
        <h2 style={styles.title}>useContext Authentication Challenge</h2>
        
        <AuthConsumer />
      </div>
    </AuthProvider>
  );
};

// Consumer Component
const AuthConsumer = () => {
  const { isAuthenticated, loading, theme } = useContext(AuthContext);
  
  // Apply theme styles
  const containerStyle = {
    ...styles.authContainer,
    backgroundColor: theme === 'light' ? '#ffffff' : '#343a40',
    color: theme === 'light' ? '#343a40' : '#ffffff',
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div style={containerStyle}>
      {isAuthenticated ? <UserProfile /> : <LoginForm />}
    </div>
  );
};

// Styles
const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    color: '#343a40',
    marginBottom: '30px',
    fontSize: '28px',
  },
  authContainer: {
    padding: '25px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '5px solid #f3f3f3',
    borderTop: '5px solid #007bff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    marginTop: '15px',
    color: '#6c757d',
    fontSize: '16px',
  },
  loginForm: {
    maxWidth: '400px',
    margin: '0 auto',
  },
  formTitle: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    display: 'block',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ced4da',
    backgroundColor: 'transparent',
  },
  submitButton: {
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  errorMessage: {
    color: '#dc3545',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#f8d7da',
    marginBottom: '15px',
    textAlign: 'center',
  },
  hintContainer: {
    marginTop: '20px',
    textAlign: 'center',
  },
  hintButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#007bff',
    cursor: 'pointer',
    fontSize: '14px',
    textDecoration: 'underline',
  },
  hint: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#e9ecef',
    borderRadius: '5px',
    fontSize: '14px',
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  avatarContainer: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    overflow: 'hidden',
    border: '3px solid #007bff',
  },
  avatar: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  userInfo: {
    flex: '1',
  },
  userName: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0 0 5px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  userEmail: {
    fontSize: '16px',
    color: '#6c757d',
    margin: '0 0 5px 0',
  },
  userRole: {
    fontSize: '14px',
    margin: '0 0 5px 0',
  },
  lastLogin: {
    fontSize: '12px',
    fontStyle: 'italic',
    margin: '0',
  },
  editButton: {
    padding: '3px 8px',
    fontSize: '12px',
    backgroundColor: '#6c757d',
    color: '#ffffff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    marginLeft: '10px',
  },
  editNameContainer: {
    marginBottom: '10px',
  },
  editNameInput: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ced4da',
    marginBottom: '10px',
    backgroundColor: 'transparent',
  },
  editButtonGroup: {
    display: 'flex',
    gap: '10px',
  },
  saveButton: {
    padding: '5px 10px',
    backgroundColor: '#28a745',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  preferencesSection: {
    marginTop: '20px',
    padding: '15px',
    borderRadius: '5px',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  preferencesTitle: {
    margin: '0 0 15px 0',
    fontSize: '18px',
  },
  preferenceItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  preferenceLabel: {
    fontSize: '16px',
  },
  themeToggle: {
    display: 'flex',
    alignItems: 'center',
  },
  themeButton: {
    padding: '8px 12px',
    borderRadius: '20px',
    border: '1px solid #ced4da',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  switch: {
    position: 'relative',
    display: 'inline-block',
    width: '60px',
    height: '34px',
  },
  slider: {
    position: 'absolute',
    cursor: 'pointer',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: '#ccc',
    borderRadius: '34px',
    transition: '0.4s',
    '&:before': {
      position: 'absolute',
      content: '""',
      height: '26px',
      width: '26px',
      left: '4px',
      bottom: '4px',
      backgroundColor: 'white',
      borderRadius: '50%',
      transition: '0.4s',
    },
  },
  logoutButton: {
    padding: '12px',
    backgroundColor: '#dc3545',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
    width: '100%',
  },
};

export default UseContextChallenge;