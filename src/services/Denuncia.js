import http from 'axios';
import http2 from 'axios';
const apiUrl = import.meta.env;


class DenunciaService {

  listRepDenByDeptoByEstado(depto_id,estado,fec_registro_hecho_desde,fec_registro_hecho_hasta) {
    return http.get(`/listRepDenByDeptoByEstado/${depto_id}/${estado}/${fec_registro_hecho_desde}/${fec_registro_hecho_hasta}`,).catch((error) => {
      console.log("error listRepDenByDeptoByEstado  url  : ", error.config.url);
      return error;
    });
  }


  listRepDenByDeptoByInfFinal(depto_id) {
    return http.get(`/listRepDenByDeptoByInfFinal/${depto_id}`,).catch((error) => {
      console.log("error listRepDenByDeptoByInfFinal  url  : ", error.config.url);
      return error;
    });
  }

  listRepDenByDepto(depto_id) {
    return http.get(`/listRepDenByDepto/${depto_id}`,).catch((error) => {
      console.log("error listRepDenByDepto  url  : ", error.config.url);
      return error;
    });
  }


  getByCodEstado(cod_denuncia,estado) {
    return http.get(`/getByCodEstado/${cod_denuncia}/${estado}`,).catch((error) => {
      console.log("error getByCodEstado  url  : ", error.config.url);
      return error;
    });
  }

  denunciaPersonasGetByNivelGeo(data_depto_id ,rol) {
    return http.get(`/denunciaPersonasGetByNivelGeo/${data_depto_id}/${rol}`,).catch((error) => {
      console.log("error denunciaPersonasGetByNivelGeo  url  : ", error.config.url);
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

  denunciaUpdate(id, data) {
    return http2({
      method:'put',
      url: `/denunciaPersonas/${id}`,
     // baseURL: apiUrl.VITE_API_URL_AUTH,
      headers: {
        "Content-Type": "application/json",
        'Authorization': apiUrl.VITE_API_URL_TOKEN
      },      
    data:`${data}`
    })
    .catch((error) => {
      console.log("error denunciaUpdate  url  : ", error.config.url);

        return error;
    });

  }


/*
  denunciaUpdate(id) {
    return http.put(`/denunciaPersonas/${id}`).catch((error) => {
      return error;
    });
  }


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
