import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';
import logo from '../assets/logomural.jpeg';
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
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
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
    setShowPassword((prev) => !prev); // Cambia el estado de mostrar/ocultar contraseña
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
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            width: 150,
            height: 150,
            marginBottom: 2,
            borderRadius: '50%',
          }}
        />

        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            color: 'rgb(19, 74, 66))',
            minHeight: '10vh',
            fontWeight: 'bold',
          }}
        >
          Iniciar Sesión
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
            type={showPassword ? 'text' : 'password'} // Cambia el tipo de input según el estado
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* reCAPTCHA */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 2,
              mb: 2,
            }}
          >
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
              backgroundColor: '#27c1ad',
              '&:hover': {
                backgroundColor: '#2a8b7e',
              },
            }}
          >
            Iniciar Sesión
          </Button>
          <Typography variant="body2">
            ¿No tienes una cuenta?{' '}
            <RouterLink to="/register" style={{ color: '#1976d2' }}>
              Regístrate
            </RouterLink>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
