//import axios from './axiosConfig';
import axios from 'axios';

export const downloadFile = async (filename) => {
  try {
    const apiUrl = import.meta.env;

    const response = await axios.get(`/uploads/evidencia_denuncias/${filename}`, {
      responseType: 'blob',
      headers: {
        'Authorization': apiUrl.VITE_API_URL_TOKEN
      },

    }
    );

    //const blob = new Blob([response.data]);
    // Crear un enlace para descargar el archivo

    const downloadUrl = window.URL.createObjectURL(response.data);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = filename;   //link.setAttribute('download', filename);
    a.click(); // document.body.appendChild(link);


    window.open(downloadUrl, '_blank');
    a.remove();// Limpia el DOM
    window.URL.revokeObjectURL(downloadUrl);
    console.log('Archivos descargado correctamente:', a);



  } catch (error) {
    console.error('Error al descargar el archivo:', error.response.data);
    //alert('Error al descargar el archivo: ' + error.response.data);
    throw error; // Re-lanzar el error para manejarlo en el componente
  }
};