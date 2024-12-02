// src/axiosConfig.js
import axios from 'axios';


const apiUrl = import.meta.env;

//axios.defaults.baseURL = apiUrl.VITE_API_URL;

const instance = axios.create({
  baseURL: apiUrl.VITE_API_URL, //  'https://tu-backend.com/api', // Cambia esta URL base según tus necesidades
  //timeout: 10000, // Tiempo de espera para las solicitudes
});

// Interceptores para manejar solicitudes y respuestas
instance.interceptors.request.use((config) => {
  // Aquí puedes mostrar un spinner de carga
  console.log('DesCargando...');
  return config;
}, (error) => {
  return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
  // Aquí podrías ocultar el spinner de carga
  console.log('DesCarga completa');
  return response;
}, (error) => {
  // Manejo de errores global
  console.error('Error en la respuesta de Axios:', error);
  return Promise.reject(error);
});

export default instance;