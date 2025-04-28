import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useAuth } from '../context/UserContext';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';

const Register = () => {
  const { register, handleSubmit, reset } = useForm();
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (value) => {
    try {
      const success = await registerUser(value);
      if (success) {
        Swal.fire({
          title: 'Registro exitoso',
          text: 'El usuario se ha registrado correctamente.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        reset();
        navigate('/login');
      }
    } catch{
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al registrar el usuario. Inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: 'linear-gradient(to right, #8c52ff, #4364f7)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: '#ffffff',
          boxShadow: 6,
          borderRadius: 4,
          p: 4,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: '600', color: '#5271ff' }}
        >
          Registrarse
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            label="Nombre de Usuario"
            autoFocus
            {...register('nombreUsuario', { required: true })}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Correo"
            type="email"
            {...register('correo', { required: true })}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Contraseña"
            type="password"
            {...register('password', { required: true })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: '#8c52ff',
              borderRadius: 3,
              fontWeight: 'bold',
              fontFamily: "'Poppins', sans-serif",
              transition: 'transform 0.2s ease',
              '&:hover': {
                backgroundColor: '#6926ed',
                transform: 'scale(1.02)',
              },
            }}
          >
            Registrarse
          </Button>
          <Typography variant="body2">
            ¿Ya tienes una cuenta?{' '}
            <RouterLink to="/login" style={{ color: '#1976d2', textDecoration: 'none' }}>
              Inicia sesión
            </RouterLink>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;