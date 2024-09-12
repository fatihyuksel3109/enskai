import React from 'react';
import AddNotificationForm from '../components/AddNotificationForm';
import { NotificationProvider } from '../contexts/NotificationContext';

const HomePage = () => {

  return (
    <NotificationProvider>
      <div style={{ padding: 20 }}>
        <h1>Notification System</h1>
        <AddNotificationForm />
      </div>
    </NotificationProvider>
  );
};

export default HomePage;
