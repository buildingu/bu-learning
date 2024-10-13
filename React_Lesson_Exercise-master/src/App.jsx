import UseStateChallenge from "./components/1.UseStateChallenge";
import UseRefChallenge from "./components/2.UseRefChallenge";
import UseEffectChallenge from "./components/3.UseEffectChallenge";
import UseContextChallenge from "./components/4.UseContextChallenge/UseContext";
import UseReducerChallenge from "./components/5.UseReducerChallenge";
import UseMemoChallenge from "./components/6.UseMemoChallenge";
import FinalChallenge from "./components/7.FinalChallenge";

function App() {
  const hookName = import.meta.env.VITE_REACT_CHALLENGE;

  switch (hookName) {
    case "useState":
      return <UseStateChallenge />;
    case "useRef":
      return <UseRefChallenge />;
    case "useEffect":
      return <UseEffectChallenge />;
    case "useContext":
      return <UseContextChallenge />;
    case "useReducer":
      return <UseReducerChallenge />;
    case "useMemo":
      return <UseMemoChallenge />;
    case "final":
      return <FinalChallenge />;
    default:
      return <p>ERROR: Please specify a valid hook challenge (e.g., npm run dev:useState).</p>;
  }
}

export default App;
