import React from 'react';
import AddNotificationButton from '../components/AddNotificationButton';
import { NotificationProvider } from '../contexts/NotificationContext';

const HomePage = () => {

  return (
    <NotificationProvider>
      <div style={{ padding: 20 }}>
        <h1>Notification System</h1>
        <AddNotificationButton />
      </div>
    </NotificationProvider>
  );
};

export default HomePage;
