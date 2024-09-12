import React, { useState } from 'react';
import { Button, TextField, Box, MenuItem } from '@mui/material';
import { useNotificationContext } from '../contexts/NotificationContext';

const AddNotificationForm = () => {
  const { addNotification } = useNotificationContext();
  const [content, setContent] = useState('');
  const [type, setType] = useState('team');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      addNotification({ id: Date.now(), content, type });
      setContent('');
      setType('team');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
      <TextField
        fullWidth
        id="notification-content" // Added id
        name="notificationContent" // Added name
        label="Notification Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        select
        fullWidth
        id="notification-type" // Added id
        name="notificationType" // Added name
        label="Notification Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        sx={{ marginBottom: 2 }}
      >
        <MenuItem value="team">Team</MenuItem>
        <MenuItem value="player">Player</MenuItem>
        <MenuItem value="proposal">Proposal</MenuItem>
      </TextField>
      <Button type="submit" variant="contained" color="primary">
        Add Notification
      </Button>
    </Box>
  );
};

export default AddNotificationForm;
