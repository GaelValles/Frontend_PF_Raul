import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/UserContext';
import { getMuralesRequest, deleteMuralRequest, getMuralesParticipanteRequest, unirseAlMuralRequest } from '../api/auth.mural';
import Swal from 'sweetalert2';
import {
  Container,
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Fab,
  Tooltip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  ExitToApp as ExitToAppIcon,
} from '@mui/icons-material';
import logo from '../assets/Muralazul.png';

const Murales = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [myMurales, setMyMurales] = useState([]);
  const [participantMurales, setParticipantMurales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [codigo, setCodigo] = useState('');

  useEffect(() => {
    loadAllMurales();
  }, []);

  const loadAllMurales = async () => {
    try {
      setLoading(true);
      const [muralesResponse, participantResponse] = await Promise.all([
        getMuralesRequest(),
        getMuralesParticipanteRequest()
      ]);
      setMyMurales(muralesResponse.data);
      setParticipantMurales(participantResponse.data);
    } catch (error) {
      console.error('Error loading murales:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar los murales.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMural = async (id) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#6366f1',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      });

      if (result.isConfirmed) {
        await deleteMuralRequest(id);
        await loadAllMurales();
        Swal.fire({
          icon: 'success',
          title: '¡Eliminado!',
          text: 'Tu mural ha sido eliminado.',
        });
      }
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo eliminar el mural.',
      });
    }
  };

  const handleJoinMural = async () => {
    try {
      await unirseAlMuralRequest(codigo);
      await loadAllMurales();
      setOpenModal(false);
      setCodigo('');
      Swal.fire({
        icon: 'success',
        title: '¡Te has unido al mural!',
        text: 'Ahora puedes ver y participar en este mural'
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Error al unirse al mural'
      });
    }
  };

  const handleMuralClick = (muralId) => {
    navigate(`/mural/${muralId}`);
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

      {/* AppBar with glassmorphism */}
      <AppBar position="static" sx={{ 
        backgroundColor: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        boxShadow: 'none'
      }}>
        <Toolbar sx={{ gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <img
              src={logo}
              alt="Logo"
              style={{ 
                height: '45px', 
                width: 'auto',
                filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.1))'
              }}
            />
            <Typography
              variant="h5"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                background: 'linear-gradient(45deg, #ffffff 30%, #e0e7ff 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0px 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              Mis Murales
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            
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
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 8, mb: 4, position: 'relative', zIndex: 1 }}>
        {loading ? (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            minHeight: '60vh' 
          }}>
            <CircularProgress sx={{ 
              color: 'white',
              '& .MuiCircularProgress-circle': {
                strokeWidth: 3
              }
            }} />
          </Box>
        ) : (
          <>
            <Box sx={{ mb: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
                <Typography
                  variant="h4"
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    fontFamily: "'Poppins', sans-serif"
                  }}
                >
                  Mis Murales
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => navigate('/board')}
                  startIcon={<AddIcon />}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.9)',
                    color: '#6366f1',
                    px: 3,
                    py: 1.5,
                    borderRadius: '12px',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.95)',
                    }
                  }}
                >
                  Crear Mural
                </Button>
              </Box>
              <Grid container spacing={4}>
                {myMurales.map((mural) => (
                  <Grid item xs={12} sm={6} md={4} key={mural._id}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '24px',
                        background: 'rgba(255,255,255,0.9)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.18)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.25)'
                        }
                      }}
                      onClick={() => handleMuralClick(mural._id)}
                    >
                      <CardContent sx={{ flexGrow: 1, p: 4 }}>
                        <Typography
                          variant="h5"
                          component="h2"
                          sx={{
                            fontWeight: 700,
                            color: '#4338ca',
                            mb: 2,
                            fontFamily: "'Poppins', sans-serif"
                          }}
                        >
                          {mural.titulo}
                        </Typography>
                        <Typography sx={{ 
                          mb: 3,
                          color: '#6b7280',
                          lineHeight: 1.6
                        }}>
                          {mural.descripcion}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{
                            color: '#6366f1',
                            fontWeight: 600,
                            p: 1,
                            borderRadius: '8px',
                            background: 'rgba(99, 102, 241, 0.1)',
                            display: 'inline-block'
                          }}
                        >
                          Código: {mural.codigoAcceso}
                        </Typography>
                      </CardContent>
                      <CardActions 
                        sx={{ p: 3, pt: 0, gap: 1 }}
                        onClick={(e) => e.stopPropagation()} // Prevent card click when clicking buttons
                      >
                        <Button
                          startIcon={<EditIcon />}
                          sx={{
                            color: '#6366f1',
                            borderRadius: '12px',
                            px: 3,
                            py: 1,
                            '&:hover': { 
                              backgroundColor: 'rgba(99, 102, 241, 0.1)'
                            }
                          }}
                          onClick={() => navigate(`/editar-mural/${mural._id}`)}
                        >
                          Editar
                        </Button>
                        <Button
                          startIcon={<DeleteIcon />}
                          sx={{
                            color: '#dc2626',
                            borderRadius: '12px',
                            px: 3,
                            py: 1,
                            '&:hover': { 
                              backgroundColor: 'rgba(220, 38, 38, 0.1)'
                            }
                          }}
                          onClick={() => handleDeleteMural(mural._id)}
                        >
                          Eliminar
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box sx={{ mt: 8 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
                <Typography
                  variant="h4"
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    fontFamily: "'Poppins', sans-serif"
                  }}
                >
                  Otros Murales
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => setOpenModal(true)}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.9)',
                    color: '#6366f1',
                    px: 3,
                    py: 1.5,
                    borderRadius: '12px',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.95)',
                    }
                  }}
                >
                  Unirse a un Mural
                </Button>
              </Box>
              <Grid container spacing={4}>
                {participantMurales.map((mural) => (
                  <Grid item xs={12} sm={6} md={4} key={mural._id}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '24px',
                        background: 'rgba(255,255,255,0.9)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.18)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.25)'
                        }
                      }}
                      onClick={() => handleMuralClick(mural._id)}
                    >
                      <CardContent sx={{ flexGrow: 1, p: 4 }}>
                        <Typography
                          variant="h5"
                          component="h2"
                          sx={{
                            fontWeight: 700,
                            color: '#4338ca',
                            mb: 2,
                            fontFamily: "'Poppins', sans-serif"
                          }}
                        >
                          {mural.titulo}
                        </Typography>
                        <Typography sx={{ mb: 3, color: '#6b7280', lineHeight: 1.6 }}>
                          {mural.descripcion}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#6366f1' }}>
                          Creado por: {mural.user.nombreUsuario}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </>
        )}
      </Container>

      {/* Join Mural Modal */}
      <Dialog 
        open={openModal} 
        onClose={() => setOpenModal(false)}
        PaperProps={{
          sx: {
            borderRadius: '24px',
            bgcolor: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          }
        }}
      >
        <DialogTitle sx={{ 
          textAlign: 'center',
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 700,
          color: '#4338ca'
        }}>
          Unirse a un Mural
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <TextField
            fullWidth
            label="Código del Mural"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            sx={{
              mt: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                '&:hover fieldset': {
                  borderColor: '#6366f1',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#6366f1',
                }
              }
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button
            onClick={() => setOpenModal(false)}
            sx={{
              color: '#6b7280',
              '&:hover': { backgroundColor: 'rgba(107, 114, 128, 0.1)' }
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleJoinMural}
            sx={{
              bgcolor: '#6366f1',
              color: 'white',
              px: 3,
              py: 1,
              borderRadius: '12px',
              '&:hover': {
                bgcolor: '#4338ca'
              }
            }}
          >
            Unirse
          </Button>
        </DialogActions>
      </Dialog>

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

export default Murales;