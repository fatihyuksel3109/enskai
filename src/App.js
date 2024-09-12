// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotificationProvider } from './contexts/NotificationContext';
import Header from './components/Header';
import AddNotificationForm from './components/AddNotificationForm';

function App() {
  return (
    <NotificationProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<AddNotificationForm />} />
        </Routes>
      </Router>
    </NotificationProvider>
  );
}

export default App;
