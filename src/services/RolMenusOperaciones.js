import http from 'axios';
///import http2 from 'axios';


class RolMenusOperacionesService {


  rolMenusOperacionesList() {
    return http.get(`/rolMenusOperacionesList`,).catch((error) => {
      return error;
    });

  }
  


  modulosOperacionesList() {
    return http.get(`/modulosOperacionesList`,).catch((error) => {
      return error;
    });

  }
  rolMenusOperacionesListByFk(data) {
    return http.get(`/rolMenusOperacionesListByFk/${data}`,).catch((error) => {
      return error;
    });

  }
  
  rolMenusOperacionesCreate(data) {
    return http.post(`/rolMenusOperaciones`, data).catch((error) => {
      return error;
    });
  }

  rolMenusOperacionesUpdate(id,data) {
    return http.put(`/rolMenusOperaciones/${id}`, data).catch((error) => {
      return error;
    });
  }


  rolMenusOperacionesDelLogico(id) {
    return http.put(`/rolMenusOperacionesDel/${id}`).catch((error) => {
      return error;
    });
  }

  rolMenusOperacionesDelete(id) {
    return http.delete(`/rolMenusOperaciones/${id}`).catch((error) => {
      return error;
    });
  }




}

export default new RolMenusOperacionesService();
