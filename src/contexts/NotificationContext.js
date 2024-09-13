// src/contexts/NotificationContext.js
import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Alert, Slide, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { mockNotifications } from '../data/notifications';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarIcon, setSnackbarIcon] = useState(null);

  const addNotification = (notification) => {
    setNotifications((prev) => [notification, ...prev]);
    setSnackbarMessage(notification.content);
    setSnackbarIcon(notification.icon); // Use the icon from the notification
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
            backgroundColor: '#FFD54F', // Yellowish background
            color: '#000000', // Black text
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
            backgroundColor: '#FFD54F', // Yellowish background
            color: '#000000', // Black text
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
              sx={{ color: '#000000' }} // Black color for the close icon
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
