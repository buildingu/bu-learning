// index.jsx is what allows us to run the App.jsx file

// import React and ReactDOM from the react and react-dom packages
import React from 'react'; 
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// import the App component from the App.jsx file
// the 'body' equivalent in HTML
// the 'root' element is where the App component will be rendered
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
