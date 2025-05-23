import { createContext, useContext, useState, useEffect } from "react";
import { 
  registerRequest, 
  loginRequest, 
  verifyTokenRequest, 
  logoutRequest 
} from "../api/auth.js";
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import axios from 'axios';

export const UserContext = createContext();

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
};

export const updateUserRequest = async (userData) => {
  return await axios.put('http://localhost:4000/profile', userData, {
    withCredentials: true
  });
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const registerUser = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      setErrors(error.response.data.message || ['Error al registrar usuario']);
      return false;
    }
  };

  const login = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      console.log("los datos recogidos del login son: ",res.data);
      console.log("el dato del user es: ",user);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      setErrors(error.response.data.message || ['Error al iniciar sesión']);
      return false;
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
      Cookies.remove("token");
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const updateUser = async (userData) => {
    try {
      const res = await updateUserRequest(userData);
      setUser(res.data);
      return res.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  // Verificar token al cargar la página
  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest();
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <UserContext.Provider value={{
      user,
      isAuthenticated,
      errors,
      loading,
      registerUser,
      login,
      logout,
      updateUser,
      setUser,
      setErrors
    }}>
      {children}
    </UserContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};