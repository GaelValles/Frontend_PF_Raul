import axios from 'axios';

// Create axios instance with base configuration
const instance = axios.create({
  baseURL: 'http://localhost:4000/',
  withCredentials: true
});

export const registerRequest = async (user) => {
  return await instance.post('/registrar', user);
};

export const loginRequest = async (user) => {
  return await instance.post('/login', user);
};

export const verifyTokenRequest = async () => {
  return await instance.get('/verify');
};

export const logoutRequest = async () => {
  return await instance.post('/logout');
};

export const getProfileRequest = async () => {
  return await instance.get('/perfil');
};