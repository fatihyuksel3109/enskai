import React from 'react';
import { Button, Box } from '@mui/material';
import { useNotificationContext } from '../contexts/NotificationContext';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';

// Define available icons
const icons = [<SportsFootballIcon />, <PersonIcon />, <DescriptionIcon />];

const getRandomIcon = () => {
  const randomIndex = Math.floor(Math.random() * icons.length);
  return icons[randomIndex];
};

const AddNotificationButton = () => {
  const { addNotification } = useNotificationContext();

  const handleAddNotification = () => {
    const defaultMessage = 'This is a default notification message.';
    const defaultType = ['team', 'player', 'proposal'][Math.floor(Math.random() * 3)];
    
    addNotification({
      id: Date.now(),
      content: defaultMessage,
      type: defaultType,
      icon: getRandomIcon() // Set a random icon
    });
  };

  return (
    <Box sx={{ textAlign: 'center', marginTop: 2 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddNotification}
      >
        Add Notification
      </Button>
    </Box>
  );
};

export default AddNotificationButton;
