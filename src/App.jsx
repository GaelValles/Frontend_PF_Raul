import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Register from './pages/register';
import Login from './pages/login';
import Home from './pages/Home';
import Board from './pages/Board';
import Profile from './pages/Profile';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/board' element={<Board />} />
          <Route path="/profile" element={<Profile/>} />
          
          {/* Puedes agregar más rutas aquí según sea necesario */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
