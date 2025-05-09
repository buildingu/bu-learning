import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';    // ← this is the only import

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
