import React from 'react';
import { Card, CardContent, Box, Avatar, Typography } from '@mui/material';

const ContenidoCard = ({ contenido }) => {
  console.log('ContenidoCard props:', {
    id: contenido._id,
    texto: contenido.texto,
    user: contenido.user,
    archivo: contenido.archivo
  });

  if (!contenido) {
    console.error('ContenidoCard received null contenido');
    return null;
  }

  return (
    <Card
      sx={{
        borderRadius: '24px',
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.18)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.25)'
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ 
            bgcolor: '#4338ca',
            width: 40,
            height: 40,
            mr: 2
          }}>
            {contenido.user?.nombreUsuario?.charAt(0) || 'U'}
          </Avatar>
          <Box>
            <Typography sx={{ 
              fontWeight: 600,
              color: '#1e293b',
              fontFamily: "'Poppins', sans-serif"
            }}>
              {contenido.user?.nombreUsuario || 'Usuario'}
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748b' }}>
              {new Date(contenido.fechaSubida).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
        
        <Typography sx={{ 
          mb: 2,
          color: '#334155',
          lineHeight: 1.6
        }}>
          {contenido.texto}
        </Typography>

        {contenido.archivo?.secure_url && (
          <Box sx={{ 
            mt: 2,
            borderRadius: '16px',
            overflow: 'hidden'
          }}>
            <img
              src={contenido.archivo.secure_url}
              alt="Contenido"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ContenidoCard;