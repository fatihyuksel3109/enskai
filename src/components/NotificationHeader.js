import React from 'react';
import { Box, Typography, Badge, Button } from '@mui/material';
import { styled } from '@mui/system';

const Header = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: '1px solid #1E1E20',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

const ButtonsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    marginTop: 0,
    width: 'auto',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#FFD700',
  color: '#000',
  '&:hover': {
    backgroundColor: '#FFC107',
  },
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
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
      <ButtonsContainer>
        <StyledButton onClick={onViewAll}>View All</StyledButton>
        <StyledButton onClick={onClearAll}>Clear All</StyledButton>
      </ButtonsContainer>
    )}
  </Header>
);

export default NotificationHeader;