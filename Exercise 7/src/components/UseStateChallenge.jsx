// Import React and the useState hook from the 'react' library
import React, { useState } from 'react';

/**
 * Challenge: Create a counter component using useState
 * 
 * Requirements:
 * 1. Implement a counter with increment, decrement, and reset functionality
 * 2. Add a count history feature that tracks previous counter values
 * 3. Allow setting the counter to a specific value using an input field
 * 4. Add some styling to make it visually appealing
 */

// Define a functional React component called UseStateChallenge
const UseStateChallenge = () => {
  // Declare a state variable 'count' to store the current counter value, and 'setCount' to update it. Start at 0.
  const [count, setCount] = useState(0);
  
  // Declare a state variable 'countHistory' to store an array of previous counter values, and 'setCountHistory' to update it. Start as an empty array.
  const [countHistory, setCountHistory] = useState([]);
  
  // Declare a state variable 'inputValue' to store the value from the input field, and 'setInputValue' to update it. Start as an empty string.
  const [inputValue, setInputValue] = useState('');

  // Define a function to increment the counter by 1
  const handleIncrement = () => {
    // Use the previous count value to calculate the new count
    setCount(prevCount => {
      // Add 1 to the previous count
      const newCount = prevCount + 1;
      // Add the new count to the history array
      setCountHistory(prevHistory => [...prevHistory, newCount]);
      // Return the new count so React updates the state
      return newCount;
    });
  };

  // Define a function to decrement the counter by 1
  const handleDecrement = () => {
    // Use the previous count value to calculate the new count
    setCount(prevCount => {
      // Subtract 1 from the previous count
      const newCount = prevCount - 1;
      // Add the new count to the history array
      setCountHistory(prevHistory => [...prevHistory, newCount]);
      // Return the new count so React updates the state
      return newCount;
    });
  };

  // Define a function to reset the counter to 0
  const handleReset = () => {
    // Set the counter value to 0
    setCount(0);
    // Add 0 to the history array
    setCountHistory(prevHistory => [...prevHistory, 0]);
  };

  // Define a function to handle changes in the input field
  const handleInputChange = (e) => {
    // Update the inputValue state with the new value from the input field
    setInputValue(e.target.value);
  };

  // Define a function to set the counter to the value entered in the input field
  const handleSetCounterValue = () => {
    // Convert the input value from a string to an integer
    const parsedValue = parseInt(inputValue, 10);
    // Check if the parsed value is a valid number (not NaN)
    if (!isNaN(parsedValue)) {
      // Set the counter to the parsed value
      setCount(parsedValue);
      // Add the new value to the history array
      setCountHistory(prevHistory => [...prevHistory, parsedValue]);
      // Clear the input field
      setInputValue('');
    }
  };

  // Define a function to clear the count history
  const handleClearHistory = () => {
    // Set the history array to an empty array
    setCountHistory([]);
  };

  // The component returns JSX to render the UI
  return (
    // Main container div with a class and inline styles
    <div className="counter-container" style={styles.container}>
      {/* Title of the counter app */}
      <h2 style={styles.title}>useState Counter Challenge</h2>
      
      {/* Display the current counter value */}
      <div style={styles.counterDisplay}>
        <h1 style={styles.counterValue}>{count}</h1>
      </div>
      
      {/* Container for the increment, decrement, and reset buttons */}
      <div style={styles.buttonContainer}>
        {/* Button to decrement the counter */}
        <button 
          style={styles.button} 
          onClick={handleDecrement}
        >
          Decrement
        </button>
        {/* Button to reset the counter */}
        <button 
          style={styles.button} 
          onClick={handleReset}
        >
          Reset
        </button>
        {/* Button to increment the counter */}
        <button 
          style={styles.button} 
          onClick={handleIncrement}
        >
          Increment
        </button>
      </div>
      
      {/* Container for the input field and set value button */}
      <div style={styles.inputContainer}>
        {/* Input field to enter a specific counter value */}
        <input
          type="number" // Only allows numbers to be entered
          value={inputValue} // The value of the input is controlled by inputValue state
          onChange={handleInputChange} // Calls handleInputChange when the input changes
          placeholder="Enter a value" // Placeholder text for the input
          style={styles.input} // Inline styles for the input
        />
        {/* Button to set the counter to the input value */}
        <button 
          style={styles.setButton}
          onClick={handleSetCounterValue}
        >
          Set Value
        </button>
      </div>
      
      {/* Container for the count history section */}
      <div style={styles.historyContainer}>
        {/* Header for the history section, includes title and clear button */}
        <div style={styles.historyHeader}>
          {/* Title for the history section */}
          <h3 style={styles.historyTitle}>Count History</h3>
          {/* Button to clear the history */}
          <button 
            style={styles.clearButton}
            onClick={handleClearHistory}
          >
            Clear History
          </button>
        </div>
        
        {/* List of previous counter values */}
        <div style={styles.historyList}>
          {/* If there is no history, show a message */}
          {countHistory.length === 0 ? (
            <p style={styles.emptyHistory}>No history yet</p>
          ) : (
            // Otherwise, map over the history array and display each value
            countHistory.map((value, index) => (
              // Each history item is shown in a styled div
              <div key={index} style={styles.historyItem}>
                {/* Show the index (starting at 1) and the value */}
                {index + 1}. Changed to {value}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// Define a 'styles' object to store all the inline styles for the component
const styles = {
  // Styles for the main container
  container: {
    maxWidth: '600px', // Maximum width of the container
    margin: '0 auto', // Center the container horizontally
    padding: '20px', // Padding inside the container
    backgroundColor: '#f8f9fa', // Light background color
    borderRadius: '10px', // Rounded corners
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
    fontFamily: 'Arial, sans-serif', // Font for the text
  },
  // Styles for the title
  title: {
    textAlign: 'center', // Center the text
    color: '#343a40', // Dark gray color
    marginBottom: '20px', // Space below the title
  },
  // Styles for the counter display area
  counterDisplay: {
    backgroundColor: '#ffffff', // White background
    padding: '20px', // Padding inside the box
    borderRadius: '8px', // Rounded corners
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)', // Inner shadow for effect
    marginBottom: '20px', // Space below the counter
  },
  // Styles for the counter value
  counterValue: {
    textAlign: 'center', // Center the number
    fontSize: '48px', // Large font size
    margin: '0', // No margin
    color: '#007bff', // Blue color
  },
  // Styles for the button container
  buttonContainer: {
    display: 'flex', // Use flexbox layout
    justifyContent: 'space-between', // Space buttons evenly
    marginBottom: '20px', // Space below the buttons
  },
  // Styles for the increment, decrement, and reset buttons
  button: {
    padding: '10px 20px', // Padding inside the button
    fontSize: '16px', // Font size
    backgroundColor: '#007bff', // Blue background
    color: '#ffffff', // White text
    border: 'none', // No border
    borderRadius: '5px', // Rounded corners
    cursor: 'pointer', // Pointer cursor on hover
    transition: 'all 0.3s ease', // Smooth transition for hover effects
  },
  // Styles for the input and set value button container
  inputContainer: {
    display: 'flex', // Use flexbox layout
    marginBottom: '20px', // Space below the input area
    gap: '10px', // Space between input and button
  },
  // Styles for the input field
  input: {
    flex: '1', // Take up remaining space
    padding: '10px', // Padding inside the input
    fontSize: '16px', // Font size
    borderRadius: '5px', // Rounded corners
    border: '1px solid #ced4da', // Light gray border
  },
  // Styles for the set value button
  setButton: {
    padding: '10px 15px', // Padding inside the button
    fontSize: '16px', // Font size
    backgroundColor: '#28a745', // Green background
    color: '#ffffff', // White text
    border: 'none', // No border
    borderRadius: '5px', // Rounded corners
    cursor: 'pointer', // Pointer cursor on hover
  },
  // Styles for the history container
  historyContainer: {
    backgroundColor: '#ffffff', // White background
    padding: '15px', // Padding inside the box
    borderRadius: '8px', // Rounded corners
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow
  },
  // Styles for the history header (title and clear button)
  historyHeader: {
    display: 'flex', // Use flexbox layout
    justifyContent: 'space-between', // Space title and button apart
    alignItems: 'center', // Vertically center items
    marginBottom: '10px', // Space below the header
  },
  // Styles for the history title
  historyTitle: {
    margin: '0', // No margin
    color: '#343a40', // Dark gray color
  },
  // Styles for the clear history button
  clearButton: {
    padding: '5px 10px', // Padding inside the button
    fontSize: '14px', // Font size
    backgroundColor: '#dc3545', // Red background
    color: '#ffffff', // White text
    border: 'none', // No border
    borderRadius: '5px', // Rounded corners
    cursor: 'pointer', // Pointer cursor on hover
  },
  // Styles for the history list container
  historyList: {
    maxHeight: '200px', // Maximum height before scrolling
    overflowY: 'auto', // Add vertical scroll if needed
  },
  // Styles for each history item
  historyItem: {
    padding: '8px', // Padding inside the item
    borderBottom: '1px solid #e9ecef', // Light gray line below each item
    color: '#495057', // Medium gray text
  },
  // Styles for the empty history message
  emptyHistory: {
    textAlign: 'center', // Center the text
    color: '#6c757d', // Light gray color
    fontStyle: 'italic', // Italic text
  },
};

// Export the UseStateChallenge component so it can be used in other files
export default UseStateChallenge;