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

const UseStateChallenge = () => {
  // State for the current counter value
  const [count, setCount] = useState(0);
  
  // State for the history of counter values
  const [countHistory, setCountHistory] = useState([]);
  
  // State for the input value
  const [inputValue, setInputValue] = useState('');

  // Function to increment the counter
  const handleIncrement = () => {
    setCount(prevCount => {
      const newCount = prevCount + 1;
      setCountHistory(prevHistory => [...prevHistory, newCount]);
      return newCount;
    });
  };

  // Function to decrement the counter
  const handleDecrement = () => {
    setCount(prevCount => {
      const newCount = prevCount - 1;
      setCountHistory(prevHistory => [...prevHistory, newCount]);
      return newCount;
    });
  };

  // Function to reset the counter
  const handleReset = () => {
    setCount(0);
    setCountHistory(prevHistory => [...prevHistory, 0]);
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Function to set counter to input value
  const handleSetCounterValue = () => {
    const parsedValue = parseInt(inputValue, 10);
    if (!isNaN(parsedValue)) {
      setCount(parsedValue);
      setCountHistory(prevHistory => [...prevHistory, parsedValue]);
      setInputValue('');
    }
  };

  // Function to clear history
  const handleClearHistory = () => {
    setCountHistory([]);
  };

  return (
    <div className="counter-container" style={styles.container}>
      <h2 style={styles.title}>useState Counter Challenge</h2>
      
      <div style={styles.counterDisplay}>
        <h1 style={styles.counterValue}>{count}</h1>
      </div>
      
      <div style={styles.buttonContainer}>
        <button 
          style={styles.button} 
          onClick={handleDecrement}
        >
          Decrement
        </button>
        <button 
          style={styles.button} 
          onClick={handleReset}
        >
          Reset
        </button>
        <button 
          style={styles.button} 
          onClick={handleIncrement}
        >
          Increment
        </button>
      </div>
      
      <div style={styles.inputContainer}>
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a value"
          style={styles.input}
        />
        <button 
          style={styles.setButton}
          onClick={handleSetCounterValue}
        >
          Set Value
        </button>
      </div>
      
      <div style={styles.historyContainer}>
        <div style={styles.historyHeader}>
          <h3 style={styles.historyTitle}>Count History</h3>
          <button 
            style={styles.clearButton}
            onClick={handleClearHistory}
          >
            Clear History
          </button>
        </div>
        
        <div style={styles.historyList}>
          {countHistory.length === 0 ? (
            <p style={styles.emptyHistory}>No history yet</p>
          ) : (
            countHistory.map((value, index) => (
              <div key={index} style={styles.historyItem}>
                {index + 1}. Changed to {value}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    maxWidth: '600px',
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
    marginBottom: '20px',
  },
  counterDisplay: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  counterValue: {
    textAlign: 'center',
    fontSize: '48px',
    margin: '0',
    color: '#007bff',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  inputContainer: {
    display: 'flex',
    marginBottom: '20px',
    gap: '10px',
  },
  input: {
    flex: '1',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ced4da',
  },
  setButton: {
    padding: '10px 15px',
    fontSize: '16px',
    backgroundColor: '#28a745',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  historyContainer: {
    backgroundColor: '#ffffff',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  historyHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  historyTitle: {
    margin: '0',
    color: '#343a40',
  },
  clearButton: {
    padding: '5px 10px',
    fontSize: '14px',
    backgroundColor: '#dc3545',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  historyList: {
    maxHeight: '200px',
    overflowY: 'auto',
  },
  historyItem: {
    padding: '8px',
    borderBottom: '1px solid #e9ecef',
    color: '#495057',
  },
  emptyHistory: {
    textAlign: 'center',
    color: '#6c757d',
    fontStyle: 'italic',
  },
};

export default UseStateChallenge;