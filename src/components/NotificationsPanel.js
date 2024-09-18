import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import NotificationHeader from './NotificationHeader';
import NotificationItemComponent from './NotificationItem';
import NotificationDetailModal from './modals/NotificationDetailModal';
import AllNotificationsModal from './modals/AllNotificationsModal';
import { useNotificationContext } from '../contexts/NotificationContext';

const MemoizedNotificationItem = React.memo(NotificationItemComponent);

const notificationVariants = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '-100%', opacity: 0 },
};

const NotificationsPanel = ({ onClose }) => {
  const {
    notifications,
    removeNotification,
    markNotificationAsRead,
    clearAllNotifications,
    unreadCount,
    totalNotifications
  } = useNotificationContext();

  const [openModal, setOpenModal] = useState(false);
  const [openAllModal, setOpenAllModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

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

  const handleOpenAllModal = useCallback(() => setOpenAllModal(true), []);

  const handleCloseAllModal = useCallback(() => setOpenAllModal(false), []);

  const handleDismissNotification = useCallback((id) => {
    removeNotification(id);
  }, [removeNotification]);

  useEffect(() => {
    if (notifications.length === 0) {
      const timer = setTimeout(onClose, 200);
      return () => clearTimeout(timer);
    }
  }, [notifications.length, onClose]);

  const notificationItems = useMemo(() => (
    <AnimatePresence initial={false}>
      {notifications.map((notification) => (
        <motion.div
          key={notification.id}
          variants={notificationVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ overflow: 'hidden' }}
        >
          <MemoizedNotificationItem
            notification={notification}
            onClick={() => handleOpenModal(notification)}
            onDismiss={handleDismissNotification}
          />
        </motion.div>
      ))}
    </AnimatePresence>
  ), [notifications, handleOpenModal, handleDismissNotification]);

  const memoizedHeader = useMemo(() => (
    <NotificationHeader
      unreadCount={unreadCount}
      onViewAll={handleOpenAllModal}
      onClearAll={clearAllNotifications}
      totalNotifications={totalNotifications}
    />
  ), [unreadCount, handleOpenAllModal, clearAllNotifications, totalNotifications]);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: '#0C0C0E',
      color: '#FFFFFF',
      padding: 2,
      position: 'relative',
      maxWidth: '100%',
      overflowX: 'hidden',
      boxSizing: 'border-box',
    }}>
      {memoizedHeader}

      <Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: 0, width: '100%' }}>
        {notificationItems}
      </Box>

      <NotificationDetailModal
        selectedNotification={selectedNotification}
        open={openModal}
        handleClose={handleCloseModal}
      />

      <AllNotificationsModal
        open={openAllModal}
        onClose={handleCloseAllModal}
        notifications={notifications}
      />
    </Box>
  );
};

export default React.memo(NotificationsPanel);