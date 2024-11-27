import http from 'axios';
import http2 from 'axios';
const apiUrl = import.meta.env;

class documentosPathService {

  documentosPathList() {
    return http.get(`/documentosPathList`,).catch((error) => {
      return error;
    });

  }

  documentosPathListByCod(data) {
    return http.get(`/documentosPathListByCod/${data}`,).catch((error) => {
      return error;
    });

  }
/*
  usuarioCreate(data) {
    return http2({
      method:'post',
      url: `/auth/usuario`,
      baseURL: apiUrl.VITE_API_URL_AUTH,
      headers: {
        "Content-Type": "application/json",
        'Authorization': apiUrl.VITE_API_URL_TOKEN
      },
      data:`${data}`
    })*/
  /*  documentosPathCreate(data) {
      console.log('Archivos documentosPathCreate:');
      return http2({
        method:'post',
        url: `/documentosPath`,
        baseURL: apiUrl.VITE_API_URL,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': apiUrl.VITE_API_URL_TOKEN
        },
        data:  data
      })
      .then(response => {
        console.log('Archivos subidos:', response.data);
        // Actualizar el estado de la aplicación, mostrar mensajes de éxito, etc.
      })
      .catch(error => {
        console.error('Error al subir los archivos:', error);
        // Mostrar mensajes de error al usuario
        throw error; // Podrías lanzar el error si necesitas manejarlo en otro lugar
      });
    }
*/
  documentosPathCreate(data) {
    return http.post(`/documentosPath`, data).catch((error) => {
      return error;
    });
  }

  documentosPathUpdate(id) {
    return http.put(`/documentosPath/${id}`).catch((error) => {
      return error;
    });
  }


  documentosPathDelLogico(id) {
    return http.put(`/documentosPathDel/${id}`).catch((error) => {
      return error;
    });
  }

  documentosPathDelete(id) {
    return http.delete(`/documentosPath/${id}`).catch((error) => {
      return error;
    });
  }




}

export default new documentosPathService();
