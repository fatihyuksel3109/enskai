// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { NotificationProvider } from './contexts/NotificationContext';
import Header from './components/Header';

function App() {
  return (
    <NotificationProvider>
      <Router>
        <Header />
        <Routes>
        </Routes>
      </Router>
    </NotificationProvider>
  );
}

export default App;
