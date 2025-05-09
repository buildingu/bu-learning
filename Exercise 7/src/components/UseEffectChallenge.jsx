import React, { useState, useEffect } from 'react';

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

const UseEffectChallenge = () => {
  // Window size state
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Countdown timer state
  const [countdown, setCountdown] = useState(10);
  const [countdownActive, setCountdownActive] = useState(false);

  // Data fetching states
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  // Typing indicator states
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Cleanup demo states
  const [showCleanupDemo, setShowCleanupDemo] = useState(true);
  const [effectCount, setEffectCount] = useState(0);

  // Effect for window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array means this runs once on mount and cleanup on unmount

  // Effect for countdown timer
  useEffect(() => {
    if (!countdownActive) return;

    if (countdown <= 0) {
      setCountdownActive(false);
      return;
    }

    const timerId = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    // Cleanup function to clear timeout
    return () => {
      clearTimeout(timerId);
    };
  }, [countdown, countdownActive]);

  // Effect for data fetching
  useEffect(() => {
    if (fetchTrigger === 0) return;

    setLoading(true);
    setError(null);
    setData(null);

    // Simulate API call
    const fetchData = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock data
        const mockData = {
          id: Math.floor(Math.random() * 1000),
          title: `Item ${Math.floor(Math.random() * 100)}`,
          description: `This is a randomly generated description for item ${Math.floor(Math.random() * 100)}`,
          timestamp: new Date().toISOString(),
        };

        setData(mockData);
        setLoading(false);
      } catch (err) {
        setError('An error occurred while fetching data');
        setLoading(false);
      }
    };

    fetchData();

    // No cleanup needed for this effect
  }, [fetchTrigger]);

  // Effect for typing indicator
  useEffect(() => {
    if (inputText.length === 0) {
      setIsTyping(false);
      return;
    }

    setIsTyping(true);

    const typingTimer = setTimeout(() => {
      setIsTyping(false);
    }, 1000);

    // Cleanup function to clear the timeout
    return () => {
      clearTimeout(typingTimer);
    };
  }, [inputText]);

  // Effect for cleanup demo
  useEffect(() => {
    if (!showCleanupDemo) return;

    setEffectCount(prev => prev + 1);

    const interval = setInterval(() => {
      setEffectCount(prev => prev + 1);
    }, 2000);

    console.log('Effect setup - interval created');

    // Cleanup function
    return () => {
      clearInterval(interval);
      console.log('Effect cleanup - interval cleared');
    };
  }, [showCleanupDemo]);

  // Handler functions
  const handleStartCountdown = () => {
    setCountdown(10);
    setCountdownActive(true);
  };

  const handleFetchData = () => {
    setFetchTrigger(prev => prev + 1);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const toggleCleanupDemo = () => {
    setShowCleanupDemo(prev => !prev);
    if (showCleanupDemo) {
      setEffectCount(0);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>useEffect Challenge</h2>

      {/* Window Resize Tracker */}
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

      {/* Countdown Timer */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Countdown Timer</h3>
        <div style={styles.countdownContainer}>
          <div style={styles.countdownDisplay}>
            {countdown === 0 ? (
              <span style={styles.countdownComplete}>Time's up!</span>
            ) : (
              <span style={styles.countdownValue}>{countdown}</span>
            )}
          </div>
          <button 
            style={styles.button} 
            onClick={handleStartCountdown}
            disabled={countdownActive}
          >
            {countdownActive ? 'Counting Down...' : 'Start Countdown'}
          </button>
        </div>
      </section>

      {/* Data Fetching Demo */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Data Fetching with useEffect</h3>
        <div style={styles.fetchContainer}>
          <button 
            style={{...styles.button, width: '150px'}} 
            onClick={handleFetchData}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Fetch Data'}
          </button>

          <div style={styles.dataDisplay}>
            {loading && <div style={styles.loader}></div>}
            
            {error && <div style={styles.error}>{error}</div>}
            
            {data && !loading && !error && (
              <div style={styles.dataContent}>
                <h4 style={styles.dataTitle}>{data.title}</h4>
                <p style={styles.dataDescription}>{data.description}</p>
                <p style={styles.dataTimestamp}>Fetched at: {data.timestamp}</p>
              </div>
            )}

            {!data && !loading && !error && fetchTrigger === 0 && (
              <p style={styles.noData}>Click the button to fetch data</p>
            )}

            {!data && !loading && !error && fetchTrigger > 0 && (
              <p style={styles.noData}>No data available</p>
            )}
          </div>
        </div>
      </section>

      {/* Typing Indicator */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Typing Indicator</h3>
        <div style={styles.typingContainer}>
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Type something..."
            style={styles.input}
          />
          
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

      {/* Cleanup Demo */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>useEffect Cleanup Demo</h3>
        <div style={styles.cleanupContainer}>
          <button 
            style={{
              ...styles.button, 
              backgroundColor: showCleanupDemo ? '#dc3545' : '#28a745'
            }} 
            onClick={toggleCleanupDemo}
          >
            {showCleanupDemo ? 'Hide Component' : 'Show Component'}
          </button>
          
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
  description: {
    color: '#6c757d',
    fontStyle: 'italic',
    margin: '10px 0',
  },
  windowSizeDisplay: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    padding: '20px',
    backgroundColor: '#f1f3f5',
    borderRadius: '8px',
  },
  sizeItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  sizeLabel: {
    fontSize: '14px',
    color: '#6c757d',
    marginBottom: '5px',
  },
  sizeValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#343a40',
  },
  countdownContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
  },
  countdownDisplay: {
    width: '100px',
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#343a40',
    borderRadius: '50%',
    color: '#ffffff',
  },
  countdownValue: {
    fontSize: '36px',
    fontWeight: 'bold',
  },
  countdownComplete: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#ffc107',
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
  fetchContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  dataDisplay: {
    width: '100%',
    minHeight: '150px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    padding: '15px',
    position: 'relative',
  },
  loader: {
    width: '40px',
    height: '40px',
    margin: '30px auto',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #007bff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  error: {
    color: '#dc3545',
    textAlign: 'center',
    padding: '20px',
    fontWeight: 'bold',
  },
  noData: {
    color: '#6c757d',
    textAlign: 'center',
    padding: '20px',
    fontStyle: 'italic',
  },
  dataContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  dataTitle: {
    color: '#343a40',
    margin: '0',
    fontSize: '20px',
  },
  dataDescription: {
    color: '#495057',
    margin: '0',
  },
  dataTimestamp: {
    color: '#6c757d',
    fontSize: '12px',
    margin: '10px 0 0 0',
    fontStyle: 'italic',
  },
  typingContainer: {
    position: 'relative',
    marginBottom: '30px',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ced4da',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  typingIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    position: 'absolute',
    bottom: '-25px',
    left: '10px',
  },
  typingDot: {
    width: '8px',
    height: '8px',
    backgroundColor: '#007bff',
    borderRadius: '50%',
    animation: 'blink 1s infinite',
  },
  typingText: {
    color: '#007bff',
    fontSize: '14px',
    fontStyle: 'italic',
  },
  cleanupContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  cleanupDemo: {
    width: '100%',
    backgroundColor: '#e9ecef',
    borderRadius: '8px',
    padding: '15px',
    marginTop: '10px',
  },
  cleanupText: {
    color: '#495057',
    margin: '10px 0',
  },
    cleanupCount: {
      fontWeight: 'bold',
      color: '#007bff',
    },
  };

export default UseEffectChallenge;