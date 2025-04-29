import React from 'react';
import { AuthProvider } from './context/UserContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Register from './pages/register';
import Login from './pages/login';
import Home from './pages/Home';
import Board from './pages/Board';
import Profile from './pages/Profile';
import Murales from './pages/murales';
import SubirPublicacion from './pages/subirPublicacion';
import Mural from './pages/Mural';
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
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path='/board' element={<Board />} />
            <Route path="/murales" element={<Murales/>} />
            <Route path="/mural/:id" element={<Mural/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/subirPublicacion/:id" element={<SubirPublicacion />} />
            
            {/* Puedes agregar más rutas aquí según sea necesario */}
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
