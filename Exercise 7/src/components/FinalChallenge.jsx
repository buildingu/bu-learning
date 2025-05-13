// Import React and several hooks from the React library
import React, { useState, useEffect, useRef, useContext, useReducer } from 'react';
// Import AuthContext and AuthProvider from a local file for authentication and theme context
import { AuthContext, AuthProvider } from './useContextChallenge/AuthContext';

// This is a comment block describing the improvements and features of this component
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

// Define the initial state for the form, with empty name and email, and not submitted
const initialFormState = { name: '', email: '', submitted: false, touched: false };

// This function manages how the form state changes based on different actions
function formReducer(state, action) {
  // Check the type of action being dispatched; which simply means what action is being performed
  // and update the state accordingly
  switch (action.type) {
    case 'CHANGE':
      // If the action is 'CHANGE', update the specific field (name or email) and reset 'submitted' to false
      return { ...state, [action.field]: action.value, submitted: false }; // .field means the field name is dynamic, it can be either name or email
    case 'RESET':
      // If the action is 'RESET', return the initial form state (clear all fields and submission status)
      return initialFormState;
    
    case 'SUBMIT':
      // If the action is 'SUBMIT', set 'submitted' to true (keep the current field values)
      return { ...state, submitted: true };

      // If the user initially started the website, it won't throw an error
      case 'TOUCH':
      return { ...state, touched: true };
    default:
      // If the action type is not recognized, return the current state unchanged
      return state;
  }
}

// Define a styles object to store CSS styles for the component
const styles = {
  container: {
    // Set the maximum width of the form container
    maxWidth: '400px',
    // Center the container horizontally and add top margin
    margin: '30px auto',
    // Add padding inside the container
    padding: '20px',
    // Round the corners of the container
    borderRadius: '8px',
    // Add a subtle box shadow for depth
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    // Set a default background color (can be changed by theme)
    backgroundColor: '#ffffff',
    // Set a default text color (can be changed by theme)
    color: '#343a40',
  },
  input: {
    // Make input fields take up the full width of the container
    width: '100%',
    // Add padding inside the input fields
    padding: '10px',
    // Set the font size for input text
    fontSize: '16px',
    // Add space below each input
    marginBottom: '1rem',
    // Round the corners of the input fields
    borderRadius: '5px',
    // Add a light border around the input fields
    border: '1px solid #ced4da',
    // Make the input background transparent so the container's background shows through
    backgroundColor: 'transparent',
    // Make the input text color inherit from the container
    color: 'inherit'
  },
  button: {
    // Add padding inside the buttons
    padding: '10px 20px',
    // Set the font size for button text
    fontSize: '16px',
    // Remove the default border from buttons
    border: 'none',
    // Round the corners of the buttons
    borderRadius: '5px',
    // Change the cursor to a pointer when hovering over buttons
    cursor: 'pointer'
  },
  submitButton: {
    // Set the background color for the submit button (blue)
    backgroundColor: '#007bff',
    // Set the text color for the submit button (white)
    color: '#ffffff'
  },
  resetButton: {
    // Set the background color for the reset button (gray)
    backgroundColor: '#6c757d',
    // Set the text color for the reset button (white)
    color: '#ffffff',
    // Add space to the left of the reset button
    marginLeft: '10px'
  },
  errorText: {
    // Add space above the error message
    marginTop: '10px',
    // Set the text color for the error message (red)
    color: '#dc3545',
    // Set the background color for the error message (light red)
    backgroundColor: '#f8d7da',
    // Add padding inside the error message
    padding: '10px',
    // Round the corners of the error message box
    borderRadius: '5px'
  },
  successText: {
    // Add space above the success message
    marginTop: '10px',
    // Set the text color for the success message (green)
    color: '#155724',
    // Set the background color for the success message (light green)
    backgroundColor: '#d4edda',
    // Add padding inside the success message
    padding: '10px',
    // Round the corners of the success message box
    borderRadius: '5px'
  },
  validText: {
    // Add space above the success message
    marginTop: '10px',
    // Set the text color for the success message (dark blue)
    color: '#004085',
    // Set the background color for the success message (light blue)
    backgroundColor: '#cce5ff',
    // Add padding inside the success message
    padding: '10px',
    // Round the corners of the success message box
    borderRadius: '5px'
  }
};

// This is the main exported component for the file
export default function FinalChallenge() {
  // Wrap the form in the AuthProvider so that any child component can access authentication and theme context
  return (
    <AuthProvider>
      {/* Render the actual form inside the AuthProvider */}
      <FinalChallengeForm/>
    </AuthProvider>
  );
}

// This is the inner component that contains the form and uses several React hooks
function FinalChallengeForm() {
  // useContext: Get the current user and theme from the AuthContext
  const { user, theme } = useContext(AuthContext);

  // useRef: Create a reference to the name input field so we can focus it automatically
  const inputRef = useRef(null);

  // useReducer: Manage the form's state (name, email, submitted) using the reducer function and initial state
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  // useState: Track whether the form is valid (used to enable/disable the submit button and show validation messages)
  const [isValid, setIsValid] = useState(false);

  // useEffect: Whenever the name or email changes, check if the form is valid
  useEffect(() => {
    // Check if the name field is not empty (after trimming whitespace)
    const nameFilled = state.name.trim().length > 0;
    // Check if the email field matches a basic email pattern
    const emailValid = /\S+@\S+\.\S+/.test(state.email); // "/\S+@\S+\.\S+/" is a regex pattern for basic email validation
    // Set isValid to true only if both fields are valid
    setIsValid(nameFilled && emailValid);
  }, [state.name, state.email]); // Only run this effect when name or email changes

  // useEffect: When the component first mounts, focus the name input field
  useEffect(() => {
    // If the inputRef is attached to an input element, focus it
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []); // Run this effect only once when the component mounts

  // Adjust the container's background and text color based on the current theme (light or dark)
  const containerStyle = {
    ...styles.container,
    backgroundColor: theme === 'dark' ? '#343a40' : '#ffffff',
    color: theme === 'dark' ? '#ffffff' : '#343a40'
  };

  // Render the form UI
  return (
    // Apply the container styles to the outer div
    <div style={containerStyle}>
      {/* Display the form title */}
      <h2 style={{ marginBottom: '0.5rem' }}>Final Challenge</h2>
      {/* Show the logged-in user's name from context, or 'Guest' if no user is logged in */}
      <p>Logged in as: <strong>{ user ? user.name : 'Guest' }</strong></p>

      {/* Input field for the user's name */}
      <input
        // Attach the inputRef so we can focus this field automatically
        ref={inputRef}
        // Set the input type to text
        type="text"
        // Show placeholder text inside the input
        placeholder="Name"
        // Set the value of the input to the current name in state
        value={state.name}
        // When the input changes, dispatch a 'CHANGE' action to update the name in state
        onChange={e => {
          dispatch({ type: 'CHANGE', field: 'name', value: e.target.value });
          dispatch({ type: 'TOUCH' });
        }}
        // Apply the input styles
        style={styles.input}
      />
      {/* Input field for the user's email */}
      <input
        // Set the input type to email for email validation
        type="email"
        // Show placeholder text inside the input
        placeholder="Email"
        // Set the value of the input to the current email in state
        value={state.email}
        // When the input changes, dispatch a 'CHANGE' action to update the email in state
        onChange={e => dispatch({ type: 'CHANGE', field: 'email', value: e.target.value })}
        // Apply the input styles
        style={styles.input}
      />

      {/* Submit button for the form */}
      <button
        // Combine the base button styles with the submit button styles
        style={{ ...styles.button, ...styles.submitButton }}
        // Disable the button if the form is invalid or already submitted
        disabled={!isValid || state.submitted}
        // When clicked, dispatch a 'SUBMIT' action to mark the form as submitted
        onClick={() => dispatch({ type: 'SUBMIT' })}
      >
        Submit
      </button>
      {/* Reset button to clear the form */}
      <button
        // Combine the base button styles with the reset button styles
        style={{ ...styles.button, ...styles.resetButton }}
        // When clicked, dispatch a 'RESET' action to clear the form fields and submission status
        onClick={() => dispatch({ type: 'RESET' })}
      >
        Reset
      </button>

      {/* If the form is invalid and hasn't been submitted, show a validation error message */}
      {!isValid && state.touched && !state.submitted && (
        <p style={styles.errorText}>
          Please fill out both fields correctly.
        </p>
      )}

      {/* If the form has not been submitted, but has valid credentials */}
      {!state.submitted && state.touched && isValid && (
        <p style={styles.validText}>
          Valid Credentials! Feel free to submit the form.
        </p>
      )}

      {/* If the form has been submitted successfully, show a thank you message with the user's name and email */}
      {state.submitted && (
        <p style={styles.successText}>
          Thank you, <strong>{state.name}</strong>! We will be in touch at <strong>{state.email}</strong>.
        </p>
      )}
    </div>
  );
}