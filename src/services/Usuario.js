import http from 'axios';
///import http2 from 'axios';
const apiUrl = import.meta.env;

class UsuarioService {


  findByIdUsuario(data) {
    return http.get(`/usuarioFindById/${data}`,).catch((error) => {
      return error;
    });

  }

  listByFkUsuario(data) {
    return http.get(`/usuarioListByFk/${data}`,).catch((error) => {
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
