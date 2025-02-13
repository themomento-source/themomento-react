import React from 'react';
import { Modal, Box, IconButton, Typography } from '@mui/material';
import { MdClose } from 'react-icons/md';

const ImageModal = ({ open, onClose, image }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 2,
        outline: 'none'
      }}>
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8, zIndex: 1 }}
        >
          <MdClose />
        </IconButton>
        <Box sx={{ maxWidth: '90vw', maxHeight: '90vh' }}>
          <img
            src={image?.url}
            alt={image?.description}
            style={{ 
              width: '100%', 
              height: 'auto',
              maxHeight: '80vh',
              objectFit: 'contain'
            }}
          />
          {image?.description && (
            <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
              {image.description}
            </Typography>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default ImageModal;