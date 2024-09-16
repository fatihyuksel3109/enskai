import React from 'react';
import { Box, Typography, Badge, Button } from '@mui/material';
import { styled } from '@mui/system';

const Header = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: '1px solid #1E1E20',
}));

const ClearAllButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(3),
  right: theme.spacing(3),
  backgroundColor: '#FFD700',
  color: '#000',
  '&:hover': {
    backgroundColor: '#FFC107',
  },
}));

const ViewAllButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(3),
  right: theme.spacing(16),
  backgroundColor: '#FFD700',
  color: '#000',
  '&:hover': {
    backgroundColor: '#FFC107',
  },
}));

const NotificationHeader = ({ totalNotifications, unreadCount, onViewAll, onClearAll }) => (
  <Header>
    <Badge badgeContent={unreadCount} color="error">
      <Typography variant="h6" fontWeight="bold">
        Notifications
      </Typography>
    </Badge>
    {totalNotifications > 0 && (
      <>
        <ViewAllButton onClick={onViewAll}>View All</ViewAllButton>
        <ClearAllButton onClick={onClearAll}>Clear All</ClearAllButton>
      </>
    )}
  </Header>
);

export default NotificationHeader;
