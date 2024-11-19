import http from 'axios';
///import http2 from 'axios';


class RolService {


  rolList() {
    return http.get(`/rolList`,).catch((error) => {
      return error;
    });

  }

   
  rolCreate(data) {
    return http.post(`/rol`, data).catch((error) => {
      return error;
    });
  }

  rolUpdate(id) {
    return http.put(`/rol/${id}`).catch((error) => {
      return error;
    });
  }


  rolDelLogico(id) {
    return http.put(`/rolDel/${id}`).catch((error) => {
      return error;
    });
  }

  rolDelete(id) {
    return http.delete(`/rol/${id}`).catch((error) => {
      return error;
    });
  }




}

export default new RolService();
