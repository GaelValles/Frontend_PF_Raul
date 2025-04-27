import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { Save, Edit, AccountCircle } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../assets/Muralazul.png';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userData, setUserData] = useState({
    nombreUsuario: 'moni123',
    correo: 'moni@gmail.com',
  });

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Aquí puedes agregar la lógica para guardar los datos en el backend
    console.log('Datos guardados:', userData);
    setIsEditing(false);
  };

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <Box
      sx={{
        backgroundImage: 'linear-gradient(to right, #8c52ff, #4364f7)',
        minHeight: '100vh',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Navbar */}
      <AppBar position="sticky" elevation={1} sx={{ backgroundColor: '#ffffff' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{
                width: 45,
                height: 45,
                marginRight: 2,
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: '#5271ff',
                fontSize: '1.2rem',
              }}
            >
              Mural App
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              component={RouterLink}
              to="/"
              sx={{
                color: '#5271ff',
                textTransform: 'capitalize',
                fontWeight: 'bold',
                fontSize: '1rem',
              }}
            >
              Inicio
            </Button>
            <Button
              component={RouterLink}
              to="/contact"
              sx={{
                color: '#5271ff',
                textTransform: 'capitalize',
                fontWeight: 'bold',
                fontSize: '1rem',
              }}
            >
              Contacto
            </Button>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleMenuOpen}
              sx={{ color: '#5271ff' }}
            >
              <AccountCircle fontSize="large" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem component={RouterLink} to="/profile" onClick={handleMenuClose}>
                Mi perfil
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>Cerrar sesión</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: '#ffffff',
          boxShadow: 6,
          borderRadius: 4,
          p: 4,
          textAlign: 'center',
          mt: 4,
        }}
      >
        <Avatar
          sx={{
            width: 120,
            height: 120,
            margin: '0 auto',
            mb: 2,
            backgroundColor: '#8c52ff',
            fontSize: '2rem',
            fontWeight: 'bold',
          }}
        >
          {userData.nombreUsuario.charAt(0).toUpperCase()}
        </Avatar>

        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: '600', color: '#5271ff' }}
        >
          Mi Perfil
        </Typography>

        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            mt: 3,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre de Usuario"
                name="nombreUsuario"
                value={userData.nombreUsuario}
                onChange={handleInputChange}
                disabled={!isEditing}
                InputProps={{
                  style: { fontSize: '1rem', fontWeight: 'bold' },
                }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Correo Electrónico"
                name="correo"
                value={userData.correo}
                onChange={handleInputChange}
                disabled={!isEditing}
                InputProps={{
                  style: { fontSize: '1rem', fontWeight: 'bold' },
                }}
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            startIcon={isEditing ? <Save /> : <Edit />}
            onClick={isEditing ? handleSave : handleEditToggle}
            sx={{
              mt: 2,
              backgroundColor: isEditing ? '#5271ff' : '#8c52ff',
              fontWeight: 'bold',
              textTransform: 'capitalize',
              '&:hover': {
                backgroundColor: isEditing ? '#3a5bbf' : '#6926ed',
              },
            }}
          >
            {isEditing ? 'Guardar Cambios' : 'Editar Perfil'}
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Profile;