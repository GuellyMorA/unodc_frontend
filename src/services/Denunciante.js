import http from 'axios';
///import http2 from 'axios';


class DenuncianteService {


  denuncianteList() {
    return http.get(`/denuncianteList`,).catch((error) => {
      return error;
    });

  }

  denuncianteListByFk(data) {
    return http.get(`/denuncianteListByFk/${data}`,).catch((error) => {
      return error;
    });

  }
  
  denuncianteCreate(data) {
    return http.post(`/denunciante`, data).catch((error) => {
      return error;
    });
  }

  denuncianteUpdate(id) {
    return http.put(`/denunciante/${id}`).catch((error) => {
      return error;
    });
  }


  denuncianteDelLogico(id) {
    return http.put(`/denuncianteDel/${id}`).catch((error) => {
      return error;
    });
  }

  denuncianteDelete(id) {
    return http.delete(`/denunciante/${id}`).catch((error) => {
      return error;
    });
  }




}

export default new DenuncianteService();
