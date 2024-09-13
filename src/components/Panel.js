import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  IconButton,
  Modal,
  Fade,
  Button,
  Badge,
} from '@mui/material';
import { styled } from '@mui/system';
import {
  SportsSoccer as SportsSoccerIcon,
  Person as PersonIcon,
  Description as DescriptionIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useNotificationContext } from '../contexts/NotificationContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// Styled components
const NotificationPanel = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  backgroundColor: '#0C0C0E',
  color: '#FFFFFF',
  padding: theme.spacing(2),
  position: 'relative',
}));

const NotificationHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: '1px solid #1E1E20',
}));

const NotificationList = styled(List)({
  flex: 1,
  overflowY: 'auto',
  padding: 0,
});

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

const NotificationContent = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
});

const NotificationIcon = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(2),
  color: '#FFD700',
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

const NotificationDetailModal = ({ selectedNotification, open, handleClose }) => {
  if (!selectedNotification) return null;

  const { type, details } = selectedNotification;

  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition>
      <Fade in={open}>
        <ModalContent>
          <Typography variant="h6" fontWeight="bold" marginBottom={2}>
            {type.charAt(0).toUpperCase() + type.slice(1)} Details
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{ position: 'absolute', right: 8, top: 8, color: '#FFD700' }}
          >
            <CloseIcon />
          </IconButton>
          <Box>
            {type === 'team' && (
              <>
                <Typography variant="body1" marginBottom={1}>
                  Club: {details.name}
                </Typography>
                <Typography variant="body1" marginBottom={1}>
                  Country: {details.country}
                </Typography>
                <Typography variant="body1" marginBottom={1}>
                  Division: {details.division}
                </Typography>
                <Typography variant="body1" marginBottom={1}>
                  Position: {details.position}
                </Typography>
                <Typography variant="body1" marginBottom={1}>
                  Financials: {details.financials}
                </Typography>
              </>
            )}
            {type === 'player' && (
              <>
                <Typography variant="body1" marginBottom={1}>
                  Name: {details.name}
                </Typography>
                <Typography variant="body1" marginBottom={1}>
                  Age: {details.age}
                </Typography>
                <Typography variant="body1" marginBottom={1}>
                  Current Team: {details.currentTeam}
                </Typography>
                <Typography variant="body1" marginBottom={1}>
                  Position: {details.position}
                </Typography>
              </>
            )}
            {type === 'proposal' && (
              <>
                <Typography variant="body1" marginBottom={1}>
                  Sent Player: {details.sentPlayer}
                </Typography>
                <Typography variant="body1" marginBottom={1}>
                  Sender: {details.sender}
                </Typography>
                <Typography variant="body1" marginBottom={1}>
                  Salary: {details.salary}
                </Typography>
              </>
            )}
          </Box>
        </ModalContent>
      </Fade>
    </Modal>
  );
};


const AllNotificationsModal = ({ open, onClose, notifications, getNotificationIcon }) => (
  <Modal
    open={open}
    onClose={onClose}
    closeAfterTransition
  >
    <Fade in={open}>
      <ModalContent>
        <Typography variant="h6" fontWeight="bold" marginBottom={2}>
          All Notifications
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8, color: '#FFD700' }}
        >
          <CloseIcon />
        </IconButton>
        <List sx={{ maxHeight: '60vh', overflowY: 'auto' }}>
          {notifications.map((notification) => (
            <ListItem key={notification.id} sx={{ borderBottom: '1px solid #1E1E20' }}>
              <NotificationContent>
                <NotificationIcon>{getNotificationIcon(notification.type)}</NotificationIcon>
                <Typography
                  flex={1}
                  fontSize="0.9rem"
                  sx={{ fontWeight: notification.read ? 'normal' : 'bold', opacity: notification.read ? 0.6 : 1 }}
                >
                  {notification.content}
                </Typography>
              </NotificationContent>
            </ListItem>
          ))}
        </List>
      </ModalContent>
    </Fade>
  </Modal>
);


const NotificationsPanel = ({ onClose }) => {
  const {
    notifications,
    removeNotification,
    markNotificationAsRead,
    clearAllNotifications,
    unreadCount,
  } = useNotificationContext();

  const [openModal, setOpenModal] = useState(false);
  const [openAllModal, setOpenAllModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  // Helper function to get the correct icon
  const getNotificationIcon = useCallback((type) => {
    switch (type) {
      case 'team':
        return <SportsSoccerIcon />;
      case 'player':
        return <PersonIcon />;
      case 'proposal':
        return <DescriptionIcon />;
      default:
        return null;
    }
  }, []);

  const handleOpenModal = useCallback((notification) => {
    setSelectedNotification(notification);
    setOpenModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
    if (selectedNotification) {
      markNotificationAsRead(selectedNotification.id);
    }
  }, [selectedNotification, markNotificationAsRead]);

  const handleOpenAllModal = () => setOpenAllModal(true);

  const handleCloseAllModal = () => setOpenAllModal(false);

  const handleDismissNotification = (id, e) => {
    e.stopPropagation();
    removeNotification(id);
  };

  useEffect(() => {
    if (notifications.length === 0) {
      const timer = setTimeout(onClose, 200);
      return () => clearTimeout(timer);
    }
  }, [notifications.length, onClose]);

  return (
    <NotificationPanel>
      <NotificationHeader>
        {unreadCount > 0 && (
          <Badge badgeContent={unreadCount} color="error">
            <Typography variant="h6" fontWeight="bold">
              Notifications
            </Typography>
          </Badge>
        )}
        {notifications.length > 0 && (
          <>
            <ViewAllButton onClick={handleOpenAllModal}>View All</ViewAllButton>
            <ClearAllButton onClick={clearAllNotifications}>Clear All</ClearAllButton>
          </>
        )}
      </NotificationHeader>

      <NotificationList>
        <TransitionGroup>
          {notifications.map((notification) => (
            <CSSTransition key={notification.id} timeout={300} classNames="fade">
              <NotificationItem onClick={() => handleOpenModal(notification)}>
                <NotificationContent>
                  <NotificationIcon>{getNotificationIcon(notification.type)}</NotificationIcon>
                  <Typography
                    flex={1}
                    fontSize="0.9rem"
                    sx={{ fontWeight: notification.read ? 'normal' : 'bold', opacity: notification.read ? 0.6 : 1 }}
                  >
                    {notification.content}
                  </Typography>
                  <IconButton
                    edge="end"
                    onClick={(e) => handleDismissNotification(notification.id, e)}
                    sx={{ color: '#FFD700' }}
                  >
                    <CloseIcon />
                  </IconButton>
                </NotificationContent>
              </NotificationItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </NotificationList>

      {/* Modal for notification details */}
      <NotificationDetailModal
        selectedNotification={selectedNotification}
        open={openModal}
        handleClose={handleCloseModal}
      />

      {/* Modal for all notifications */}
      <AllNotificationsModal
        open={openAllModal}
        onClose={handleCloseAllModal}
        notifications={notifications}
        getNotificationIcon={getNotificationIcon} // Pass getNotificationIcon here
      />
    </NotificationPanel>
  );
};


export default NotificationsPanel;
