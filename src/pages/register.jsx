import { useState } from 'react';

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
  name: yup.string().required('Nombre es requerido'),
  email: yup.string().email('Email inválido').required('Email es requerido'),
  password: yup.string().min(6, 'Mínimo 6 caracteres').required('Contraseña es requerida'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden')
    .required('Confirme su contraseña'),
});

const Register = () => {
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log('Datos enviados:', data);
    } catch (err) {
      setError('Error al registrar');
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: 'linear-gradient(to right, rgb(81, 150, 141),rgb(19, 74, 66))',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: '#ffffff',
          boxShadow: 3,
          borderRadius: 2,
          p: 4,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            color: '#00000',
            fontWeight: 'bold',
          }}
        >
          Registrarse
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            fullWidth
            label="Nombre"
            autoFocus
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            type="email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
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
          <TextField
            margin="normal"
            fullWidth
            label="Confirmar Contraseña"
            type="password"
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: '#27c1ad',
              '&:hover': {
                backgroundColor: '#2a8b7e',
              },
            }}
          >
            Registrarse
          </Button>
          <Typography variant="body2">
            ¿Ya tienes una cuenta?{' '}
            <RouterLink to="/login" style={{ color: '#1976d2' }}>
              Inicia sesión
            </RouterLink>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;