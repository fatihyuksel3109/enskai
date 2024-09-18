import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import { useNotificationContext } from '../contexts/NotificationContext';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import AddAlertIcon from '@mui/icons-material/AddAlert';

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

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#FFD700',
  color: '#0C0C0E',
  fontWeight: 'bold',
  padding: theme.spacing(1, 3),
  '&:hover': {
    backgroundColor: '#FFC107',
  },
  '&:disabled': {
    backgroundColor: '#C0C0C0',
    color: '#666666',
  },
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(4),
  right: theme.spacing(4),
  zIndex: 1000,
}));

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
    <ButtonContainer>
      <StyledButton
        variant="contained"
        onClick={handleAddNotification}
        disabled={isDisabled}
        startIcon={<AddAlertIcon />}
      >
        Add Notification
      </StyledButton>
    </ButtonContainer>
  );
};

export default AddNotificationButton;