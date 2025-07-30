import http from 'axios';
import http2 from 'axios';
const apiUrl = import.meta.env;

class UsuariosRolService {


  UsuariosRolList() {
    return http.get(`/usuariosRolList`,).catch((error) => {
      return error;
    });

  }

   
  UsuariosRolCreate(data) {
    return http2({
      method:'post',
      url: `/auth/usuariosRol`,
      baseURL: apiUrl.VITE_API_URL_AUTH,
      headers: {
        "Content-Type": "application/json",
        'Authorization': apiUrl.VITE_API_URL_TOKEN
      },
      data:`${data}`
    })
    .catch((error) => {
      console.log("UsuariosRolCreate  : ", error);

        return error;
    });

  }


  UsuariosRolUpdate(id, data) {
    return http2({
      method:'put',
      url: `/auth/usuariosRol/${id}`,
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


  UsuariosRolDelLogico(id) {
    return http.put(`/usuariosRolDel/${id}`).catch((error) => {
      return error;
    });
  }

  UsuariosRolDelete(id) {
    return http.delete(`/usuariosRol/${id}`).catch((error) => {
      return error;
    });
  }




}

export default new UsuariosRolService();
