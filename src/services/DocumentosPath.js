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
