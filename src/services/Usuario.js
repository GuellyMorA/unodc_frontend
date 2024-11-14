import http from 'axios';
import http2 from 'axios';
const apiUrl = import.meta.env;

class UsuarioService {

  usuarioList() {
     //const user = JSON.parse(localStorage.getItem('user'));
     return http2({
      method:'get',
      url: `/auth/usuarioList`,
      baseURL: apiUrl.VITE_API_URL_AUTH,
      headers: {
        "Content-Type": "application/json",
        'Authorization': apiUrl.VITE_API_URL_TOKEN
      },
    })
    .catch((error) => {
        return error;
    });

  }

  findByIdUsuario(data) {
    return http.get(`/usuarioFindById/${data}`,).catch((error) => {
      return error;
    });

  }

  listByFkUsuario(data) {
     
    //const user = JSON.parse(localStorage.getItem('user'));
    return http2({
      method:'get',
      url: `/auth/usuarioListByFk/${data}`,
      baseURL: apiUrl.VITE_API_URL_AUTH,
      headers: {
        "Content-Type": "application/json",
        'Authorization': apiUrl.VITE_API_URL_TOKEN
      },
    })
    .catch((error) => {
        return error;
    });

  }

     
  usuarioCreate(data) {
    return http.post(`/usuario`, data).catch((error) => {
      return error;
    });
  }

  usuarioUpdate(id) {
    return http.put(`/usuario/${id}`).catch((error) => {
      return error;
    });
  }


  usuarioDelLogico(id) {
    return http.put(`/usuarioDel/${id}`).catch((error) => {
      return error;
    });
  }

  usuarioDelete(id) {
    return http.delete(`/usuario/${id}`).catch((error) => {
      return error;
    });
  }




}

export default new UsuarioService();
