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

  // Add notification with snackbar display
  const addNotification = (notification) => {
    setNotifications((prev) => [notification, ...prev]);
    setSnackbarMessage(notification.content);
    setSnackbarIcon(notification.icon); // Use the icon from the notification
    setSnackbarOpen(true);
  };

  // Remove notification from the list
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Mark notification as read, but keep it in the list
  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  // Remove all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Get count of unread notifications
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close snackbar after the set duration
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

// Custom hook for accessing the Notification context
export const useNotificationContext = () => useContext(NotificationContext);
