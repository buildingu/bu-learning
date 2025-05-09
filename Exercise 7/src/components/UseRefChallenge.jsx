import React, { useRef, useState, useEffect } from 'react';

/**
 * Challenge: Create a component that demonstrates useRef in multiple ways
 * 
 * Requirements:
 * 1. Create an input field that automatically gets focus when the component mounts
 * 2. Implement a stopwatch with start, stop, and reset functionality using useRef to track the timer
 * 3. Create a "click outside" detector that counts how many times you've clicked outside a specific element
 * 4. Add some styling to make it visually appealing
 */

const UseRefChallenge = () => {
  // Ref for the input element to focus on mount
  const inputRef = useRef(null);
  
  // Ref for the timer interval ID
  const timerIdRef = useRef(null);
  
  // Ref to store previous time value
  const prevTimeRef = useRef(0);
  
  // Ref for the box element to detect clicks outside
  const boxRef = useRef(null);
  
  // States
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [outsideClicks, setOutsideClicks] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [savedValues, setSavedValues] = useState([]);

  // Focus input on component mount
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Handle click outside detection
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setOutsideClicks(prev => prev + 1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Start the timer
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      prevTimeRef.current = Date.now() - time;
      timerIdRef.current = setInterval(() => {
        setTime(Date.now() - prevTimeRef.current);
      }, 10);
    }
  };

  // Stop the timer
  const stopTimer = () => {
    if (isRunning) {
      clearInterval(timerIdRef.current);
      setIsRunning(false);
    }
  };

  // Reset the timer
  const resetTimer = () => {
    clearInterval(timerIdRef.current);
    setIsRunning(false);
    setTime(0);
  };

  // Format time for display (mm:ss:ms)
  const formatTime = () => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
  };

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Save input value
  const handleSaveValue = () => {
    if (inputValue.trim()) {
      setSavedValues(prev => [...prev, inputValue]);
      setInputValue('');
      inputRef.current.focus();
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>useRef Challenge</h2>

      {/* Input with focus */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Auto-Focus Input</h3>
        <div style={styles.inputContainer}>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type something here..."
            style={styles.input}
          />
          <button style={styles.button} onClick={handleSaveValue}>
            Save Value
          </button>
        </div>

        {savedValues.length > 0 && (
          <div style={styles.savedValuesContainer}>
            <h4 style={styles.savedValuesTitle}>Saved Values:</h4>
            <ul style={styles.savedValuesList}>
              {savedValues.map((value, index) => (
                <li key={index} style={styles.savedValueItem}>
                  {value}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Stopwatch */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Stopwatch using useRef</h3>
        <div style={styles.stopwatchContainer}>
          <div style={styles.timeDisplay}>{formatTime()}</div>
          <div style={styles.buttonGroup}>
            <button 
              style={{...styles.button, backgroundColor: isRunning ? '#6c757d' : '#28a745'}} 
              onClick={startTimer}
              disabled={isRunning}
            >
              Start
            </button>
            <button 
              style={{...styles.button, backgroundColor: isRunning ? '#dc3545' : '#6c757d'}} 
              onClick={stopTimer}
              disabled={!isRunning}
            >
              Stop
            </button>
            <button 
              style={{...styles.button, backgroundColor: '#007bff'}} 
              onClick={resetTimer}
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      {/* Click outside detector */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Click Outside Detector</h3>
        <p style={styles.description}>
          Click anywhere outside the box to increase the counter.
        </p>
        <div style={styles.detectorContainer}>
          <div ref={boxRef} style={styles.box}>
            <p style={styles.boxText}>I'm tracking clicks outside me!</p>
          </div>
          <div style={styles.clicksCounter}>
            Outside Clicks: <span style={styles.clicksValue}>{outsideClicks}</span>
          </div>
        </div>
      </section>
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
  section: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    marginBottom: '25px',
  },
  sectionTitle: {
    color: '#343a40',
    borderBottom: '1px solid #e9ecef',
    paddingBottom: '10px',
    marginTop: '0',
  },
  inputContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '15px',
  },
  input: {
    flex: '1',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ced4da',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  button: {
    padding: '10px 15px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  savedValuesContainer: {
    marginTop: '15px',
  },
  savedValuesTitle: {
    color: '#495057',
    margin: '10px 0',
  },
  savedValuesList: {
    backgroundColor: '#f8f9fa',
    borderRadius: '5px',
    padding: '10px',
    margin: '0',
  },
  savedValueItem: {
    padding: '8px 0',
    borderBottom: '1px solid #e9ecef',
    listStyleType: 'none',
  },
  stopwatchContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  timeDisplay: {
    fontSize: '36px',
    fontFamily: 'monospace',
    backgroundColor: '#343a40',
    color: '#ffffff',
    padding: '15px 30px',
    borderRadius: '8px',
    marginBottom: '20px',
    width: '200px',
    textAlign: 'center',
  },
  buttonGroup: {
    display: 'flex',
    gap: '15px',
  },
  description: {
    color: '#6c757d',
    marginBottom: '15px',
    fontStyle: 'italic',
  },
  detectorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  box: {
    width: '250px',
    height: '150px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'transform 0.3s, box-shadow 0.3s',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  boxText: {
    textAlign: 'center',
    padding: '10px',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  clicksCounter: {
    fontSize: '18px',
    padding: '10px 15px',
    backgroundColor: '#e9ecef',
    borderRadius: '5px',
    color: '#343a40',
  },
  clicksValue: {
    fontWeight: 'bold',
    color: '#dc3545',
  },
};

export default UseRefChallenge;