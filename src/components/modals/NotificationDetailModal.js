import React from 'react';
import { Box, Typography, IconButton, Modal, Fade } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';

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
                <Typography variant="body1" marginBottom={1}>Club: {details.name}</Typography>
                <Typography variant="body1" marginBottom={1}>Country: {details.country}</Typography>
                <Typography variant="body1" marginBottom={1}>Division: {details.division}</Typography>
                <Typography variant="body1" marginBottom={1}>Position: {details.position}</Typography>
                <Typography variant="body1" marginBottom={1}>Financials: {details.financials}</Typography>
              </>
            )}
            {type === 'player' && (
              <>
                <Typography variant="body1" marginBottom={1}>Name: {details.name}</Typography>
                <Typography variant="body1" marginBottom={1}>Age: {details.age}</Typography>
                <Typography variant="body1" marginBottom={1}>Current Team: {details.currentTeam}</Typography>
                <Typography variant="body1" marginBottom={1}>Position: {details.position}</Typography>
              </>
            )}
            {type === 'proposal' && (
              <>
                <Typography variant="body1" marginBottom={1}>Sent Player: {details.sentPlayer}</Typography>
                <Typography variant="body1" marginBottom={1}>Sender: {details.sender}</Typography>
                <Typography variant="body1" marginBottom={1}>Salary: {details.salary}</Typography>
              </>
            )}
          </Box>
        </ModalContent>
      </Fade>
    </Modal>
  );
};

export default NotificationDetailModal;
