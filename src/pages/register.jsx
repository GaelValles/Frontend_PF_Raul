import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const schema = yup.object().shape({
  nombreUsuario: yup.string().required('El nombre de usuario es requerido'),
  correo: yup.string().email('Correo inválido').required('El correo es requerido'),
  password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es requerida'),
});

const Register = () => {
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: async (data) => {
      try {
        await schema.validate(data, { abortEarly: false });
        return { values: data, errors: {} };
      } catch (validationErrors) {
        return {
          values: {},
          errors: validationErrors.inner.reduce((allErrors, currentError) => {
            allErrors[currentError.path] = { message: currentError.message };
            return allErrors;
          }, {}),
        };
      }
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log('Datos enviados:', data);
      // Aquí puedes realizar la lógica para enviar los datos al backend
    } catch (err) {
      setError('Error al registrar');
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

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            label="Nombre de Usuario"
            autoFocus
            {...register('nombreUsuario')}
            error={!!errors.nombreUsuario}
            helperText={errors.nombreUsuario?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Correo"
            type="email"
            {...register('correo')}
            error={!!errors.correo}
            helperText={errors.correo?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Contraseña"
            type="password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
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