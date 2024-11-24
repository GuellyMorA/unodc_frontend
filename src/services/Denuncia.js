import http from 'axios';
///import http2 from 'axios';


class DenunciaService {

  denunciaGetByCod(data) {
    return http.get(`/denunciaGetByCod/${data}`,).catch((error) => {
      return error;
    });
  }

  denunciaList() {
    return http.get(`/denunciaList`,).catch((error) => {
      return error;
    });

  }

  denunciaListByFk(data) {
    return http.get(`/denunciaListByFk/${data}`,).catch((error) => {
      return error;
    });

  }
  
  denunciaCreate(data) {
    return http.post(`/denuncia`, data).catch((error) => {
      return error;
    });
  }

  denunciaUpdate(id) {
    return http.put(`/denuncia/${id}`).catch((error) => {
      return error;
    });
  }


  denunciaDelLogico(id) {
    return http.put(`/denunciaDel/${id}`).catch((error) => {
      return error;
    });
  }

  denunciaDelete(id) {
    return http.delete(`/denuncia/${id}`).catch((error) => {
      return error;
    });
  }




}

export default new DenunciaService();
