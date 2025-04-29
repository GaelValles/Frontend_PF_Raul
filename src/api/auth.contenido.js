import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true
});

export const subirContenidoRequest = async (formData, muralId) => {
  return await API.post(`/subirPublicacion/${muralId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};