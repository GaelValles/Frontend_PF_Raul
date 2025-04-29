import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/UserContext';
import { getMuralRequest } from '../api/auth.mural';
import Swal from 'sweetalert2';
import {
  Box,
  Container,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Fab,
  CircularProgress,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import ContenidoCard from '../components/mural/ContenidoCard';
import EmptyState from '../components/mural/EmptyState';

const Mural = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [contenidos, setContenidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadMural();
  }, [id, user, navigate]);

  const loadMural = async () => {
    try {
      setLoading(true);
      const response = await getMuralRequest(id);
      console.log('API Response:', response);
      
      if (!response.data) {
        throw new Error('No data found');
      }
      
      // The response.data is directly the array of contenidos
      setContenidos(response.data);
    } catch (error) {
      console.error('Error loading mural:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo cargar el mural'
      });
      navigate('/murales');
    } finally {
      setLoading(false);
    }
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
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                color: 'white'
              }}
            >
              Publicaciones del Mural
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, mb: 4, position: 'relative', zIndex: 1 }}>
        {loading ? (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            minHeight: '60vh' 
          }}>
            <CircularProgress sx={{ color: 'white' }} />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {contenidos.length > 0 ? (
              contenidos.map((contenido) => (
                <ContenidoCard key={contenido._id} contenido={contenido} />
              ))
            ) : (
              <EmptyState muralId={id} />
            )}
          </Box>
        )}

        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            bgcolor: 'rgba(255,255,255,0.9)',
            color: '#6366f1',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.95)',
            }
          }}
          onClick={() => navigate(`/subirPublicacion/${id}`)}
        >
          <AddIcon />
        </Fab>
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

export default Mural;