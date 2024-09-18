import React from 'react';
import { ListItem, Typography, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';  
import PersonIcon from '@mui/icons-material/Person';  
import DescriptionIcon from '@mui/icons-material/Description';  
import { styled } from '@mui/system';

const NotificationItem = styled(ListItem)(({ theme }) => ({
  borderBottom: '1px solid #1E1E20',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  padding: theme.spacing(2),
  '&:last-child': {
    borderBottom: 'none',
  },
}));

const NotificationIcon = ({ type }) => {
  switch (type) {
    case 'team': return <SportsSoccerIcon />;
    case 'player': return <PersonIcon />;
    case 'proposal': return <DescriptionIcon />;
    default: return null;
  }
};

const NotificationContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  overflow: 'hidden', // Prevent content from overflowing
}));

const NotificationText = styled(Typography)(({ theme }) => ({
  flex: 1,
  fontSize: '0.9rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  marginRight: theme.spacing(1), // Ensure some space between text and close button
}));

const NotificationItemComponent = ({ notification, onClick, onDismiss }) => (
  <NotificationItem onClick={onClick}>
    <NotificationContent>
      <Box sx={{ marginRight: 2, color: '#FFD700', flexShrink: 0 }}>
        <NotificationIcon type={notification.type} />
      </Box>
      <NotificationText
        sx={{ 
          fontWeight: notification.read ? 'normal' : 'bold', 
          opacity: notification.read ? 0.6 : 1 
        }}
      >
        {notification.content}
      </NotificationText>
      <IconButton
        edge="end"
        onClick={(e) => {
          e.stopPropagation();
          onDismiss(notification.id);
        }}
        sx={{ color: '#FFD700', flexShrink: 0 }}
      >
        <CloseIcon />
      </IconButton>
    </NotificationContent>
  </NotificationItem>
);

export default NotificationItemComponent;