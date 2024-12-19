import http from 'axios';
import http2 from 'axios';


class SeguimientoService {
  seguimientolistRepByNivelGeoByUsuId(data_user_id,data_depto_id ) {
    return http.get(`/seguimientolistRepByNivelGeoByUsuId/${data_user_id}/${data_depto_id}`,).catch((error) => {
      console.log("error seguimientolistRepByNivelGeoByUsuId  url  : ", error.config.url);

      return error;
    });
  }

  seguimientoListByCodByNivelGeoByUsuId(data_user_id,data_depto_id,data_cod_denuncia ) {
    return http.get(`/seguimientoListByCodByNivelGeoByUsuId/${data_user_id}/${data_depto_id}/${data_cod_denuncia}`,).catch((error) => {
      console.log("error seguimientoListByCodByNivelGeoByUsuId  url  : ", error.config.url);

      return error;
    });
  }

  seguimientoListByCod(data_user_id,data_depto_id ,rol) {
    return http.get(`/seguimientoListByCod/${data_user_id}/${data_depto_id}/${rol}`,).catch((error) => {
      console.log("error seguimientoListByCod  url  : ", error.config.url);
      return error;
    });
  }


  seguimientoList() {
    return http.get(`/seguimientoList`,).catch((error) => {
      console.log("error seguimientoList  url  : ", error.config.url);
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

 

  /*seguimientoUpdate(id) {
    return http.put(`/seguimiento/${id}`).catch((error) => {
      return error;
    });
  }
*/
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
