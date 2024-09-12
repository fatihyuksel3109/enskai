import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CssBaseline } from '@mui/material'; 

const root = ReactDOM.createRoot(document.getElementById('root')); // Only pass 'root' here

root.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode> // No need to pass 'document.getElementById('root')' here
);
