// App.jsx is basically used later in the index.jsx file, it allows us to run the .jsx component files.

import UseStateChallenge from "./components/UseStateChallenge.jsx";
import UseRefChallenge from "./components/UseRefChallenge.jsx";
import UseEffectChallenge from "./components/UseEffectChallenge.jsx";
import UseContextChallenge from "./components/useContextChallenge/UseContext.jsx";
import UseReducerChallenge from "./components/UseReducerChallenge.jsx";
import UseMemoChallenge from "./components/UseMemoChallenge.jsx";
import FinalChallenge    from "./components/FinalChallenge.jsx";
function App() {
  // VITE_REACT_CHALLENGE comes from the npm script, allows changing demos without touching code.
  // This means I can run any of the challenges by just changing the npm script in package.json
  const hookName = import.meta.env.VITE_REACT_CHALLENGE;   // set by your npm script;

  // switch statement to determine which challenge to run
  // I know this from C#, it's basically if-statements
  // but more readable and easier to maintain
  switch (hookName) {
    // to run any of them, do: "npm run dev:<hookName>"
    // e.g. "npm run dev:useState" will run the useState challenge
    case "useState":   return <UseStateChallenge/>;
    case "useRef":     return <UseRefChallenge/>;
    case "useEffect":  return <UseEffectChallenge/>;
    case "useContext": return <UseContextChallenge/>;
    case "useReducer": return <UseReducerChallenge/>;
    case "useMemo":    return <UseMemoChallenge/>;
    case "final":      return <FinalChallenge/>;
    // by default, the app will return an error message
    // if the hook name is not recognized
    default:
      return (
        // color: white. This block is for the error message
        // when the hook name is not recognized
        // using <code> for code formatting
        <p style={{ color: "#fff", padding: "2rem", fontFamily: "sans-serif" }}>
          ERROR: Please specify a valid hook challenge<br />
          (e.g.&nbsp;<code>npm run dev:useState</code>)
        </p> // use "&nbsp;" for space, had issues with spaces in the past.
      );
  }
}

// export default App; will be used in the index.jsx file
// to render the App component in the root element
export default App;
