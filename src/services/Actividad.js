import http from 'axios';
///import http2 from 'axios';


class ActividadService {


  actividadList() {
    return http.get(`/actividadList`,).catch((error) => {
      return error;
    });

  }

  actividadListByFk(data) {
    return http.get(`/actividadListByFk/${data}`,).catch((error) => {
      return error;
    });

  }
  
  actividadCreate(data) {
    return http.post(`/actividad`, data).catch((error) => {
      return error;
    });
  }

  actividadUpdate(id) {
    return http.put(`/actividad/${id}`).catch((error) => {
      return error;
    });
  }


  actividadDelLogico(id) {
    return http.put(`/actividadDel/${id}`).catch((error) => {
      return error;
    });
  }

  actividadDelete(id) {
    return http.delete(`/actividad/${id}`).catch((error) => {
      return error;
    });
  }




}

export default new ActividadService();
