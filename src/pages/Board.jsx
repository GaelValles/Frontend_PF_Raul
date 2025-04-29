import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/UserContext';
import { createMuralRequest } from '../api/auth.mural';
import Swal from 'sweetalert2';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import { Add as AddIcon, Dashboard as DashboardIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';

const BoardCreation = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const [muralData, setMuralData] = useState({
    titulo: '',
    descripcion: '',
    user: user?.id
  });

  const handleChange = (e) => {
    setMuralData({
      ...muralData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createMuralRequest(muralData);
      
      if (response.data) {
        Swal.fire({
          icon: 'success',
          title: '¡Mural creado!',
          text: 'El mural se ha creado correctamente',
          confirmButtonText: 'OK'
        });
        navigate('/murales');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Error al crear el mural',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 50%, #c4b5fd 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative elements */}
      <Box sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}>
        <Box sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '50px',
          height: '50px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          transform: 'rotate(45deg)',
          animation: 'float 6s ease-in-out infinite',
        }} />
        <Box sx={{
          position: 'absolute',
          top: '60%',
          right: '10%',
          width: '70px',
          height: '70px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite',
        }} />
        {/* Add more decorative elements as needed */}
      </Box>

      {/* AppBar with glassmorphism effect */}
      <AppBar position="static" sx={{ 
        backgroundColor: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        boxShadow: 'none'
      }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: "'Poppins', sans-serif" }}>
            Creative Board
          </Typography>
          <IconButton color="inherit" onClick={() => navigate('/dashboard')}>
            <DashboardIcon />
          </IconButton>
          <IconButton
            onClick={handleMenuClick}
            sx={{ ml: 2 }}
          >
            <Avatar sx={{ bgcolor: '#4f46e5' }}>
              {user?.nombreUsuario?.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogout}>
              <ExitToAppIcon sx={{ mr: 1 }} />
              Cerrar Sesión
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mt: 8, mb: 4, position: 'relative', zIndex: 1 }}>
        <Paper 
          elevation={0}
          sx={{
            p: 4,
            borderRadius: '24px',
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            border: '1px solid rgba(255,255,255,0.18)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.45)',
            }
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              variant="h4" 
              component="h1"
              sx={{
                color: '#4338ca',
                fontWeight: 800,
                mb: 2,
                fontSize: '2rem',
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              Crear Nuevo Mural
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                fullWidth
                label="Título del Mural"
                name="titulo"
                value={muralData.titulo}
                onChange={handleChange}
                required
                variant="standard"
                sx={{
                  '& .MuiInput-underline:before': {
                    borderBottomColor: '#6366f1'
                  },
                  '& .MuiInput-underline:hover:before': {
                    borderBottomColor: '#4338ca'
                  },
                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#4338ca'
                  },
                  '& .MuiInputLabel-root': {
                    color: '#6366f1'
                  }
                }}
              />

              <TextField
                fullWidth
                label="Descripción"
                name="descripcion"
                value={muralData.descripcion}
                onChange={handleChange}
                multiline
                rows={4}
                variant="standard"
                sx={{
                  '& .MuiInput-underline:before': {
                    borderBottomColor: '#6366f1'
                  },
                  '& .MuiInput-underline:hover:before': {
                    borderBottomColor: '#4338ca'
                  },
                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#4338ca'
                  },
                  '& .MuiInputLabel-root': {
                    color: '#6366f1'
                  }
                }}
              />

              <Button
                type="submit"
                fullWidth
                sx={{
                  mt: 3,
                  py: 2,
                  background: 'linear-gradient(45deg, #4338ca 30%, #6366f1 90%)',
                  borderRadius: '50px',
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  boxShadow: '0 4px 15px 0 rgba(67, 56, 202, 0.35)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #6366f1 30%, #818cf8 90%)',
                    boxShadow: '0 6px 20px 0 rgba(67, 56, 202, 0.45)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
                startIcon={<AddIcon />}
              >
                Crear Mural
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>

      {/* Add global styles for animations */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px) rotate(45deg); }
            50% { transform: translateY(-20px) rotate(45deg); }
            100% { transform: translateY(0px) rotate(45deg); }
          }
        `}
      </style>
    </Box>
  );
};

export default BoardCreation;
