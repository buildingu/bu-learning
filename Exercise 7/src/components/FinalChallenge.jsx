import React, { useState, useEffect, useRef, useContext, useReducer } from 'react';
import { AuthContext, AuthProvider } from './useContextChallenge/AuthContext';

/**
 * Improved FinalChallenge.jsx
 * 
 * Changes made:
 * - Moved useContext inside a provider: Wrapped form content with <AuthProvider> and moved context usage inside to fix the blank screen (user was undefined without provider).
 * - Extended useReducer to handle form submission (added a 'SUBMIT' action and 'submitted' state) for submission feedback.
 * - Added conditional rendering of a success message upon form submission.
 * - Added styling (padding, margins, colors, etc.) to inputs, buttons, and container for a polished, responsive UI.
 * - Included comments explaining how each React hook is used.
 */

// Initial form state for useReducer
const initialFormState = { name: '', email: '', submitted: false };

// Reducer function to manage form state and actions
function formReducer(state, action) {
  switch (action.type) {
    case 'CHANGE':
      // Update a specific field and reset the submitted flag if editing after submission
      return { ...state, [action.field]: action.value, submitted: false };
    case 'RESET':
      // Reset to initial form state (clear fields and submission status)
      return initialFormState;
    case 'SUBMIT':
      // Mark form as submitted (we keep field values to possibly display feedback)
      return { ...state, submitted: true };
    default:
      return state;
  }
}

// Styles for the component (for polished UI and responsiveness)
const styles = {
  container: {
    maxWidth: '400px',
    margin: '30px auto',          // center horizontally and add top margin
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    // Theme-based background and text color from context
    backgroundColor: '#ffffff',   // default light theme background
    color: '#343a40',             // default light theme text color
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    marginBottom: '1rem',
    borderRadius: '5px',
    border: '1px solid #ced4da',
    backgroundColor: 'transparent', // transparent to allow container background to show
    color: 'inherit'                // use container's text color for input text
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: '#ffffff'
  },
  resetButton: {
    backgroundColor: '#6c757d',
    color: '#ffffff',
    marginLeft: '10px'
  },
  errorText: {
    marginTop: '10px',
    color: '#dc3545',
    backgroundColor: '#f8d7da',
    padding: '10px',
    borderRadius: '5px'
  },
  successText: {
    marginTop: '10px',
    color: '#155724',
    backgroundColor: '#d4edda',
    padding: '10px',
    borderRadius: '5px'
  }
};

export default function FinalChallenge() {
  // Wrap the form in AuthProvider so useContext has access to AuthContext values
  return (
    <AuthProvider>
      <FinalChallengeForm />
    </AuthProvider>
  );
}

// Inner component that contains the form and uses multiple hooks
function FinalChallengeForm() {
  // useContext: get user info and theme from AuthContext (provided by AuthProvider above)
  const { user, theme } = useContext(AuthContext);

  // useRef: reference to the name input, to focus it on initial render
  const inputRef = useRef(null);

  // useReducer: manage form field state and submission state with a reducer
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  // useState: track whether the form is valid (for enabling submit button and showing validation messages)
  const [isValid, setIsValid] = useState(false);

  // useEffect: validate form fields in real-time whenever name or email changes
  useEffect(() => {
    // Simple validation: name must not be empty and email must match basic pattern
    const nameFilled = state.name.trim().length > 0;
    const emailValid = /\S+@\S+\.\S+/.test(state.email);
    setIsValid(nameFilled && emailValid);
  }, [state.name, state.email]);  // dependencies on specific fields to avoid unnecessary re-validation

  // useEffect: focus the name input on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);  // empty dependency array -> runs once on mount

  // Adjust container styles based on current theme (from context)
  const containerStyle = {
    ...styles.container,
    backgroundColor: theme === 'dark' ? '#343a40' : '#ffffff',
    color: theme === 'dark' ? '#ffffff' : '#343a40'
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: '0.5rem' }}>Final Challenge</h2>
      {/* Display logged-in user's name from context, or 'Guest' if no user */}
      <p>Logged in as: <strong>{ user ? user.name : 'Guest' }</strong></p>

      {/* Form inputs for name and email */}
      <input
        ref={inputRef}
        type="text"
        placeholder="Name"
        value={state.name}
        onChange={e => dispatch({ type: 'CHANGE', field: 'name', value: e.target.value })}
        style={styles.input}
      />
      <input
        type="email"
        placeholder="Email"
        value={state.email}
        onChange={e => dispatch({ type: 'CHANGE', field: 'email', value: e.target.value })}
        style={styles.input}
      />

      {/* Action buttons: Submit and Reset */}
      <button
        style={{ ...styles.button, ...styles.submitButton }}
        disabled={!isValid || state.submitted}
        onClick={() => dispatch({ type: 'SUBMIT' })}
      >
        Submit
      </button>
      <button
        style={{ ...styles.button, ...styles.resetButton }}
        onClick={() => dispatch({ type: 'RESET' })}
      >
        Reset
      </button>

      {/* Validation error message (shows only when form is invalid and not yet submitted) */}
      {!isValid && !state.submitted && (
        <p style={styles.errorText}>
          Please fill out both fields correctly.
        </p>
      )}

      {/* Success message (shows only after form is submitted successfully) */}
      {state.submitted && (
        <p style={styles.successText}>
          Thank you, <strong>{state.name}</strong>! We will be in touch at <strong>{state.email}</strong>.
        </p>
      )}
    </div>
  );
}
