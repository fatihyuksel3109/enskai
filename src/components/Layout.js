import React from 'react';
import Header from './Header';
import { Box } from '@mui/material';

const Layout = ({ children, unreadCount, notifications, markAsRead }) => {
  return (
    <Box sx={{ backgroundColor: '#151517', minHeight: '100vh', color: '#FFFFFF' }}>
      <Header unreadCount={unreadCount} notifications={notifications} markAsRead={markAsRead} />
      <Box sx={{ padding: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
