import http from 'axios';
///import http2 from 'axios';


class DenunciadoService {


  denunciadoList() {
    return http.get(`/personaList`,).catch((error) => {
      return error;
    });

  }

  denunciadoListByCod(data) {
    return http.get(`/personaListByCod/${data}`,).catch((error) => {
      return error;
    });

  }
  
  denunciadoCreate(data) {
    return http.post(`/persona`, data).catch((error) => {
      return error;
    });
  }

  denunciadoUpdate(id) {
    return http.put(`/persona/${id}`).catch((error) => {
      return error;
    });
  }


  denunciadoDelLogico(id) {
    return http.put(`/personaDel/${id}`).catch((error) => {
      return error;
    });
  }

  denunciadoDelete(id) {
    return http.delete(`/persona/${id}`).catch((error) => {
      return error;
    });
  }




}

export default new DenunciadoService();
