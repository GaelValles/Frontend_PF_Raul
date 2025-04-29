import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/UserContext';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Avatar,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  CircularProgress,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Save as SaveIcon,
  Edit as EditIcon,
  ArrowBack as ArrowBackIcon,
  ExitToApp as ExitToAppIcon,
} from '@mui/icons-material';
import Swal from 'sweetalert2';

const Profile = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    nombreUsuario: '',
    correo: '',
  });
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Inicializar datos del usuario
    setUserData({
      nombreUsuario: user.nombreUsuario || '',
      correo: user.correo || '',
    });
  }, [user, navigate]);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!userData.nombreUsuario.trim() || !userData.correo.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos requeridos',
        text: 'Por favor complete todos los campos',
      });
      return;
    }

    try {
      setLoading(true);
      const updatedUser = await updateUser(userData);
      
      if (updatedUser) {
        Swal.fire({
          icon: 'success',
          title: '¡Perfil actualizado!',
          text: 'Los cambios se han guardado correctamente',
        });
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'No se pudieron guardar los cambios',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate('/profile');
    handleMenuClose();
  };

  const handleLogout = () => {
    // Implement logout functionality
    handleMenuClose();
  };

  // Proteger contra renderizado cuando no hay usuario
  if (!user) {
    return null;
  }

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
          top: '15%',
          left: '10%',
          width: '60px',
          height: '60px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          transform: 'rotate(45deg)',
          animation: 'float 6s ease-in-out infinite',
        }} />
        <Box sx={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: '80px',
          height: '80px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite',
        }} />
      </Box>

      {/* AppBar */}
      <AppBar position="static" sx={{ 
        backgroundColor: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        boxShadow: 'none'
      }}>
        <Toolbar>
          <IconButton
            edge="start"
            onClick={() => navigate('/murales')}
            sx={{ color: 'white', mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              color: 'white'
            }}
          >
            Mi Perfil
          </Typography>
          <IconButton
            onClick={handleMenuOpen}
            sx={{
              border: '2px solid rgba(255,255,255,0.8)',
              padding: '8px',
              '&:hover': {
                transform: 'scale(1.05)',
                transition: 'all 0.2s ease'
              }
            }}
          >
            <Avatar sx={{ 
              bgcolor: 'rgba(255,255,255,0.2)',
              fontWeight: 'bold',
              backdropFilter: 'blur(10px)'
            }}>
              {user?.nombreUsuario?.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                borderRadius: '12px',
                minWidth: '150px',
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.18)',
              }
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem 
              onClick={handleProfile}
              sx={{ 
                py: 1.5,
                gap: 1.5,
                '&:hover': { backgroundColor: 'rgba(99, 102, 241, 0.1)' }
              }}
            >
              <Avatar sx={{ width: 24, height: 24 }} />
              <Typography>Perfil</Typography>
            </MenuItem>
            <MenuItem 
              onClick={handleLogout}
              sx={{ 
                py: 1.5,
                gap: 1.5,
                color: '#dc2626',
                '&:hover': { backgroundColor: 'rgba(220, 38, 38, 0.1)' }
              }}
            >
              <ExitToAppIcon sx={{ width: 24, height: 24 }} />
              <Typography>Cerrar sesión</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mt: 8, position: 'relative', zIndex: 1 }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: '24px',
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.18)',
            textAlign: 'center',
          }}
        >
          <Avatar
            sx={{
              width: 120,
              height: 120,
              margin: '0 auto',
              mb: 3,
              background: 'linear-gradient(45deg, #4338ca 30%, #6366f1 90%)',
              fontSize: '3rem',
              fontWeight: 'bold',
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {userData.nombreUsuario?.charAt(0)?.toUpperCase() || 'U'}
          </Avatar>

          <Box sx={{ mb: 4 }}>
            <TextField
              fullWidth
              label="Nombre de Usuario"
              name="nombreUsuario"
              value={userData.nombreUsuario}
              onChange={handleInputChange}
              disabled={!isEditing}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255,255,255,0.6)',
                }
              }}
            />
            <TextField
              fullWidth
              label="Correo Electrónico"
              name="correo"
              value={userData.correo}
              onChange={handleInputChange}
              disabled={!isEditing}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255,255,255,0.6)',
                }
              }}
            />
          </Box>

          <Button
            variant="contained"
            startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
            onClick={isEditing ? handleSave : handleEditToggle}
            disabled={loading}
            sx={{
              py: 1.5,
              px: 4,
              borderRadius: '12px',
              background: isEditing 
                ? 'linear-gradient(45deg, #4338ca 30%, #6366f1 90%)'
                : 'rgba(99, 102, 241, 0.1)',
              color: isEditing ? 'white' : '#6366f1',
              fontWeight: 600,
              '&:hover': {
                background: isEditing
                  ? 'linear-gradient(45deg, #6366f1 30%, #818cf8 90%)'
                  : 'rgba(99, 102, 241, 0.2)',
              }
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: 'white' }} />
            ) : (
              isEditing ? 'Guardar Cambios' : 'Editar Perfil'
            )}
          </Button>
        </Paper>
      </Container>

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

export default Profile;