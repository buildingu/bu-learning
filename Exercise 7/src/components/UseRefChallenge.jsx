// Import React and some useful hooks from the 'react' library
import React, { useRef, useState, useEffect } from 'react';

// This is a React functional component called UseRefChallenge
const UseRefChallenge = () => {
  // Create a reference to the input element so we can focus it later
  const inputRef = useRef(null);

  // Create a reference to store the interval ID for the stopwatch timer
  const timerIdRef = useRef(null);

  // Create a reference to store the previous time value for the stopwatch
  const prevTimeRef = useRef(0);

  // Create a reference to the box element for detecting clicks outside of it
  const boxRef = useRef(null);

  // Create a state variable to keep track of the elapsed time in milliseconds
  const [time, setTime] = useState(0);

  // Create a state variable to know if the stopwatch is running or not
  const [isRunning, setIsRunning] = useState(false);

  // Create a state variable to count how many times the user has clicked outside the box
  const [outsideClicks, setOutsideClicks] = useState(0);

  // Create a state variable to store the current value of the input field
  const [inputValue, setInputValue] = useState('');

  // Create a state variable to store all the values the user has saved from the input
  const [savedValues, setSavedValues] = useState([]);

  // This useEffect runs once when the component mounts (because of the empty array [])
  useEffect(() => {
    // Focus the input element as soon as the component appears on the page
    inputRef.current.focus();
  }, []);

  // This useEffect sets up and cleans up the click outside detector
  useEffect(() => {
    // This function will be called whenever the user clicks anywhere on the page
    const handleClickOutside = (event) => {
      // If the boxRef exists and the clicked element is NOT inside the box
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        // Increase the outsideClicks counter by 1
        setOutsideClicks(prev => prev + 1);
      }
    };

    // Add an event listener to the whole document for mouse down events
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup function: remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // This function starts the stopwatch timer
  const startTimer = () => {
    // Only start if the timer isn't already running
    if (!isRunning) {
      // Set the running state to true
      setIsRunning(true);
      // Calculate the starting point for the timer (handles resume after pause)
      prevTimeRef.current = Date.now() - time;
      // Start a new interval that updates the time every 10 milliseconds
      timerIdRef.current = setInterval(() => {
        // Update the time state with the elapsed time
        setTime(Date.now() - prevTimeRef.current);
      }, 10);
    }
  };

  // This function stops (pauses) the stopwatch timer
  const stopTimer = () => {
    // Only stop if the timer is currently running
    if (isRunning) {
      // Clear the interval so the timer stops updating
      clearInterval(timerIdRef.current);
      // Set the running state to false
      setIsRunning(false);
    }
  };

  // This function resets the stopwatch timer to zero
  const resetTimer = () => {
    // Clear the interval in case it's running
    clearInterval(timerIdRef.current);
    // Set the running state to false
    setIsRunning(false);
    // Reset the time state to zero
    setTime(0);
  };

  // This function formats the time in mm:ss:ms for display
  const formatTime = () => {
    // Calculate the number of minutes
    const minutes = Math.floor(time / 60000);
    // Calculate the number of seconds (after removing minutes)
    const seconds = Math.floor((time % 60000) / 1000);
    // Calculate the number of hundredths of a second (after removing seconds)
    const milliseconds = Math.floor((time % 1000) / 10);

    // Return a string in the format "mm:ss:ms", always two digits each
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
  };

  // This function updates the inputValue state when the user types in the input
  const handleInputChange = (e) => {
    // Set the inputValue state to whatever the user typed
    setInputValue(e.target.value);
  };

  // This function saves the current input value to the savedValues array
  const handleSaveValue = () => {
    // Only save if the input isn't just empty spaces
    if (inputValue.trim()) {
      // Add the current inputValue to the end of the savedValues array
      setSavedValues(prev => [...prev, inputValue]);
      // Clear the input field
      setInputValue('');
      // Focus the input again so the user can keep typing
      inputRef.current.focus();
    }
  };

  // This is the JSX that defines what the component looks like on the page
  return (
    // The main container div with some styling
    <div style={styles.container}>
      {/* The main title of the page */}
      <h2 style={styles.title}>useRef Challenge</h2>

      {/* Section for the auto-focus input */}
      <section style={styles.section}>
        {/* Section title */}
        <h3 style={styles.sectionTitle}>Auto-Focus Input</h3>
        {/* Container for the input and save button */}
        <div style={styles.inputContainer}>
          {/* The input field, connected to inputRef and inputValue */}
          <input
            ref={inputRef} // This connects the input to inputRef so we can focus it
            type="text" // This makes it a text input
            value={inputValue} // The value shown in the input comes from inputValue state
            onChange={handleInputChange} // When the user types, call handleInputChange
            placeholder="Type something here..." // Placeholder text for the input
            style={styles.input} // Apply some styles
          />
          {/* Button to save the current input value */}
          <button style={styles.button} onClick={handleSaveValue}>
            Save Value
          </button>
        </div>

        {/* If there are any saved values, show them in a list */}
        {savedValues.length > 0 && (
          <div style={styles.savedValuesContainer}>
            {/* Title for the saved values list */}
            <h4 style={styles.savedValuesTitle}>Saved Values:</h4>
            {/* List of saved values */}
            <ul style={styles.savedValuesList}>
              {/* Map over each saved value and display it in a list item */}
              {savedValues.map((value, index) => (
                <li key={index} style={styles.savedValueItem}>
                  {value}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Section for the stopwatch */}
      <section style={styles.section}>
        {/* Section title */}
        <h3 style={styles.sectionTitle}>Stopwatch using useRef</h3>
        {/* Container for the stopwatch display and buttons */}
        <div style={styles.stopwatchContainer}>
          {/* Display the formatted time */}
          <div style={styles.timeDisplay}>{formatTime()}</div>
          {/* Group of buttons for controlling the stopwatch */}
          <div style={styles.buttonGroup}>
            {/* Start button, only enabled if not running */}
            <button 
              style={{...styles.button, backgroundColor: isRunning ? '#6c757d' : '#28a745'}} // Change color based on running state
              onClick={startTimer} // Start the timer when clicked
              disabled={isRunning} // Disable if already running
            >
              Start
            </button>
            {/* Stop button, only enabled if running */}
            <button 
              style={{...styles.button, backgroundColor: isRunning ? '#dc3545' : '#6c757d'}} // Change color based on running state
              onClick={stopTimer} // Stop the timer when clicked
              disabled={!isRunning} // Disable if not running
            >
              Stop
            </button>
            {/* Reset button, always enabled */}
            <button 
              style={{...styles.button, backgroundColor: '#007bff'}} // Always blue
              onClick={resetTimer} // Reset the timer when clicked
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      {/* Section for the click outside detector */}
      <section style={styles.section}>
        {/* Section title */}
        <h3 style={styles.sectionTitle}>Click Outside Detector</h3>
        {/* Description for the user */}
        <p style={styles.description}>
          Click anywhere outside the box to increase the counter.
        </p>
        {/* Container for the box and the counter */}
        <div style={styles.detectorContainer}>
          {/* The box we're tracking clicks outside of */}
          <div ref={boxRef} style={styles.box}>
            <p style={styles.boxText}>I'm tracking clicks outside me!</p>
          </div>
          {/* Display the number of outside clicks */}
          <div style={styles.clicksCounter}>
            Outside Clicks: <span style={styles.clicksValue}>{outsideClicks}</span>
          </div>
        </div>
      </section>
    </div>
  );
};

// This object contains all the styles used in the component
const styles = {
  // Style for the main container
  container: {
    maxWidth: '800px', // Maximum width of the container
    margin: '0 auto', // Center the container horizontally
    padding: '20px', // Padding inside the container
    backgroundColor: '#f8f9fa', // Light gray background
    borderRadius: '10px', // Rounded corners
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
    fontFamily: 'Arial, sans-serif', // Font for all text
  },
  // Style for the main title
  title: {
    textAlign: 'center', // Center the text
    color: '#343a40', // Dark gray color
    marginBottom: '30px', // Space below the title
    fontSize: '28px', // Large font size
  },
  // Style for each section
  section: {
    backgroundColor: '#ffffff', // White background
    padding: '20px', // Padding inside the section
    borderRadius: '8px', // Rounded corners
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)', // Light shadow
    marginBottom: '25px', // Space below the section
  },
  // Style for section titles
  sectionTitle: {
    color: '#343a40', // Dark gray color
    borderBottom: '1px solid #e9ecef', // Light border below the title
    paddingBottom: '10px', // Space below the title text
    marginTop: '0', // No space above the title
  },
  // Style for the input and button container
  inputContainer: {
    display: 'flex', // Arrange children in a row
    gap: '10px', // Space between input and button
    marginBottom: '15px', // Space below the container
  },
  // Style for the input field
  input: {
    flex: '1', // Take up remaining space
    padding: '12px', // Padding inside the input
    fontSize: '16px', // Font size
    borderRadius: '5px', // Rounded corners
    border: '1px solid #ced4da', // Light border
    outline: 'none', // No outline when focused
    transition: 'border-color 0.3s', // Smooth border color change
  },
  // Style for all buttons
  button: {
    padding: '10px 15px', // Padding inside the button
    fontSize: '16px', // Font size
    backgroundColor: '#007bff', // Blue background
    color: '#ffffff', // White text
    border: 'none', // No border
    borderRadius: '5px', // Rounded corners
    cursor: 'pointer', // Pointer cursor on hover
    transition: 'background-color 0.3s', // Smooth color change
  },
  // Style for the container of saved values
  savedValuesContainer: {
    marginTop: '15px', // Space above the container
  },
  // Style for the saved values title
  savedValuesTitle: {
    color: '#495057', // Medium gray color
    margin: '10px 0', // Space above and below the title
  },
  // Style for the list of saved values
  savedValuesList: {
    backgroundColor: '#f8f9fa', // Light gray background
    borderRadius: '5px', // Rounded corners
    padding: '10px', // Padding inside the list
    margin: '0', // No margin
  },
  // Style for each saved value item
  savedValueItem: {
    padding: '8px 0', // Space above and below each item
    borderBottom: '1px solid #e9ecef', // Light border below each item
    listStyleType: 'none', // No bullet points
  },
  // Style for the stopwatch container
  stopwatchContainer: {
    display: 'flex', // Arrange children in a column
    flexDirection: 'column', // Vertical layout
    alignItems: 'center', // Center horizontally
  },
  // Style for the time display
  timeDisplay: {
    fontSize: '36px', // Large font size
    fontFamily: 'monospace', // Monospace font for numbers
    backgroundColor: '#343a40', // Dark background
    color: '#ffffff', // White text
    padding: '15px 30px', // Padding inside the display
    borderRadius: '8px', // Rounded corners
    marginBottom: '20px', // Space below the display
    width: '200px', // Fixed width
    textAlign: 'center', // Center the text
  },
  // Style for the group of stopwatch buttons
  buttonGroup: {
    display: 'flex', // Arrange buttons in a row
    gap: '15px', // Space between buttons
  },
  // Style for the description text
  description: {
    color: '#6c757d', // Gray color
    marginBottom: '15px', // Space below the description
    fontStyle: 'italic', // Italic text
  },
  // Style for the detector container
  detectorContainer: {
    display: 'flex', // Arrange children in a column
    flexDirection: 'column', // Vertical layout
    alignItems: 'center', // Center horizontally
    gap: '20px', // Space between children
  },
  // Style for the box that detects outside clicks
  box: {
    width: '250px', // Fixed width
    height: '150px', // Fixed height
    backgroundColor: '#007bff', // Blue background
    color: '#ffffff', // White text
    display: 'flex', // Center content
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
    borderRadius: '8px', // Rounded corners
    cursor: 'pointer', // Pointer cursor on hover
    transition: 'transform 0.3s, box-shadow 0.3s', // Smooth transitions
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Shadow for depth
  },
  // Style for the text inside the box
  boxText: {
    textAlign: 'center', // Center the text
    padding: '10px', // Padding inside the text
    fontSize: '18px', // Font size
    fontWeight: 'bold', // Bold text
  },
  // Style for the outside clicks counter
  clicksCounter: {
    fontSize: '18px', // Font size
    padding: '10px 15px', // Padding inside the counter
    backgroundColor: '#e9ecef', // Light gray background
    borderRadius: '5px', // Rounded corners
    color: '#343a40', // Dark gray text
  },
  // Style for the number in the outside clicks counter
  clicksValue: {
    fontWeight: 'bold', // Bold number
    color: '#dc3545', // Red color
  },
};

// Export the UseRefChallenge component so it can be used in other files
export default UseRefChallenge;