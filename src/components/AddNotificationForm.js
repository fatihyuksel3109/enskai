// src/components/AddNotificationForm.js
import React, { useState } from 'react';
import { Button, TextField, Box, MenuItem, Typography, Container } from '@mui/material';
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
    <Container sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Please Add a Notification to Test
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2, backgroundColor: '#f5f5f5', borderRadius: 1, boxShadow: 2 }}>
        <TextField
          fullWidth
          label="Notification Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{ marginBottom: 2 }}
          variant="outlined"
        />
        <TextField
          select
          fullWidth
          label="Notification Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          sx={{ marginBottom: 2 }}
          variant="outlined"
        >
          <MenuItem value="team">Team</MenuItem>
          <MenuItem value="player">Player</MenuItem>
          <MenuItem value="proposal">Proposal</MenuItem>
        </TextField>
        <Button type="submit" variant="contained" color="primary">
          Add Notification
        </Button>
      </Box>
    </Container>
  );
};

export default AddNotificationForm;
