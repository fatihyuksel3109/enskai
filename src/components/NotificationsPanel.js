import React, { useState, useEffect, useCallback } from 'react';
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
  SportsFootball as SportsFootballIcon,
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

const NotificationDetailModal = ({
  selectedNotification,
  open,
  handleClose,
}) => (
  <Modal
    open={open}
    onClose={handleClose}
    closeAfterTransition
  >
    <Fade in={open}>
      <ModalContent>
        <Typography variant="h6" fontWeight="bold" marginBottom={2}>
          Details
        </Typography>
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8, color: '#FFD700' }}
        >
          <CloseIcon />
        </IconButton>
        <Typography>{selectedNotification?.content}</Typography>
        <Typography>
          Type: {selectedNotification?.type?.charAt(0).toUpperCase() + selectedNotification?.type.slice(1)}
        </Typography>
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
  const [selectedNotification, setSelectedNotification] = useState(null);

  // Helper function to get the correct icon
  const getNotificationIcon = useCallback((type) => {
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
  }, []);

  // Open and close modal handlers
  const handleOpenModal = useCallback((notification) => {
    setSelectedNotification(notification);
    setOpenModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    if (selectedNotification) {
      markNotificationAsRead(selectedNotification.id);
      removeNotification(selectedNotification.id);
    }
    setOpenModal(false);
    setSelectedNotification(null);
  }, [selectedNotification, markNotificationAsRead, removeNotification]);

  // Dismiss notification
  const handleDismissNotification = (id, e) => {
    e.stopPropagation();
    removeNotification(id);
  };

  // Close panel if all notifications are cleared
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
        {notifications.length > 1 && (
          <ClearAllButton onClick={clearAllNotifications}>Clear All</ClearAllButton>
        )}
      </NotificationHeader>

      <NotificationList>
        <TransitionGroup>
          {notifications.map((notification) => (
            <CSSTransition key={notification.id} timeout={300} classNames="fade">
              <NotificationItem onClick={() => handleOpenModal(notification)}>
                <NotificationContent>
                  <NotificationIcon>{getNotificationIcon(notification.type)}</NotificationIcon>
                  <Typography flex={1} fontSize="0.9rem">
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
    </NotificationPanel>
  );
};

export default NotificationsPanel;
