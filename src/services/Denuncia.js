import http from 'axios';
///import http2 from 'axios';


class DenunciaService {

  denunciaPersonasGetByNivelGeo(data) {
    return http.get(`/denunciaPersonasGetByNivelGeo/${data}`,).catch((error) => {
      return error;
    });
  }

  denunciaPersonasGetByCod(data) {
    return http.get(`/denunciaPersonasGetByCod/${data}`,).catch((error) => {
      return error;
    });
  }


  denunciaPersonasList() {
    return http.get(`/denunciaPersonasList`,).catch((error) => {
      return error;
    });

  }
/*
  denunciaListByFk(data) {
    return http.get(`/denunciaPersonasListByFk/${data}`,).catch((error) => {
      return error;
    });

  }
  */
  denunciaCreate(data) {
    return http.post(`/denunciaPersonas`, data).catch((error) => {
      return error;
    });
  }

  denunciaUpdate(id) {
    return http.put(`/denunciaPersonas/${id}`).catch((error) => {
      return error;
    });
  }

/*
  denunciaDelLogico(id) {
    return http.put(`/denunciaPersonasDel/${id}`).catch((error) => {
      return error;
    });
  }

  denunciaDelete(id) {
    return http.delete(`/denunciaPersonas/${id}`).catch((error) => {
      return error;
    });
  }
*/



}

export default new DenunciaService();
