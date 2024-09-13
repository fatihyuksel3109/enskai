import React from 'react';
import { ListItem, Typography, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';  // Import this
import PersonIcon from '@mui/icons-material/Person';  // Import this
import DescriptionIcon from '@mui/icons-material/Description';  // Import this
import { styled } from '@mui/system';

const NotificationItem = styled(ListItem)(({ theme }) => ({
  borderBottom: '1px solid #1E1E20',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  padding: theme.spacing(1),
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

const NotificationItemComponent = ({ notification, onClick, onDismiss }) => (
  <NotificationItem onClick={onClick}>
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <Box sx={{ marginRight: 2, color: '#FFD700' }}>
        <NotificationIcon type={notification.type} />
      </Box>
      <Typography
        flex={1}
        fontSize="0.9rem"
        sx={{ fontWeight: notification.read ? 'normal' : 'bold', opacity: notification.read ? 0.6 : 1 }}
      >
        {notification.content}
      </Typography>
      <IconButton
        edge="end"
        onClick={(e) => {
          e.stopPropagation();
          onDismiss(notification.id);
        }}
        sx={{ color: '#FFD700' }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  </NotificationItem>
);

export default NotificationItemComponent;
