// src/contexts/NotificationContext.js
import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Alert, Slide, IconButton, Box } from '@mui/material';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import CloseIcon from '@mui/icons-material/Close';
import { mockNotifications } from '../data/notifications';

// Define the icons based on the notification type
const getIcon = (type) => {
  switch (type) {
    case 'team':
      return <SportsFootballIcon />;
    case 'player':
      return <PersonIcon />;
    case 'proposal':
      return <DescriptionIcon />;
    default:
      return null;
  }
};

// Common styles for notifications and alerts
const notificationStyles = {
  backgroundColor: '#0C0C0E',
  color: '#FFFFFF',
  borderBottom: '1px solid #1E1E20',
  borderRadius: '4px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
};

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarIcon, setSnackbarIcon] = useState(null);

  const addNotification = (notification) => {
    setNotifications((prev) => [notification, ...prev]);
    setSnackbarMessage(notification.content);
    setSnackbarIcon(getIcon(notification.type)); // Set the icon
    setSnackbarOpen(true);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev
        .map((n) => (n.id === id ? { ...n, read: true } : n))
        .filter((n) => !n.read)
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        markNotificationAsRead,
        clearAllNotifications,
        unreadCount,
      }}
    >
      {children}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        TransitionComponent={Slide}
        sx={{
          '& .MuiSnackbarContent-root': {
            ...notificationStyles,
            width: 'auto',
            padding: 0,
          },
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="info"
          sx={{
            width: '100%',
            ...notificationStyles,
            padding: '8px 16px',
            alignItems: 'center',
            '& .MuiAlert-icon': {
              display: 'none', // Hide the default icon
            },
          }}
          action={
            <IconButton
              size="small"
              color="inherit"
              onClick={handleCloseSnackbar}
              sx={{ color: '#FFD700' }}
            >
              <CloseIcon />
            </IconButton>
          }
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {snackbarIcon}
            <Box sx={{ marginLeft: 1 }}>{snackbarMessage}</Box>
          </Box>
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);
