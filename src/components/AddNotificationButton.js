import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import { useNotificationContext } from '../contexts/NotificationContext';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';


const icons = {
  team: <SportsSoccerIcon />,
  player: <PersonIcon />,
  proposal: <DescriptionIcon />
};

const getRandomIcon = (type) => icons[type] || null;

const getRandomDetails = (type) => {
  switch (type) {
    case 'team':
      return {
        name: 'Team ' + Math.random().toString(36).substring(7),
        country: 'Country',
        division: 'Division',
        position: 'Position',
        financials: 'Financials'
      };
    case 'player':
      return {
        name: 'Player ' + Math.random().toString(36).substring(7),
        age: Math.floor(Math.random() * 30) + 18,
        currentTeam: 'Team ' + Math.random().toString(36).substring(7),
        position: 'Position'
      };
    case 'proposal':
      return {
        sentPlayer: 'Player ' + Math.random().toString(36).substring(7),
        sender: 'Team ' + Math.random().toString(36).substring(7),
        salary: '$' + (Math.floor(Math.random() * 50000) + 50000)
      };
    default:
      return {};
  }
};

const AddNotificationButton = () => {
  const { addNotification } = useNotificationContext();
  const [isDisabled, setIsDisabled] = useState(false); 

  const handleAddNotification = () => {
    const defaultMessage = 'This is a default notification message.';
    const types = ['team', 'player', 'proposal'];
    const defaultType = types[Math.floor(Math.random() * types.length)];
    
    
    addNotification({
      id: Date.now(),
      content: defaultMessage,
      type: defaultType,
      details: getRandomDetails(defaultType),
      icon: getRandomIcon(defaultType)
    });

    
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false); 
    }, 3000);
  };

  return (
    <Box sx={{ textAlign: 'center', marginTop: 2 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddNotification}
        disabled={isDisabled} 
      >
        Add Notification
      </Button>
    </Box>
  );
};

export default AddNotificationButton;
