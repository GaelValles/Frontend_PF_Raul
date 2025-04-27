import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  IconButton,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
} from '@mui/material';
import { Add, Save, UploadFile, Link as LinkIcon, ColorLens, Delete } from '@mui/icons-material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../assets/muralazul.png';

const BoardCreation = () => {
  const [boardTitle, setBoardTitle] = useState('Haz clic para editar el título del tablero');
  const [savedTitle, setSavedTitle] = useState(boardTitle);
  const [sections, setSections] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(
    'https://images.pexels.com/photos/30612393/pexels-photo-30612393.jpeg'
  );
  const [anchorEl, setAnchorEl] = useState(null);

  // Lista de fondos predefinidos
  const backgroundOptions = [
    'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg',
    'https://images.pexels.com/photos/355887/pexels-photo-355887.jpeg',
    'https://images.pexels.com/photos/9282312/pexels-photo-9282312.jpeg',
    'https://images.pexels.com/photos/985266/pexels-photo-985266.jpeg',
    'https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg',
  ];

  const handleSaveTitle = () => {
    setSavedTitle(boardTitle);
    alert('¡Título guardado con éxito!');
  };

  const handleAddSection = () => {
    const newSection = {
      id: Date.now(),
      title: '',
      description: '',
      backgroundColor: '#ffffff',
      link: '',
      file: null,
      filePreview: null,
    };
    setSections((prevSections) => [...prevSections, newSection]);
  };

  const handleDeleteSection = (id) => {
    const updatedSections = sections.filter((section) => section.id !== id);
    setSections(updatedSections);
  };

  const handleSectionChange = (id, field, value) => {
    const updatedSections = sections.map((section) =>
      section.id === id ? { ...section, [field]: value } : section
    );
    setSections(updatedSections);
  };

  const handleFileUpload = (id, file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const updatedSections = sections.map((section) =>
        section.id === id ? { ...section, file, filePreview: reader.result } : section
      );
      setSections(updatedSections);
    };
    reader.readAsDataURL(file);
  };

  const handleBackgroundUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setBackgroundImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
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
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {/* Título editable con ícono de guardado */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 4,
            mb: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            position: 'relative',
          }}
        >
          <TextField
            fullWidth
            variant="standard"
            value={boardTitle}
            onChange={(e) => setBoardTitle(e.target.value)}
            InputProps={{
              disableUnderline: true,
              style: { fontSize: '2rem', fontWeight: 'bold', textAlign: 'center' },
            }}
          />
          <IconButton
            onClick={handleSaveTitle}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              backgroundColor: '#5271ff',
              color: '#fff',
              '&:hover': { backgroundColor: '#3a5bbf' },
            }}
          >
            <Save />
          </IconButton>

          {/* Selector de fondo */}
          <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: 'bold', color: '#333' }}>
            Selecciona un fondo:
          </Typography>
          <Grid container spacing={2}>
            {backgroundOptions.map((image, index) => (
              <Grid item xs={4} sm={3} md={2} key={index}>
                <Box
                  component="img"
                  src={image}
                  alt={`Fondo ${index + 1}`}
                  onClick={() => setBackgroundImage(image)}
                  sx={{
                    width: '100%',
                    height: '80px',
                    objectFit: 'cover',
                    borderRadius: 2,
                    cursor: 'pointer',
                    border: backgroundImage === image ? '3px solid #5271ff' : 'none',
                    transition: 'border 0.3s ease',
                  }}
                />
              </Grid>
            ))}
            {/* Opción para subir fondo personalizado */}
            <Grid item xs={4} sm={3} md={2}>
              <Button
                variant="contained"
                component="label"
                sx={{
                  width: '100%',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#8c52ff',
                  color: '#fff',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                  '&:hover': { backgroundColor: '#6926ed' },
                }}
              >
                Subir Fondo
                <input type="file" hidden onChange={handleBackgroundUpload} />
              </Button>
            </Grid>
          </Grid>

          {/* Botón de añadir sección */}
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddSection}
            sx={{
              mt: 4,
              backgroundColor: '#8c52ff',
              fontWeight: 'bold',
              textTransform: 'capitalize',
              '&:hover': { backgroundColor: '#6926ed' },
            }}
          >
            Añadir sección
          </Button>
        </Paper>

        {/* Secciones */}
        <Grid container spacing={3}>
          {sections.map((section) => (
            <Grid item xs={12} md={6} lg={4} key={section.id}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  backgroundColor: section.backgroundColor,
                  minHeight: '400px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    label="Título de la sección"
                    value={section.title}
                    onChange={(e) => handleSectionChange(section.id, 'title', e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <IconButton
                    onClick={() => handleDeleteSection(section.id)}
                    sx={{ color: '#ff5252' }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
                <TextField
                  fullWidth
                  label="Descripción de la sección"
                  value={section.description}
                  multiline
                  rows={3}
                  onChange={(e) => handleSectionChange(section.id, 'description', e.target.value)}
                  sx={{ mb: 2 }}
                />

                {/* Vista previa de la imagen */}
                {section.filePreview && (
                  <Box
                    component="img"
                    src={section.filePreview}
                    alt="Vista previa"
                    sx={{
                      width: '100%',
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: 2,
                      mb: 2,
                    }}
                  />
                )}

                {/* Opciones de sección */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <IconButton component="label">
                    <ColorLens />
                    <input
                      type="color"
                      hidden
                      value={section.backgroundColor}
                      onChange={(e) => handleSectionChange(section.id, 'backgroundColor', e.target.value)}
                    />
                  </IconButton>

                  <IconButton component="label">
                    <LinkIcon />
                    <input
                      type="url"
                      hidden
                      onChange={(e) => handleSectionChange(section.id, 'link', e.target.value)}
                    />
                  </IconButton>

                  <IconButton component="label">
                    <UploadFile />
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => handleFileUpload(section.id, e.target.files[0])}
                    />
                  </IconButton>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<Save />}
                  sx={{
                    backgroundColor: '#8c52ff',
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                    '&:hover': { backgroundColor: '#6926ed' },
                  }}
                  onClick={() => alert('¡Sección guardada!')}
                >
                  Guardar Sección
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default BoardCreation;
