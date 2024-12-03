import http from 'axios';
import http2 from 'axios';


class SeguimientoService {

  //    /documentosPathListByCod/:cod_denuncia/:depto_id'

  seguimientoListByCod(data_user_id,data_depto_id ) {
    return http.get(`/seguimientoListByCod/${data_user_id}/${data_depto_id}`,).catch((error) => {
      return error;
    });
  }


  seguimientoList() {
    return http.get(`/seguimientoList`,).catch((error) => {
      return error;
    });

  }
/*
  seguimientoListByFk(data) {
    return http.get(`/seguimientoListByFk/${data}`,).catch((error) => {
      return error;
    });

  }
  */
  seguimientoCreate(data) {
    return http.post(`/seguimiento`, data).catch((error) => {
      return error;
    });
  }

  usuarioUpdate(id, data) {
    return http2({
      method:'put',
      url: `/auth/usuario/${id}`,
      baseURL: apiUrl.VITE_API_URL_AUTH,
      headers: {
        "Content-Type": "application/json",
        'Authorization': apiUrl.VITE_API_URL_TOKEN
      },      
    data:`${data}`
    })
    .catch((error) => {
        return error;
    });

  }
  seguimientoUpdate(id) {
    return http.put(`/seguimiento/${id}`).catch((error) => {
      return error;
    });
  }

/*
  seguimientoDelLogico(id) {
    return http.put(`/seguimientoDel/${id}`).catch((error) => {
      return error;
    });
  }

  seguimientoDelete(id) {
    return http.delete(`/seguimiento/${id}`).catch((error) => {
      return error;
    });
  }
*/



}

export default new SeguimientoService();
