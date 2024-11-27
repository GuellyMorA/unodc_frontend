import http from 'axios';
///import http2 from 'axios';


class DenuncianteService {


  denuncianteList() {
    return http.get(`/personaList`,).catch((error) => {
      return error;
    });

  }

  denuncianteListByFk(data) {
    return http.get(`/personaListByFk/${data}`,).catch((error) => {
      return error;
    });

  }
  
  denuncianteCreate(data) {
    return http.post(`/persona`, data).catch((error) => {
      return error;
    });
  }

  denuncianteUpdate(id) {
    return http.put(`/persona/${id}`).catch((error) => {
      return error;
    });
  }


  denuncianteDelLogico(id) {
    return http.put(`/personaDel/${id}`).catch((error) => {
      return error;
    });
  }

  denuncianteDelete(id) {
    return http.delete(`/persona/${id}`).catch((error) => {
      return error;
    });
  }




}

export default new DenuncianteService();
