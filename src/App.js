import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotificationProvider } from './contexts/NotificationContext';
import Header from './components/Header';
import AddNotificationButton from './components/AddNotificationButton';

function App() {
  return (
    <NotificationProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<AddNotificationButton />} />
        </Routes>
      </Router>
    </NotificationProvider>
  );
}

export default App;
