import UseStateChallenge from "./components/1.UseStateChallenge";
import UseRefChallenge from "./components/2.UseRefChallenge";
import UseEffectChallenge from "./components/3.UseEffectChallenge";
import UseContextChallenge from "./components/4.UseContextChallenge/UseContext";
import UseReducerChallenge from "./components/5.UseReducerChallenge";
import UseMemoChallenge from "./components/6.UseMemoChallenge";
import FinalChallenge from "./components/7.FinalChallenge";
import { Routes, Route, Link } from "react-router-dom";
import "./index.css";
import { AuthContextProvider } from "./components/4.UseContextChallenge/AuthContext";

function App() {
  return (
    <div className="app">
      <AuthContextProvider>
      <header>
        <nav>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/use-state">useState</Link></li>
            <li><Link to="/use-ref">useRef</Link></li>
            <li><Link to="/use-effect">useEffect</Link></li>
            <li><Link to="/use-context">useContext</Link></li>
            <li><Link to="/use-reducer">useReducer</Link></li>
            <li><Link to="/use-memo">useMemo</Link></li>
            <li><Link to="/final">Final Challenge</Link></li>
          </ul>
        </nav>
      </header>
      <Routes> {/* BONUS: Route tag from react-router-dom, this tag is used to define the routes for the app to use in navigation links */}
        <Route path="/use-state" element={<UseStateChallenge />} />
        <Route path="/use-ref" element={<UseRefChallenge />} />
        <Route path="/use-effect" element={<UseEffectChallenge />} />
        <Route path="/use-context" element={<UseContextChallenge />} />
        <Route path="/use-reducer" element={<UseReducerChallenge />} />
        <Route path="/use-memo" element={<UseMemoChallenge />} />
        <Route path="/final" element={<FinalChallenge />} />
        <Route path="*" element={<div><h1>Select a Challenge</h1></div>} />
      </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
