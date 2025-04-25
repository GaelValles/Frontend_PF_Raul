import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Paper,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import AccountCircle from '@mui/icons-material/AccountCircle';
import logo from '../assets/muralazul.png';

const Home = () => {
  const images = [
    'https://images.pexels.com/photos/1517076/pexels-photo-1517076.jpeg',
    'https://images.pexels.com/photos/1292998/pexels-photo-1292998.jpeg',
    'https://images.pexels.com/photos/3518623/pexels-photo-3518623.jpeg',
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Navbar */}
      <AppBar position="static" elevation={1} sx={{ backgroundColor: '#ffffff' }}>
        <Toolbar sx={{ fontFamily: "'Poppins', sans-serif" }}>
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
              flexGrow: 1,
              fontWeight: 600,
              color: '#5271ff',
              fontSize: '1.2rem',
            }}
          >
            Mural App
          </Typography>

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

          {/* Ícono de perfil con menú desplegable */}
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleMenuOpen}
            sx={{ color: '#5271ff', ml: 1 }}
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
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        {/* Swiper Background */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  width: '100%',
                  height: '100vh',
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Welcome Card */}
        <Container maxWidth="sm">
          <Paper
            elevation={6}
            sx={{
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(10px)',
              borderRadius: 4,
              padding: 7,
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              mt: 4,
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 600, color: '#5271ff', mb: 2 }}>
              ¡Bienvenido a Mural App!
            </Typography>
            <Typography variant="body1" sx={{ color: '#333', mb: 4 }}>
              Crea, organiza y comparte murales colaborativos en tiempo real. Dale vida a tus ideas como nunca antes.
            </Typography>
            <Button
              variant="contained"
              size="large"
              component={RouterLink}
              to="/register"
              sx={{
                backgroundColor: '#8c52ff',
                borderRadius: 4,
                fontWeight: 'bold',
                fontSize: '1rem',
                paddingX: 4,
                paddingY: 1.2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#6926ed',
                  transform: 'scale(1.05)',
                },
              }}
            >
              Comenzar Ahora
            </Button>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
