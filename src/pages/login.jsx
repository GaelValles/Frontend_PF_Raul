import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';
import logo from '../assets/Muralazul.png';
import * as yup from 'yup';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Email es requerido'),
  password: yup.string().required('Contraseña es requerida'),
});

const Login = () => {
  const [error, setError] = useState(null);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!recaptchaToken) {
      setError('Por favor, verifica el reCAPTCHA.');
      return;
    }

    try {
      console.log('Datos enviados:', data);
      console.log('reCAPTCHA Token:', recaptchaToken);
      navigate('/dashboard');
    } catch (err) {
      setError('Error al iniciar sesión');
    }
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        backgroundImage: 'linear-gradient(to right, #8c52ff, #4364f7)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "Poppins', sans-serif",
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
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            width: 150,
            height: 150,
            marginBottom: 2,
            borderRadius: '50%',
            objectFit: 'cover',
            boxShadow: 2,
          }}
        />

        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: '600', color: '#5271ff' }}
        >
          Iniciar Sesión
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
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <ReCAPTCHA
              sitekey="6LdnBR8rAAAAALjdAwk5F8VVeD0LKPCkuFAZCdaX"
              onChange={handleRecaptchaChange}
            />
          </Box>

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
              fontFamily: "Poppins', sans-serif",
              transition: 'transform 0.2s ease',
              '&:hover': {
                backgroundColor: '#6926ed',
                transform: 'scale(1.02)',
              },
            }}
          >
            Iniciar sesión
          </Button>

          <Typography variant="body2">
            ¿No tienes una cuenta?{' '}
            <RouterLink to="/register" style={{ color: '#1976d2', textDecoration: 'none' }}>
              Regístrate
            </RouterLink>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
