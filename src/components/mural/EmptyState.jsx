import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const EmptyState = ({ muralId }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ 
      textAlign: 'center',
      py: 8,
      background: 'rgba(255,255,255,0.8)',
      borderRadius: '24px'
    }}>
      <Typography
        variant="h6"
        sx={{
          color: '#4338ca',
          fontWeight: 600,
          fontFamily: "'Poppins', sans-serif",
          mb: 2
        }}
      >
        No hay publicaciones aún
      </Typography>
      <Typography sx={{ color: '#64748b', mb: 4 }}>
        ¡Sé el primero en compartir algo!
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => navigate(`/subirPublicacion/${muralId}`)}
        sx={{
          bgcolor: '#6366f1',
          color: 'white',
          px: 4,
          py: 1.5,
          borderRadius: '12px',
          '&:hover': {
            bgcolor: '#4338ca'
          }
        }}
      >
        Crear publicación
      </Button>
    </Box>
  );
};

export default EmptyState;