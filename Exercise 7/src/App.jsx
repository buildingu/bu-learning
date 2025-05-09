import UseStateChallenge from "./components/UseStateChallenge.jsx";
import UseRefChallenge from "./components/UseRefChallenge.jsx";
import UseEffectChallenge from "./components/UseEffectChallenge.jsx";
import UseContextChallenge from "./components/useContextChallenge/UseContext.jsx";
import UseReducerChallenge from "./components/UseReducerChallenge.jsx";
import UseMemoChallenge from "./components/UseMemoChallenge.jsx";
import FinalChallenge    from "./components/FinalChallenge.jsx";
function App() {
  const hookName = import.meta.env.VITE_REACT_CHALLENGE;   // set by your npm script

  switch (hookName) {
    case "useState":   return <UseStateChallenge />;
    case "useRef":     return <UseRefChallenge   />;
    case "useEffect":  return <UseEffectChallenge />;
    case "useContext": return <UseContextChallenge />;
    case "useReducer": return <UseReducerChallenge />;
    case "useMemo":    return <UseMemoChallenge  />;
    case "final":      return <FinalChallenge    />;
    default:
      return (
        <p style={{ color: "#fff", padding: "2rem", fontFamily: "sans-serif" }}>
          ERROR: Please specify a valid hook challenge<br />
          (e.g.&nbsp;<code>npm run dev:useState</code>)
        </p>
      );
  }
}

export default App;
