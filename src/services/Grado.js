import http from 'axios';
///import http2 from 'axios';


class GradoService {


  gradoList() {
    return http.get(`/gradoList`,).catch((error) => {
      return error;
    });

  }

   
  gradoCreate(data) {
    return http.post(`/grado`, data).catch((error) => {
      return error;
    });
  }

  gradoUpdate(id) {
    return http.put(`/grado/${id}`).catch((error) => {
      return error;
    });
  }


  gradoDelLogico(id) {
    return http.put(`/gradoDel/${id}`).catch((error) => {
      return error;
    });
  }

  gradoDelete(id) {
    return http.delete(`/grado/${id}`).catch((error) => {
      return error;
    });
  }




}

export default new GradoService();
