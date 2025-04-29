import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true
});

export const createMuralRequest = async (mural) => {
  return await API.post('/subirMural', mural);
};

export const getMuralesRequest = async () => {
  return await API.get('/verMisMurales');
};

export const getMuralesParticipanteRequest = async () => {
  return await API.get('/murales-participante');
};

export const unirseAlMuralRequest = async (codigo) => {
  return await API.post('/unirse', { codigo });
};

export const getMuralRequest = async (id) => {
  return await API.get(`/verPublicacionesMural/${id}`);
};

export const updateMuralRequest = async (id, mural) => {
  return await API.put(`/actualizarMural/${id}`, mural);
};

export const deleteMuralRequest = async (id) => {
  return await API.delete(`/bajarMural/${id}`);
};