import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/UserContext';
import { subirContenidoRequest } from '../api/auth.contenido';
import Swal from 'sweetalert2';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { CloudUpload as CloudUploadIcon, Close as CloseIcon } from '@mui/icons-material';

const SubirPublicacion = () => {
  const navigate = useNavigate();
  const { id: muralId } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  // Validar que tengamos el muralId
  useEffect(() => {
    if (!muralId) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se especificó el mural',
      });
      navigate('/murales');
    }
  }, [muralId, navigate]);

  const [contenido, setContenido] = useState({
    texto: '',
    archivo: null,
    user: user?.id,
    muralId: muralId
  });

  const handleTextChange = (e) => {
    setContenido({
      ...contenido,
      texto: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setContenido({
        ...contenido,
        archivo: file
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = () => {
    setContenido({
      ...contenido,
      archivo: null
    });
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!contenido.texto.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Campo requerido',
        text: 'Por favor escribe algo para publicar',
      });
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('texto', contenido.texto);
      if (contenido.archivo) {
        formData.append('archivo', contenido.archivo);
      }
      // No need to append user and muralId as they'll be handled by the backend
      // through authRequired middleware and URL parameter

      const response = await subirContenidoRequest(formData, muralId);

      if (response.data) {
        Swal.fire({
          icon: 'success',
          title: '¡Publicación exitosa!',
          text: 'Tu contenido se ha publicado correctamente',
        });
        navigate(`/mural/${muralId}`);
      }
    } catch (error) {
      console.error('Error al subir contenido:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'No se pudo publicar el contenido',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 50%, #c4b5fd 100%)',
      position: 'relative',
      overflow: 'hidden',
      py: 8
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
          bottom: '15%',
          right: '10%',
          width: '70px',
          height: '70px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite',
        }} />
      </Box>

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: '24px',
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            border: '1px solid rgba(255,255,255,0.18)',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              color: '#4338ca',
              fontWeight: 700,
              textAlign: 'center',
              mb: 4,
              fontFamily: "'Poppins', sans-serif"
            }}
          >
            Nueva Publicación en Mural
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="¿Qué quieres compartir?"
              value={contenido.texto}
              onChange={handleTextChange}
              variant="outlined"
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255,255,255,0.6)',
                }
              }}
            />

            <Box sx={{ mb: 3 }}>
              <input
                accept="image/*,video/*"
                style={{ display: 'none' }}
                id="archivo-input"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="archivo-input">
                <Button
                  component="span"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  sx={{
                    borderRadius: '12px',
                    p: 2,
                    color: '#6366f1',
                    borderColor: '#6366f1',
                    '&:hover': {
                      borderColor: '#4338ca',
                      backgroundColor: 'rgba(99, 102, 241, 0.1)'
                    }
                  }}
                >
                  Subir Archivo
                </Button>
              </label>

              {preview && (
                <Box sx={{ 
                  mt: 2, 
                  position: 'relative',
                  display: 'inline-block'
                }}>
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '200px',
                      borderRadius: '12px'
                    }}
                  />
                  <IconButton
                    onClick={removeFile}
                    sx={{
                      position: 'absolute',
                      top: -8,
                      right: -8,
                      backgroundColor: '#dc2626',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#b91c1c'
                      }
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              )}
            </Box>

            <Button
              type="submit"
              fullWidth
              disabled={loading}
              sx={{
                py: 2,
                background: 'linear-gradient(45deg, #4338ca 30%, #6366f1 90%)',
                borderRadius: '12px',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  background: 'linear-gradient(45deg, #6366f1 30%, #818cf8 90%)',
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: 'white' }} />
              ) : (
                'Publicar'
              )}
            </Button>
          </form>
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

export default SubirPublicacion;