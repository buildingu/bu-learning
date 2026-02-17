import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import UseStateChallenge from "./components/1.UseStateChallenge";
import UseRefChallenge from "./components/2.UseRefChallenge";
import UseEffectChallenge from "./components/3.UseEffectChallenge";
import UseContextChallenge from "./components/4.UseContextChallenge/UseContext";
import { AuthContextProvider } from "./components/4.UseContextChallenge/AuthContext";
import UseReducerChallenge from "./components/5.UseReducerChallenge";
import UseMemoChallenge from "./components/6.UseMemoChallenge";
import FinalChallenge from "./components/7.FinalChallenge";

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* Navigation Menu */}
        <nav style={{ 
          padding: '20px', 
          backgroundColor: '#282c34', 
          marginBottom: '20px' 
        }}>
          <h2 style={{ color: 'white', marginBottom: '15px' }}>React Hooks Challenges</h2>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', padding: '8px 15px', backgroundColor: '#61dafb', borderRadius: '5px' }}>Home</Link>
            <Link to="/useState" style={{ color: 'white', textDecoration: 'none', padding: '8px 15px', backgroundColor: '#61dafb', borderRadius: '5px' }}>useState</Link>
            <Link to="/useRef" style={{ color: 'white', textDecoration: 'none', padding: '8px 15px', backgroundColor: '#61dafb', borderRadius: '5px' }}>useRef</Link>
            <Link to="/useEffect" style={{ color: 'white', textDecoration: 'none', padding: '8px 15px', backgroundColor: '#61dafb', borderRadius: '5px' }}>useEffect</Link>
            <Link to="/useContext" style={{ color: 'white', textDecoration: 'none', padding: '8px 15px', backgroundColor: '#61dafb', borderRadius: '5px' }}>useContext</Link>
            <Link to="/useReducer" style={{ color: 'white', textDecoration: 'none', padding: '8px 15px', backgroundColor: '#61dafb', borderRadius: '5px' }}>useReducer</Link>
            <Link to="/useMemo" style={{ color: 'white', textDecoration: 'none', padding: '8px 15px', backgroundColor: '#61dafb', borderRadius: '5px' }}>useMemo</Link>
            <Link to="/final" style={{ color: 'white', textDecoration: 'none', padding: '8px 15px', backgroundColor: '#61dafb', borderRadius: '5px' }}>Final</Link>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/useState" element={<UseStateChallenge />} />
          <Route path="/useRef" element={<UseRefChallenge />} />
          <Route path="/useEffect" element={<UseEffectChallenge />} />
          <Route path="/useContext" element={
            <AuthContextProvider>
              <UseContextChallenge />
            </AuthContextProvider>
          } />
          <Route path="/useReducer" element={<UseReducerChallenge />} />
          <Route path="/useMemo" element={<UseMemoChallenge />} />
          <Route path="/final" element={<FinalChallenge />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to React Hooks Challenges!</h1>
      <p>Use the navigation above to explore each challenge.</p>
    </div>
  );
}

export default App;