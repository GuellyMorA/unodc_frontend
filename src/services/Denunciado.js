import http from 'axios';
///import http2 from 'axios';


class DenunciadoService {


  denunciadoList() {
    return http.get(`/denunciadoList`,).catch((error) => {
      return error;
    });

  }

  denunciadoListByCod(data) {
    return http.get(`/denunciadoListByCod/${data}`,).catch((error) => {
      return error;
    });

  }
  
  denunciadoCreate(data) {
    return http.post(`/denunciado`, data).catch((error) => {
      return error;
    });
  }

  denunciadoUpdate(id) {
    return http.put(`/denunciado/${id}`).catch((error) => {
      return error;
    });
  }


  denunciadoDelLogico(id) {
    return http.put(`/denunciadoDel/${id}`).catch((error) => {
      return error;
    });
  }

  denunciadoDelete(id) {
    return http.delete(`/denunciado/${id}`).catch((error) => {
      return error;
    });
  }




}

export default new DenunciadoService();
