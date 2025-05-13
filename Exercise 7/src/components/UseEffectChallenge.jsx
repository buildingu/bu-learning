// Import React and two hooks: useState (for state) and useEffect (for side effects)
import React, { useState, useEffect } from 'react';

// This is a multi-part challenge component to demonstrate useEffect in different scenarios

/**
 * Challenge: Create a component that demonstrates useEffect in multiple scenarios
 * 
 * Requirements:
 * 1. Implement a window resize tracker that updates when the window size changes
 * 2. Create a countdown timer that runs once when component mounts
 * 3. Add a data fetching simulation with loading states
 * 4. Implement a "typing indicator" that appears when the user types and disappears after 1 second of inactivity
 * 5. Create a cleanup demo to show how useEffect's cleanup function works
 */

// Define the main functional component
const UseEffectChallenge = () => {
  // Create a state variable to store the window's width and height
  // useState initializes it with the current window size
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth, // current window width
    height: window.innerHeight, // current window height
  });

  // State for the countdown timer value (starts at 10)
  const [countdown, setCountdown] = useState(10);
  // State to track if the countdown is active or not
  const [countdownActive, setCountdownActive] = useState(false);

  // State for fetched data (null means no data yet)
  const [data, setData] = useState(null);
  // State to show if data is loading
  const [loading, setLoading] = useState(false);
  // State to store any error message from fetching
  const [error, setError] = useState(null);
  // State to trigger a new fetch (incrementing this value triggers useEffect)
  const [fetchTrigger, setFetchTrigger] = useState(0);

  // State for the text input value
  const [inputText, setInputText] = useState('');
  // State to show/hide the typing indicator
  const [isTyping, setIsTyping] = useState(false);

  // State to show/hide the cleanup demo section
  const [showCleanupDemo, setShowCleanupDemo] = useState(true);
  // State to count how many times the effect has run
  const [effectCount, setEffectCount] = useState(0);

  // useEffect to track window resizing
  useEffect(() => {
    // Define a function to update the windowSize state when the window is resized
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth, // update width
        height: window.innerHeight, // update height
      });
    };

    // Add the resize event listener when the component mounts
    window.addEventListener('resize', handleResize);

    // Cleanup function: remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty array: this effect runs only once when the component mounts

  // useEffect for the countdown timer
  useEffect(() => {
    // If countdown is not active, do nothing
    if (!countdownActive) return;

    // If countdown reaches 0, stop the countdown
    if (countdown <= 0) {
      setCountdownActive(false);
      return;
    }

    // Set a timeout to decrease the countdown by 1 after 1 second (1000ms)
    const timerId = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    // Cleanup: clear the timeout if the effect runs again or component unmounts
    return () => {
      clearTimeout(timerId);
    };
  }, [countdown, countdownActive]); // Runs whenever countdown or countdownActive changes

  // useEffect for simulating data fetching
  useEffect(() => {
    // If fetchTrigger is 0, don't fetch (means user hasn't clicked yet)
    if (fetchTrigger === 0) return;

    // Set loading state to true, clear previous error and data
    setLoading(true);
    setError(null);
    setData(null);

    // Define an async function to simulate fetching data
    const fetchData = async () => {
      try {
        // Wait 1.5 seconds to simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Create some mock data with random values
        const mockData = {
          id: Math.floor(Math.random() * 1000),
          title: `Item ${Math.floor(Math.random() * 100)}`,
          description: `This is a randomly generated description for item ${Math.floor(Math.random() * 100)}`,
          timestamp: new Date().toISOString(),
        };

        // Set the data state with the mock data
        setData(mockData);
        // Set loading to false since we're done
        setLoading(false);
      } catch (err) {
        // If there's an error, set the error state
        setError('An error occurred while fetching data');
        setLoading(false);
      }
    };

    // Call the fetchData function
    fetchData();

    // No cleanup needed for this effect
  }, [fetchTrigger]); // Runs whenever fetchTrigger changes

  // useEffect for the typing indicator
  useEffect(() => {
    // If the input is empty, hide the typing indicator and exit
    if (inputText.length === 0) {
      setIsTyping(false);
      return;
    }

    // Show the typing indicator
    setIsTyping(true);

    // Set a timeout to hide the typing indicator after 1 second of inactivity
    const typingTimer = setTimeout(() => {
      setIsTyping(false);
    }, 1000);

    // Cleanup: clear the timeout if the effect runs again or component unmounts
    return () => {
      clearTimeout(typingTimer);
    };
  }, [inputText]); // Runs whenever inputText changes

  // useEffect for the cleanup demo
  useEffect(() => {
    // If the cleanup demo is hidden, do nothing
    if (!showCleanupDemo) return;

    // Increment the effectCount state by 1
    setEffectCount(prev => prev + 1);

    // Set up an interval to increment effectCount every 2 seconds
    const interval = setInterval(() => {
      setEffectCount(prev => prev + 1);
    }, 2000);

    // Log to the console when the interval is set up
    console.log('Effect setup - interval created');

    // Cleanup: clear the interval and log to the console when the effect is cleaned up
    return () => {
      clearInterval(interval);
      console.log('Effect cleanup - interval cleared');
    };
  }, [showCleanupDemo]); // Runs whenever showCleanupDemo changes

  // Handler function to start the countdown timer
  const handleStartCountdown = () => {
    setCountdown(10); // Reset countdown to 10
    setCountdownActive(true); // Start the countdown
  };

  // Handler function to trigger data fetching
  const handleFetchData = () => {
    setFetchTrigger(prev => prev + 1); // Increment fetchTrigger to trigger useEffect
  };

  // Handler function for input changes (typing)
  const handleInputChange = (e) => {
    setInputText(e.target.value); // Update inputText state with the new value
  };

  // Handler to show/hide the cleanup demo and reset the effect count if hiding
  const toggleCleanupDemo = () => {
    setShowCleanupDemo(prev => !prev); // Toggle showCleanupDemo state
    if (showCleanupDemo) {
      setEffectCount(0); // Reset effectCount if hiding the demo
    }
  };

  // The component's rendered UI
  return (
    // Main container div with styling
    <div style={styles.container}>
      {/* Title */}
      <h2 style={styles.title}>useEffect Challenge</h2>

      {/* Window Resize Tracker Section */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Window Resize Tracker</h3>
        <div style={styles.windowSizeDisplay}>
          <div style={styles.sizeItem}>
            <span style={styles.sizeLabel}>Width:</span>
            <span style={styles.sizeValue}>{windowSize.width}px</span>
          </div>
          <div style={styles.sizeItem}>
            <span style={styles.sizeLabel}>Height:</span>
            <span style={styles.sizeValue}>{windowSize.height}px</span>
          </div>
        </div>
        <p style={styles.description}>Resize your browser window to see the values update in real-time!</p>
      </section>

      {/* Countdown Timer Section */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Countdown Timer</h3>
        <div style={styles.countdownContainer}>
          <div style={styles.countdownDisplay}>
            {/* Show "Time's up!" if countdown is 0, otherwise show the countdown value */}
            {countdown === 0 ? (
              <span style={styles.countdownComplete}>Time's up!</span>
            ) : (
              <span style={styles.countdownValue}>{countdown}</span>
            )}
          </div>
          <button 
            style={styles.button} 
            onClick={handleStartCountdown}
            disabled={countdownActive} // Disable button if countdown is running
          >
            {countdownActive ? 'Counting Down...' : 'Start Countdown'}
          </button>
        </div>
      </section>

      {/* Data Fetching Demo Section */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Data Fetching with useEffect</h3>
        <div style={styles.fetchContainer}>
          <button 
            style={{...styles.button, width: '150px'}} 
            onClick={handleFetchData}
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Loading...' : 'Fetch Data'}
          </button>

          <div style={styles.dataDisplay}>
            {/* Show loader if loading */}
            {loading && <div style={styles.loader}></div>}
            
            {/* Show error message if there is an error */}
            {error && <div style={styles.error}>{error}</div>}
            
            {/* Show fetched data if available and not loading or error */}
            {data && !loading && !error && (
              <div style={styles.dataContent}>
                <h4 style={styles.dataTitle}>{data.title}</h4>
                <p style={styles.dataDescription}>{data.description}</p>
                <p style={styles.dataTimestamp}>Fetched at: {data.timestamp}</p>
              </div>
            )}

            {/* Show message before any fetch */}
            {!data && !loading && !error && fetchTrigger === 0 && (
              <p style={styles.noData}>Click the button to fetch data</p>
            )}

            {/* Show message if no data after fetch */}
            {!data && !loading && !error && fetchTrigger > 0 && (
              <p style={styles.noData}>No data available</p>
            )}
          </div>
        </div>
      </section>

      {/* Typing Indicator Section */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Typing Indicator</h3>
        <div style={styles.typingContainer}>
          {/* Text input for typing */}
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Type something..."
            style={styles.input}
          />
          {/* Show typing indicator if isTyping is true */}
          {isTyping && (
            <div style={styles.typingIndicator}>
              <span style={styles.typingDot}></span>
              <span style={styles.typingDot}></span>
              <span style={styles.typingDot}></span>
              <span style={styles.typingText}>Typing...</span>
            </div>
          )}
        </div>
        <p style={styles.description}>
          The typing indicator appears when you type and disappears after 1 second of inactivity.
        </p>
      </section>

      {/* Cleanup Demo Section */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>useEffect Cleanup Demo</h3>
        <div style={styles.cleanupContainer}>
          {/* Button to show/hide the cleanup demo */}
          <button 
            style={{
              ...styles.button, 
              backgroundColor: showCleanupDemo ? '#dc3545' : '#28a745'
            }} 
            onClick={toggleCleanupDemo}
          >
            {showCleanupDemo ? 'Hide Component' : 'Show Component'}
          </button>
          
          {/* Show the cleanup demo if enabled */}
          {showCleanupDemo && (
            <div style={styles.cleanupDemo}>
              <p style={styles.cleanupText}>
                This component has an effect that runs every 2 seconds.
              </p>
              <p style={styles.cleanupText}>
                Effect has run <span style={styles.cleanupCount}>{effectCount}</span> times.
              </p>
              <p style={styles.cleanupText}>
                Check the console for cleanup messages when you hide this component.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// Define a styles object for inline styling
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
    color: '#343a40', // Dark gray color
    marginBottom: '30px', // Space below the title
    fontSize: '28px', // Large font size
  },
  section: {
    backgroundColor: '#ffffff', // White background for sections
    padding: '20px', // Padding inside the section
    borderRadius: '8px', // Rounded corners
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)', // Light shadow
    marginBottom: '25px', // Space below the section
  },
  sectionTitle: {
    color: '#343a40', // Section title color
    borderBottom: '1px solid #e9ecef', // Bottom border
    paddingBottom: '10px', // Space below the title
    marginTop: '0', // No top margin
  },
  description: {
    color: '#6c757d', // Muted text color
    fontStyle: 'italic', // Italic text
    margin: '10px 0', // Vertical margin
  },
  windowSizeDisplay: {
    display: 'flex', // Use flexbox
    justifyContent: 'center', // Center items horizontally
    gap: '30px', // Space between items
    padding: '20px', // Padding inside
    backgroundColor: '#f1f3f5', // Light gray background
    borderRadius: '8px', // Rounded corners
  },
  sizeItem: {
    display: 'flex', // Use flexbox
    flexDirection: 'column', // Stack items vertically
    alignItems: 'center', // Center items horizontally
  },
  sizeLabel: {
    fontSize: '14px', // Small font size
    color: '#6c757d', // Muted color
    marginBottom: '5px', // Space below label
  },
  sizeValue: {
    fontSize: '24px', // Large font size
    fontWeight: 'bold', // Bold text
    color: '#343a40', // Dark color
  },
  countdownContainer: {
    display: 'flex', // Use flexbox
    flexDirection: 'column', // Stack items vertically
    alignItems: 'center', // Center items horizontally
    gap: '15px', // Space between items
  },
  countdownDisplay: {
    width: '100px', // Width of the countdown circle
    height: '100px', // Height of the countdown circle
    display: 'flex', // Use flexbox
    justifyContent: 'center', // Center content horizontally
    alignItems: 'center', // Center content vertically
    backgroundColor: '#343a40', // Dark background
    borderRadius: '50%', // Make it a circle
    color: '#ffffff', // White text
  },
  countdownValue: {
    fontSize: '36px', // Large font size
    fontWeight: 'bold', // Bold text
  },
  countdownComplete: {
    fontSize: '16px', // Medium font size
    fontWeight: 'bold', // Bold text
    color: '#ffc107', // Yellow color
  },
  button: {
    padding: '10px 15px', // Padding inside the button
    fontSize: '16px', // Font size
    backgroundColor: '#007bff', // Blue background
    color: '#ffffff', // White text
    border: 'none', // No border
    borderRadius: '5px', // Rounded corners
    cursor: 'pointer', // Pointer cursor on hover
    transition: 'background-color 0.3s', // Smooth background color transition
  },
  fetchContainer: {
    display: 'flex', // Use flexbox
    flexDirection: 'column', // Stack items vertically
    alignItems: 'center', // Center items horizontally
    gap: '20px', // Space between items
  },
  dataDisplay: {
    width: '100%', // Full width
    minHeight: '150px', // Minimum height
    backgroundColor: '#f8f9fa', // Light background
    borderRadius: '8px', // Rounded corners
    padding: '15px', // Padding inside
    position: 'relative', // For positioning loader
  },
  loader: {
    width: '40px', // Loader size
    height: '40px',
    margin: '30px auto', // Center loader
    border: '4px solid #f3f3f3', // Light border
    borderTop: '4px solid #007bff', // Blue top border for spinner effect
    borderRadius: '50%', // Make it a circle
    animation: 'spin 1s linear infinite', // Spin animation
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' }, // Start at 0 degrees
    '100%': { transform: 'rotate(360deg)' }, // End at 360 degrees
  },
  error: {
    color: '#dc3545', // Red color for errors
    textAlign: 'center', // Center text
    padding: '20px', // Padding
    fontWeight: 'bold', // Bold text
  },
  noData: {
    color: '#6c757d', // Muted color
    textAlign: 'center', // Center text
    padding: '20px', // Padding
    fontStyle: 'italic', // Italic text
  },
  dataContent: {
    display: 'flex', // Use flexbox
    flexDirection: 'column', // Stack items vertically
    gap: '10px', // Space between items
  },
  dataTitle: {
    color: '#343a40', // Dark color
    margin: '0', // No margin
    fontSize: '20px', // Medium font size
  },
  dataDescription: {
    color: '#495057', // Gray color
    margin: '0', // No margin
  },
  dataTimestamp: {
    color: '#6c757d', // Muted color
    fontSize: '12px', // Small font
    margin: '10px 0 0 0', // Margin above
    fontStyle: 'italic', // Italic text
  },
  typingContainer: {
    position: 'relative', // For positioning typing indicator
    marginBottom: '30px', // Space below
  },
  input: {
    width: '100%', // Full width
    padding: '12px', // Padding inside
    fontSize: '16px', // Font size
    borderRadius: '5px', // Rounded corners
    border: '1px solid #ced4da', // Light border
    outline: 'none', // No outline
    transition: 'border-color 0.3s', // Smooth border color transition
  },
  typingIndicator: {
    display: 'flex', // Use flexbox
    alignItems: 'center', // Center items vertically
    gap: '5px', // Space between dots and text
    position: 'absolute', // Position below the input
    bottom: '-25px', // 25px below the input
    left: '10px', // 10px from the left
  },
  typingDot: {
    width: '8px', // Dot size
    height: '8px',
    backgroundColor: '#007bff', // Blue color
    borderRadius: '50%', // Make it a circle
    animation: 'blink 1s infinite', // Blinking animation
  },
  typingText: {
    color: '#007bff', // Blue color
    fontSize: '14px', // Small font
    fontStyle: 'italic', // Italic text
  },
  cleanupContainer: {
    display: 'flex', // Use flexbox
    flexDirection: 'column', // Stack items vertically
    alignItems: 'center', // Center items horizontally
    gap: '20px', // Space between items
  },
  cleanupDemo: {
    width: '100%', // Full width
    backgroundColor: '#e9ecef', // Light gray background
    borderRadius: '8px', // Rounded corners
    padding: '15px', // Padding inside
    marginTop: '10px', // Space above
  },
  cleanupText: {
    color: '#495057', // Gray color
    margin: '10px 0', // Vertical margin
  },
  cleanupCount: {
    fontWeight: 'bold', // Bold text
    color: '#007bff', // Blue color
  },
};

// Export the component so it can be used in other files
export default UseEffectChallenge;