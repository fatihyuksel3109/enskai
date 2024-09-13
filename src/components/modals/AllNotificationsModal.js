import React from 'react';
import { Box, Typography, IconButton, Modal, Fade, List, ListItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';

const ModalContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 400,
  backgroundColor: '#151517',
  border: '1px solid #FFD700',
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
  padding: theme.spacing(4),
  color: '#FFFFFF',
}));

const NotificationIcon = ({ type }) => {
  switch (type) {
    case 'team': return <SportsSoccerIcon />;
    case 'player': return <PersonIcon />;
    case 'proposal': return <DescriptionIcon />;
    default: return null;
  }
};

const AllNotificationsModal = ({ open, onClose, notifications }) => (
  <Modal open={open} onClose={onClose} closeAfterTransition>
    <Fade in={open}>
      <ModalContent>
        <Typography variant="h6" fontWeight="bold" marginBottom={2}>All Notifications</Typography>
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8, color: '#FFD700' }}
        >
          <CloseIcon />
        </IconButton>
        <List sx={{ maxHeight: '60vh', overflowY: 'auto' }}>
          {notifications.map((notification) => (
            <ListItem key={notification.id} sx={{ borderBottom: '1px solid #1E1E20' }}>
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
              </Box>
            </ListItem>
          ))}
        </List>
      </ModalContent>
    </Fade>
  </Modal>
);

export default AllNotificationsModal;
